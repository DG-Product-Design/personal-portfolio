// GitHub Pages resolves directory indexes, but does not rewrite arbitrary URLs to the SPA.
import { mkdir, readFile, writeFile } from 'node:fs/promises'

const output = new URL('../build/', import.meta.url)
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

await writeFile(
    new URL('index.html', output),
    preloadImage(
        shell,
        `imagesrcset="${escape(home.srcSet)}" imagesizes="${escape(home.sizes)}"`
    )
)

const pages = [
    [
        'about/index.html',
        'About',
        'About David A. George, software engineer working across product, UX, and full-stack development.',
    ],
    ...projects.map(({ slug, name, intro }) => [
        `work/${slug}/index.html`,
        name,
        intro,
    ]),
    ['404.html', 'Page not found', 'This portfolio page could not be found.'],
]

for (const [path, title, description] of pages) {
    const file = new URL(path, output)
    const pageTitle = escape(`${title} | David A. George`)
    const pageDescription = escape(description)
    const routeShell =
        path === 'work/creative-studio/index.html'
            ? preloadImage(shell, `href="${escape(creativeStudio.src)}"`)
            : shell
    await mkdir(new URL('.', file), { recursive: true })
    await writeFile(
        file,
        routeShell
            .replace(
                /<title>[^<]*<\/title>/,
                () => `<title>${pageTitle}</title>`
            )
            .replace(
                /(<meta (?:name="description"|property="og:description") content=")[^"]*(")/g,
                (_match, start, end) => `${start}${pageDescription}${end}`
            )
            .replace(
                /(<meta property="og:title" content=")[^"]*(")/,
                (_match, start, end) => `${start}${pageTitle}${end}`
            )
            .replace(
                /(<meta property="og:url" content=")([^"]*)(")/,
                (_match, start, siteUrl, end) =>
                    `${start}${new URL(path.replace(/index\.html$/, ''), siteUrl).href}${end}`
            )
    )
}
