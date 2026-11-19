import assert from 'node:assert/strict'
import { existsSync, mkdirSync } from 'node:fs'
import { chromium } from 'playwright-core'
import { preview } from 'vite'

const macChrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const executablePath =
    process.env.CHROME_PATH || (existsSync(macChrome) ? macChrome : undefined)
const server = await preview({
    logLevel: 'error',
    preview: { host: '127.0.0.1', port: 0 },
})
const baseUrl = `http://127.0.0.1:${server.httpServer.address().port}`
let browser
try {
    browser = await chromium.launch({ headless: true, executablePath })
    for (const [name, viewport] of Object.entries({
        desktop: { width: 1440, height: 1000 },
        mobile: { width: 390, height: 844 },
    })) {
        const page = await browser.newPage({
            viewport,
            reducedMotion: 'reduce',
        })
        const errors = []
        page.on('pageerror', (error) => errors.push(error.message))
        page.on('response', (response) => {
            if (
                response.url().startsWith(baseUrl) &&
                response.status() >= 400
            ) {
                errors.push(`${response.status()} ${response.url()}`)
            }
        })
        page.on('requestfailed', (request) => {
            if (
                request.url().startsWith(baseUrl) &&
                request.failure()?.errorText !== 'net::ERR_ABORTED'
            ) {
                errors.push(`${request.failure()?.errorText} ${request.url()}`)
            }
        })
        try {
            for (const route of [
                '/',
                '/about/',
                '/design-systems/',
                '/work/fringe-gifting/',
            ]) {
                const response = await page.goto(`${baseUrl}${route}`, {
                    waitUntil: 'networkidle',
                })
                assert.equal(response.status(), 200, route)
                await page.getByRole('main').waitFor()
                await page.getByRole('heading', { level: 1 }).first().waitFor()
                assert(
                    await page.evaluate(
                        () =>
                            document.documentElement.scrollWidth <=
                            innerWidth + 1
                    ),
                    `${name}: horizontal overflow on ${route}`
                )
                const nav = page.getByRole('navigation', {
                    name: 'Main navigation',
                })
                for (const label of ['Work', 'About', 'Systems', 'Contact']) {
                    assert(
                        await nav
                            .getByRole('link', { name: label, exact: true })
                            .isVisible(),
                        `${name}: ${label} navigation hidden`
                    )
                }
            }
            const nav = page.getByRole('navigation', {
                name: 'Main navigation',
            })
            await nav.getByRole('link', { name: 'About', exact: true }).click()
            await page.waitForURL(`${baseUrl}/about/`)
            await nav
                .getByRole('link', { name: 'Systems', exact: true })
                .click()
            await page.waitForURL(`${baseUrl}/design-systems/`)
            const opener = page.getByRole('button', {
                name: 'Open A home for the collection at full resolution',
                exact: true,
            })
            await opener.click()
            const dialog = page.getByRole('dialog')
            await dialog.waitFor()
            await page.waitForFunction(() => {
                const image = document.querySelector('[role="dialog"] img')
                return image?.complete && image.naturalWidth > 0
            })
            const close = dialog.getByRole('button', {
                name: 'Close full-size image',
            })
            assert(
                await close.evaluate(
                    (element) => element === document.activeElement
                ),
                'Lightbox should receive focus'
            )
            await page.keyboard.press('Escape')
            await dialog.waitFor({ state: 'hidden' })
            assert(
                await opener.evaluate(
                    (element) => element === document.activeElement
                ),
                'Lightbox should restore focus'
            )
            await opener.click()
            await close.click()
            await dialog.waitFor({ state: 'hidden' })
            assert.deepEqual(errors, [], `${name}: browser errors`)
            console.log(
                `PASS ${name}: routes, navigation, overflow, and lightbox`
            )
        } catch (error) {
            mkdirSync('test-results', { recursive: true })
            await page
                .screenshot({
                    path: `test-results/smoke-${name}.png`,
                    fullPage: true,
                })
                .catch(() => {})
            throw error
        } finally {
            await page.close()
        }
    }
} finally {
    await browser?.close()
    await new Promise((resolve) => server.httpServer.close(resolve))
}
