import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { resolve, relative, sep } from 'node:path'
import { chromium } from 'playwright-core'
import { createSiteRoutes } from './site-routes.mjs'

const root = resolve('build')
const site = JSON.parse(readFileSync('src/content/site.json', 'utf8'))
const projects = JSON.parse(readFileSync('src/content/projects.json', 'utf8'))
const routes = createSiteRoutes(projects)
const macChrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const executablePath =
    process.env.CHROME_PATH || (existsSync(macChrome) ? macChrome : undefined)
const browser = await chromium.launch({ headless: true, executablePath })
const failures = new Set()
const documents = new Map()
let checked = 0

try {
    const page = await browser.newPage()
    // Parse generated HTML without executing scripts or fetching remote resources.
    const documentInfo = async (file) => {
        if (!documents.has(file)) {
            const info = await page.evaluate(
                (html) => {
                    const doc = new DOMParser().parseFromString(
                        html,
                        'text/html'
                    )
                    const refs = []
                    for (const element of doc.querySelectorAll(
                        '[href], [src], [poster], [srcset]'
                    )) {
                        for (const attribute of ['href', 'src', 'poster']) {
                            const value = element.getAttribute(attribute)
                            if (value) refs.push(value)
                        }
                        const srcset = element.getAttribute('srcset')
                        if (srcset && !srcset.includes('data:')) {
                            refs.push(
                                ...srcset
                                    .split(',')
                                    .map(
                                        (entry) => entry.trim().split(/\s+/)[0]
                                    )
                            )
                        }
                    }
                    for (const meta of doc.querySelectorAll(
                        'meta[property="og:image"], meta[name="twitter:image"]'
                    )) {
                        if (meta.content) refs.push(meta.content)
                    }
                    return {
                        refs,
                        ids: [...doc.querySelectorAll('[id], a[name]')].flatMap(
                            (element) =>
                                [
                                    element.id,
                                    element.getAttribute('name'),
                                ].filter(Boolean)
                        ),
                    }
                },
                readFileSync(file, 'utf8')
            )
            documents.set(file, info)
        }
        return documents.get(file)
    }
    const check = async (reference, sourcePath) => {
        try {
            const url = new URL(reference, new URL(sourcePath, site.siteUrl))
            if (url.origin !== new URL(site.siteUrl).origin) return
            const path = resolve(root, `.${decodeURIComponent(url.pathname)}`)
            assert(
                path === root || path.startsWith(root + sep),
                'Path escapes build directory'
            )
            const file =
                existsSync(path) && statSync(path).isDirectory()
                    ? resolve(path, 'index.html')
                    : path
            assert(
                existsSync(file) && statSync(file).isFile(),
                'Missing generated page or asset'
            )
            if (url.hash && file.endsWith('.html')) {
                const id = decodeURIComponent(url.hash.slice(1)).split(
                    ':~:text='
                )[0]
                if (id)
                    assert(
                        (await documentInfo(file)).ids.includes(id),
                        `Missing anchor #${id}`
                    )
            }
            checked++
        } catch (error) {
            failures.add(`${sourcePath} → ${reference}: ${error.message}`)
        }
    }
    for (const route of routes) {
        const file = resolve(root, route.filePath)
        if (!existsSync(file)) {
            failures.add(`Missing generated page: ${route.filePath}`)
            continue
        }
        for (const ref of (await documentInfo(file)).refs)
            await check(ref, route.routePath)
    }
    // Fonts and background images can be referenced only by CSS, not page markup.
    for (const name of readdirSync(root, { recursive: true }).filter((name) =>
        name.endsWith('.css')
    )) {
        const css = readFileSync(resolve(root, name), 'utf8')
        for (const match of css.matchAll(
            /url\(\s*['"]?([^'"\s)]+)['"]?\s*\)/g
        )) {
            if (!match[1].startsWith('#'))
                await check(
                    match[1],
                    `/${relative(root, resolve(root, name)).split(sep).join('/')}`
                )
        }
    }
    assert.equal(failures.size, 0, [...failures].join('\n'))
    console.log(
        `PASS ${routes.length} generated pages; ${checked} internal links, anchors, and asset references`
    )
} finally {
    await browser.close()
}
