export const homeRoute = {
    filePath: 'index.html',
    routePath: '/',
    title: null,
    description: null,
    schemaType: 'ProfilePage',
    includeInSitemap: true,
}

export function createSiteRoutes(projects) {
    return [
        homeRoute,
        {
            filePath: 'about/index.html',
            routePath: '/about/',
            title: 'About',
            description:
                'About David A. George, Senior Product Engineer working across product discovery, UX, experimentation, full-stack engineering, and agentic AI.',
            schemaType: 'ProfilePage',
            includeInSitemap: true,
        },
        ...projects.map(({ slug, name, intro }) => ({
            filePath: `work/${slug}/index.html`,
            routePath: `/work/${slug}/`,
            title: name,
            description: intro,
            schemaType: 'CreativeWork',
            includeInSitemap: true,
        })),
        {
            filePath: '404.html',
            routePath: '/404.html',
            title: 'Page not found',
            description: 'This portfolio page could not be found.',
            schemaType: 'WebPage',
            includeInSitemap: false,
        },
    ]
}
