import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import site from './src/content/site.json'

const siteTokens: Record<string, string> = {
    __SITE_NAME__: site.name,
    __SITE_JOB_TITLE__: site.jobTitle,
    __SITE_URL__: site.siteUrl,
    __SITE_TITLE__: site.title,
    __SITE_DESCRIPTION__: site.description,
    __SITE_LINKEDIN_URL__: site.linkedInUrl,
    __SITE_GITHUB_URL__: site.githubUrl,
    __SITE_OG_IMAGE__: new URL(site.openGraphImage, site.siteUrl).href,
    __SITE_OG_IMAGE_ALT__: site.openGraphImageAlt,
}

const siteMetadata = {
    name: 'site-metadata',
    transformIndexHtml(html: string) {
        return Object.entries(siteTokens).reduce(
            (result, [token, value]) => result.split(token).join(value),
            html
        )
    },
}

// https://vite.dev/config/
export default defineConfig({
    build: {
        outDir: 'build',
    },
    plugins: [siteMetadata, react(), tailwindcss()],
    publicDir: 'public',
    server: {
        port: 3000,
    },
})
