import { Routes, Route } from 'react-router-dom'
import smoothscroll from 'smoothscroll-polyfill'
import Nav from './components/Nav'
import HomePage from './pages/HomePage'
import Footer from './components/Footer'
import Error404Page from './pages/404'

function App() {
    smoothscroll.polyfill()
    return (
        <div
            id="app"
            className="relative h-screen w-full overflow-x-hidden overflow-y-auto"
        >
            <Nav />
            <Routes>
                <Route
                    path="/"
                    element={<HomePage />}
                />
                <Route
                    path="*"
                    element={<Error404Page />}
                />
            </Routes>
            <Footer />
        </div>
    )
}

export default App
