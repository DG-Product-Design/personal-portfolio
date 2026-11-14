/**
 * Regression check for the first-run gift artwork loading race.
 *
 * Run `yarn test:gifting` to build and check the current code, or run this file
 * directly after `yarn build`. Use the Node version in .nvmrc.
 *
 * Defaults to installed Chrome on macOS, otherwise Playwright's Chromium.
 * Set GIFT_TEST_BROWSER=firefox to use Playwright's Firefox build, and optionally
 * GIFT_TEST_BROWSER_PATH to select a compatible browser executable. Stock
 * Firefox does not support the protocol used by Playwright's Firefox driver.
 *
 * These checks exercise the production build in an isolated browser. They
 * verify download/decode gating, replay, and graceful artwork failure. Opacity
 * sampling checks animation state; it cannot detect every SVG paint glitch or
 * establish frame-rate performance on a physical phone.
 */
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { chromium, firefox } from 'playwright-core'
import { preview } from 'vite'

const browserType =
    process.env.GIFT_TEST_BROWSER === 'firefox' ? firefox : chromium
const macChrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const executablePath =
    process.env.GIFT_TEST_BROWSER_PATH ||
    (browserType === chromium && existsSync(macChrome) ? macChrome : undefined)
// Test the generated site, including its hashed asset URL. An ephemeral local
// port avoids colliding with a developer's running Vite server.
const server = await preview({
    logLevel: 'error',
    preview: { host: '127.0.0.1', port: 0 },
})
let browser
try {
    browser = await browserType.launch({
        headless: true,
        ...(executablePath ? { executablePath } : {}),
    })
    const url = `http://127.0.0.1:${server.httpServer.address().port}/work/fringe-gifting/`
    const page = await browser.newPage()
    const errors = []
    page.on('pageerror', (error) => errors.push(error.message))
    // Hold the real artwork request so a fast local connection or warm cache
    // cannot hide the race. Each new browser context starts with a fresh cache.
    let releaseRequest
    const requestGate = new Promise((resolve) => {
        releaseRequest = resolve
    })
    let artworkRequests = 0
    await page.route('**/gift-card-clean-*.webp', async (route) => {
        artworkRequests++
        await requestGate
        await route.continue()
    })
    // Independently hold decoding after the download completes. This catches
    // regressions that replace decode() with onload or a speculative preload.
    await page.addInitScript(() => {
        const decode = HTMLImageElement.prototype.decode
        const gate = new Promise((resolve) => {
            window.releaseGiftDecode = resolve
        })
        HTMLImageElement.prototype.decode = async function () {
            await decode.call(this)
            if (this.src.includes('gift-card-clean')) {
                window.giftDecoded = true
                await gate
            }
        }
    })
    // Waiting for the full load event here would deadlock on the request we
    // intentionally withheld. Check the disabled UI before releasing each gate.
    await page.goto(url, { waitUntil: 'domcontentloaded' })
    const preparing = page.getByRole('button', { name: 'Preparing your gift…' })
    await preparing.waitFor()
    assert(await preparing.isDisabled(), 'Cold download must block Start')
    assert.equal(await page.getByRole('dialog').count(), 0)
    releaseRequest()
    await page.waitForFunction(() => window.giftDecoded)
    assert(
        await preparing.isDisabled(),
        'Downloaded artwork must still wait for decode'
    )
    await page.evaluate(() => window.releaseGiftDecode())

    const openGift = async () => {
        await page
            .getByRole('button', { name: 'Start interactive demo' })
            .click()
        await page.getByRole('button', { name: /You have a new gift/ }).click()
    }
    // Reuse the page for replay: it must complete without fetching the wrapper
    // again or carrying stale animation state from the first run.
    for (const run of ['cold', 'replay']) {
        await openGift()
        const result = await page.evaluate(async () => {
            const pieces = [
                ...document.querySelectorAll('svg[viewBox="0 0 800 549"] > g'),
            ]
            let previous = pieces.map(() => 1)
            let resets = 0
            const intermediate = new Set()
            const start = performance.now()
            // The current last peel ends at 2,040 ms. Leave a small settling
            // margin; update this observation window if the choreography changes.
            // requestAnimationFrame samples intermediate animation state, not just
            // a final hidden wrapper that could conceal a skipped animation.
            while (performance.now() - start < 2400) {
                const opacity = pieces.map((piece) =>
                    Number(getComputedStyle(piece).opacity)
                )
                opacity.forEach((value, index) => {
                    if (value > previous[index] + 0.01) resets++
                    if (value > 0 && value < 1) intermediate.add(index)
                })
                previous = opacity
                await new Promise(requestAnimationFrame)
            }
            return {
                count: pieces.length,
                resets,
                intermediate: intermediate.size,
                finished: previous.every((value) => value === 0),
            }
        })
        assert.equal(result.count, 9)
        assert.equal(
            result.resets,
            0,
            `${run}: pieces should not reappear after fading`
        )
        assert.equal(
            result.intermediate,
            9,
            `${run}: each piece should have visible intermediate fade frames`
        )
        assert(result.finished)
        await page.getByRole('button', { name: 'View your gift' }).click()
        await page.getByRole('button', { name: 'Redeem this gift' }).click()
        await page.getByRole('button', { name: 'Replay interaction' }).click()
        console.log(
            `PASS ${run}: decoded artwork, continuous peel, redeem and replay`
        )
    }
    assert.equal(
        artworkRequests,
        1,
        'Replay should reuse the already loaded artwork'
    )
    assert.deepEqual(errors, [])
    await page.close()

    // A missing decorative image must not prevent redemption. Separate contexts
    // keep the successful download above from masking the forced failure; also
    // verify that reduced-motion users can complete the same flow.
    for (const reducedMotion of ['no-preference', 'reduce']) {
        const fallback = await browser.newPage({ reducedMotion })
        await fallback.route('**/gift-card-clean-*.webp', (route) =>
            route.abort()
        )
        await fallback.goto(url, { waitUntil: 'domcontentloaded' })
        await fallback
            .getByRole('button', { name: 'Start interactive demo' })
            .click()
        await fallback
            .getByRole('button', { name: /You have a new gift/ })
            .click()
        assert.equal(
            await fallback.locator('svg[viewBox="0 0 800 549"]').count(),
            0
        )
        await fallback.getByRole('button', { name: 'View your gift' }).click()
        await fallback.getByRole('button', { name: 'Redeem this gift' }).click()
        console.log(
            `PASS missing artwork (${reducedMotion}): gift remains usable`
        )
        await fallback.close()
    }
} finally {
    // Release the browser and preview port even when an assertion fails.
    await browser?.close()
    await new Promise((resolve) => server.httpServer.close(resolve))
}
