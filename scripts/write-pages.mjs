// GitHub Pages resolves directory indexes, but does not rewrite arbitrary URLs to the SPA.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'

const output = new URL('../build/', import.meta.url)
const serverOutput = new URL('../.ssr-build/', import.meta.url)
const siteUrl = 'https://davidageorge.me/'
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
const { home, creativeStudio } = JSON.parse(
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
            name: 'David A. George',
            url: siteUrl,
            jobTitle: 'Senior Product Engineer',
            sameAs: [
                'https://www.linkedin.com/in/dg-product-engineer',
                'https://github.com/DG-Product-Design',
            ],
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
            name: 'David A. George',
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

await writeFile(
    new URL('index.html', output),
    withRouteMetadata(
        withPrerenderedApp(
            preloadImage(
                shell,
                `imagesrcset="${escape(home.srcSet)}" imagesizes="${escape(home.sizes)}"`
            ),
            '/'
        ),
        '/',
        'David A. George | Senior Product Engineer',
        'ProfilePage'
    )
)

const pages = [
    [
        'about/index.html',
        '/about/',
        'About',
        'About David A. George, Senior Product Engineer working across product discovery, UX, experimentation, full-stack engineering, and agentic AI.',
        'ProfilePage',
    ],
    ...projects.map(({ slug, name, intro }) => [
        `work/${slug}/index.html`,
        `/work/${slug}/`,
        name,
        intro,
        'CreativeWork',
    ]),
    [
        '404.html',
        '/404',
        'Page not found',
        'This portfolio page could not be found.',
        'WebPage',
    ],
]

for (const [filePath, routePath, title, description, type] of pages) {
    const file = new URL(filePath, output)
    const pageTitle = escape(`${title} | David A. George`)
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
            type
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

const sitemapRoutes = [
    '/',
    '/about/',
    ...projects.map(({ slug }) => `/work/${slug}/`),
]
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapRoutes.map((path) => `  <url><loc>${new URL(path, siteUrl).href}</loc></url>`).join('\n')}
</urlset>
`
await writeFile(new URL('sitemap.xml', output), sitemap)
await rm(serverOutput, { recursive: true, force: true })
