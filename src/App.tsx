import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import CaseStudyPage from './pages/CaseStudyPage'
import Error404Page from './pages/404'
import projects from './content/projects.json'

export default function App() {
    const path = window.location.pathname
        .replace(/\/index\.html$/, '/')
        .replace(/\/+$/, '')
    if (!path) return <HomePage />
    if (path === '/about') return <AboutPage />

    const index = projects.findIndex(({ slug }) => path === `/work/${slug}`)
    if (index === -1) return <Error404Page />

    return (
        <CaseStudyPage
            project={projects[index]}
            next={projects[(index + 1) % projects.length]}
        />
    )
}
