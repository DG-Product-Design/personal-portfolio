import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import DesignSystemsPage from './pages/DesignSystemsPage'
import GiftingExperiencePage from './pages/GiftingExperiencePage'
import CaseStudyPage from './pages/CaseStudyPage'
import Error404Page from './pages/404'
import projects from './content/projects.json'

export default function App({ path: requestedPath }: { path?: string }) {
    const path = (requestedPath ?? window.location.pathname)
        .replace(/\/index\.html$/, '/')
        .replace(/\/+$/, '')
    if (!path) return <HomePage />
    if (path === '/about') return <AboutPage />
    if (path === '/design-systems') return <DesignSystemsPage />
    if (path === '/work/fringe-gifting') return <GiftingExperiencePage />

    const index = projects.findIndex(({ slug }) => path === `/work/${slug}`)
    if (index === -1) return <Error404Page />

    return (
        <CaseStudyPage
            project={projects[index]}
            next={projects[(index + 1) % projects.length]}
        />
    )
}
