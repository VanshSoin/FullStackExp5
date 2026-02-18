import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './Home'
import './App.css'

// Lazy load components
// React.lazy takes a function that must call a dynamic import().
// Helper function to simulate a delay for demonstration purposes
const delayForDemo = (promise) => {
    return new Promise(resolve => {
        setTimeout(resolve, 2000);
    }).then(() => promise);
}

// Lazy load components with a delay
const About = React.lazy(() => delayForDemo(import('./About')))
const Contact = React.lazy(() => delayForDemo(import('./Contact')))

function App() {
    return (
        <BrowserRouter>
            {/* Navigation Bar */}
            <nav>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
            </nav>

            {/* Main Content Area */}
            {/* Suspense wraps the lazy loaded components and shows fallback UI while loading */}
            <Suspense fallback={<h2>Loading...</h2>}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}

export default App
