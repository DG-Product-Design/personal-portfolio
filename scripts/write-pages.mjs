// GitHub Pages resolves directory indexes, but does not rewrite arbitrary URLs to the SPA.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { createSiteRoutes } from './site-routes.mjs'

const output = new URL('../build/', import.meta.url)
const serverOutput = new URL('../.ssr-build/', import.meta.url)
const site = JSON.parse(
    await readFile(new URL('../src/content/site.json', import.meta.url), 'utf8')
)
const siteUrl = site.siteUrl
const personId = `${siteUrl}#david-a-george`
const websiteId = `${siteUrl}#website`
const { render } = await import(new URL('entry-server.js', serverOutput))
const shell = await readFile(new URL('index.html', output), 'utf8')
const projects = JSON.parse(
    await readFile(
        new URL('../src/content/projects.json', import.meta.url),
        'utf8'
    )
)
const routes = createSiteRoutes(projects)
const { home: homeImage, creativeStudio } = JSON.parse(
    await readFile(
        new URL('../src/content/critical-images.json', import.meta.url),
        'utf8'
    )
)
const escape = (value) =>
    value.replace(
        /[&<>"']/g,
        (char) =>
            ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;',
            })[char]
    )

const preloadImage = (html, attributes) =>
    html.replace(
        '</head>',
        () =>
            `  <link rel="preload" as="image" fetchpriority="high" ${attributes} />\n  </head>`
    )

const withPrerenderedApp = (html, path) =>
    html.replace('<div id="root"></div>', () => {
        return `<div id="root">${render(path)}</div>`
    })

const structuredData = (url, name, type = 'WebPage') => ({
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Person',
            '@id': personId,
            name: site.name,
            url: siteUrl,
            jobTitle: site.jobTitle,
            sameAs: [site.linkedInUrl, site.githubUrl],
            knowsAbout: [
                'Product engineering',
                'Product discovery',
                'User experience',
                'Experimentation',
                'Full-stack engineering',
                'AI and agentic systems',
            ],
        },
        {
            '@type': 'WebSite',
            '@id': websiteId,
            url: siteUrl,
            name: site.name,
            publisher: { '@id': personId },
        },
        {
            '@type': type,
            '@id': `${url}#page`,
            url,
            name,
            isPartOf: { '@id': websiteId },
            ...(type === 'ProfilePage'
                ? { mainEntity: { '@id': personId } }
                : { author: { '@id': personId }, about: { '@id': personId } }),
        },
    ],
})

const withRouteMetadata = (html, routePath, name, type) => {
    const url = new URL(routePath, siteUrl).href
    const json = JSON.stringify(structuredData(url, name, type)).replace(
        /</g,
        '\\u003c'
    )

    return html
        .replace(
            /(<link rel="canonical" href=")[^"]*(" \/>)/,
            (_match, start, end) => `${start}${url}${end}`
        )
        .replace(
            /(<script type="application\/ld\+json" id="structured-data">)[\s\S]*?(<\/script>)/,
            (_match, start, end) => `${start}${json}${end}`
        )
}

const homeRoute = routes[0]
await writeFile(
    new URL(homeRoute.filePath, output),
    withRouteMetadata(
        withPrerenderedApp(
            preloadImage(
                shell,
                `imagesrcset="${escape(homeImage.srcSet)}" imagesizes="${escape(homeImage.sizes)}"`
            ),
            homeRoute.routePath
        ),
        homeRoute.routePath,
        site.title,
        homeRoute.schemaType
    )
)

for (const route of routes.slice(1)) {
    const { filePath, routePath, title, description, schemaType } = route
    const file = new URL(filePath, output)
    const pageTitle = escape(`${title} | ${site.name}`)
    const pageDescription = escape(description)
    const routeShell =
        filePath === 'work/creative-studio/index.html'
            ? preloadImage(shell, `href="${escape(creativeStudio.src)}"`)
            : shell
    await mkdir(new URL('.', file), { recursive: true })
    await writeFile(
        file,
        withRouteMetadata(
            withPrerenderedApp(routeShell, routePath),
            routePath,
            pageTitle.replace(/&amp;/g, '&'),
            schemaType
        )
            .replace(
                /<title>[^<]*<\/title>/,
                () => `<title>${pageTitle}</title>`
            )
            .replace(
                /(<meta (?:name="description"|name="twitter:description"|property="og:description") content=")[^"]*(")/g,
                (_match, start, end) => `${start}${pageDescription}${end}`
            )
            .replace(
                /(<meta (?:name="twitter:title"|property="og:title") content=")[^"]*(")/g,
                (_match, start, end) => `${start}${pageTitle}${end}`
            )
            .replace(
                /(<meta property="og:url" content=")([^"]*)(")/,
                (_match, start, siteUrl, end) =>
                    `${start}${new URL(filePath.replace(/index\.html$/, ''), siteUrl).href}${end}`
            )
    )
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
    .filter(({ includeInSitemap }) => includeInSitemap)
    .map(
        ({ routePath }) =>
            `  <url><loc>${new URL(routePath, siteUrl).href}</loc></url>`
    )
    .join('\n')}
</urlset>
`
await writeFile(new URL('sitemap.xml', output), sitemap)
await writeFile(
    new URL('robots.txt', output),
    `User-agent: *\nDisallow:\n\nSitemap: ${new URL('sitemap.xml', siteUrl).href}\n`
)
await writeFile(new URL('CNAME', output), `${new URL(siteUrl).hostname}\n`)
await rm(serverOutput, { recursive: true, force: true })
