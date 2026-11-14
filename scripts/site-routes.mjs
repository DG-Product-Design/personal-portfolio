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
                'About David A. George, Senior Product Engineer and Design Engineerworking across product discovery, UX, experimentation, full-stack engineering, and agentic AI.',
            schemaType: 'ProfilePage',
            includeInSitemap: true,
        },
        {
            filePath: 'design-systems/index.html',
            routePath: '/design-systems/',
            title: 'Design Systems',
            description:
                'Design systems and component-library work by David A. George across tokens, theming, accessibility, Storybook, reusable components, and production engineering.',
            schemaType: 'CollectionPage',
            includeInSitemap: true,
        },
        {
            filePath: 'work/fringe-gifting/index.html',
            routePath: '/work/fringe-gifting/',
            title: 'Fringe Gifting Experience',
            description:
                'An interactive case study showing how David A. George designed and built a celebratory gifting experience for the Fringe marketplace.',
            schemaType: 'CreativeWork',
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
