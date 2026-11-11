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
