import AxeBuilder from '@axe-core/playwright'
import { existsSync, readFileSync } from 'node:fs'
import { chromium } from 'playwright-core'
import { preview } from 'vite'
import { createSiteRoutes } from './site-routes.mjs'

const root = new URL('../', import.meta.url)
const projects = JSON.parse(
    readFileSync(new URL('src/content/projects.json', root), 'utf8')
)
const routes = createSiteRoutes(projects).map(({ routePath }) => routePath)
const macChrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const executablePath =
    process.env.CHROME_PATH || (existsSync(macChrome) ? macChrome : undefined)

const server = await preview({
    root: new URL('.', root).pathname,
    logLevel: 'error',
    preview: { host: '127.0.0.1', port: 0, strictPort: false },
})
const address = server.httpServer.address()
if (!address || typeof address === 'string') {
    server.httpServer.close()
    throw new Error('Could not determine the local preview address.')
}

const browser = await chromium.launch({
    headless: true,
    ...(executablePath ? { executablePath } : { channel: 'chrome' }),
})
const baseUrl = `http://127.0.0.1:${address.port}`
let violationCount = 0
const localAnalyticsRequests = new Set()

const assert = (condition, message) => {
    if (!condition)
        throw new Error(`Gifting interaction check failed: ${message}`)
}

const runGiftingInteractionChecks = async (page) => {
    const url = new URL('/work/fringe-gifting/', baseUrl).href

    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto(url, { waitUntil: 'networkidle' })
    await page.getByRole('button', { name: 'Start interactive demo' }).click()
    assert(
        await page
            .getByRole('button', { name: 'Starting interactive demo…' })
            .evaluate((element) => element.matches(':focus')),
        'Start should retain focus during the notification delay'
    )
    await page.waitForTimeout(1100)

    const notification = page.getByRole('button', {
        name: /You have a new gift/,
    })
    await notification.waitFor({ state: 'visible' })
    assert(
        await notification.evaluate((element) => element.matches(':focus')),
        'the notification should receive focus when it replaces Start'
    )
    await page.keyboard.press('Tab')
    await page.keyboard.press('Shift+Tab')
    assert(
        (await notification.evaluate(
            (element) => getComputedStyle(element).outlineColor
        )) === 'rgb(50, 16, 78)',
        'light demo surfaces should use the darker focus outline'
    )

    await page.waitForTimeout(3100)
    const giftButton = page.getByRole('button', {
        name: 'Open new gift, 1 unread',
    })
    assert(
        await giftButton.evaluate((element) => element.matches(':focus')),
        'the gift icon should receive focus when the notification closes'
    )

    await giftButton.click()
    const dialog = page.getByRole('dialog')
    const closeButton = dialog.getByRole('button', { name: 'Close gift' })
    const viewButton = dialog.getByRole('button', { name: 'View your gift' })
    const cover = dialog.locator('img[src*="gift-card"]')

    assert(await cover.isHidden(), 'reduced motion should hide the gift cover')
    assert(
        await viewButton.isVisible(),
        'reduced motion should reveal the action'
    )
    assert(
        (await closeButton.count()) === 1,
        'the dialog should render one close control'
    )
    assert(
        await closeButton.evaluate((element) => element.matches(':focus')),
        'the dialog close control should receive initial focus'
    )

    await page.keyboard.press('Shift+Tab')
    assert(
        await viewButton.evaluate((element) => element.matches(':focus')),
        'Shift+Tab from the first control should wrap to the last control'
    )

    await page.keyboard.press('Escape')
    assert(
        await giftButton.evaluate((element) => element.matches(':focus')),
        'Escape should return focus to the gift icon'
    )

    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await page.reload({ waitUntil: 'networkidle' })
    await page.getByRole('button', { name: 'Start interactive demo' }).click()
    await page.waitForTimeout(1100)
    await page.getByRole('button', { name: /You have a new gift/ }).click()

    const animatedViewButton = page
        .getByRole('dialog')
        .getByRole('button', { name: 'View your gift' })
    assert(
        (await animatedViewButton.getAttribute('tabindex')) === '-1',
        'the reveal action should not be focusable while covered'
    )
}

try {
    const context = await browser.newContext()
    const page = await context.newPage()
    page.on('request', (request) => {
        if (request.url().startsWith('https://www.googletagmanager.com/')) {
            localAnalyticsRequests.add(request.url())
        }
    })
    await page.emulateMedia({ reducedMotion: 'reduce' })

    for (const route of routes) {
        await page.goto(new URL(route, baseUrl).href, {
            waitUntil: 'networkidle',
        })
        const results = await new AxeBuilder({ page })
            .exclude('iframe[src*="youtube-nocookie.com"]')
            .exclude('iframe[src*="youtube.com/embed/"]')
            .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
            .analyze()

        if (!results.violations.length) {
            console.log(`PASS ${route}`)
            continue
        }

        console.error(`FAIL ${route}`)
        for (const violation of results.violations) {
            console.error(
                `  ${violation.id} (${violation.impact ?? 'unknown'}): ${violation.help}`
            )
            for (const node of violation.nodes) {
                console.error(`    ${node.target.join(', ')}`)
            }
        }
        violationCount += results.violations.length
    }

    await runGiftingInteractionChecks(page)
    console.log('PASS gifting interaction accessibility')
} finally {
    await browser.close()
    await new Promise((resolve, reject) => {
        server.httpServer.close((error) => (error ? reject(error) : resolve()))
    })
}

if (localAnalyticsRequests.size) {
    console.error('Local preview requested Google Tag Manager:')
    for (const url of localAnalyticsRequests) {
        console.error(`  ${url}`)
    }
    process.exitCode = 1
} else {
    console.log('Local analytics guard passed.')
}

if (violationCount) {
    console.error(
        `Accessibility audit found ${violationCount} violation groups.`
    )
    process.exitCode = 1
} else {
    console.log(`Accessibility audit passed ${routes.length} routes.`)
}
