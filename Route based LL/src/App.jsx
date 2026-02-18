import React, { Suspense, useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import './App.css';

// Lazy load components
const Services = React.lazy(() => import('./Services'));
const Contact = React.lazy(() => import('./Contact'));

function App() {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    return (
        <div className={`app ${theme}`}>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/services">Services</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
                <button onClick={toggleTheme}>
                    Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
                </button>
            </nav>

            <div className="content">
                <Suspense fallback={<div className="loading">Loading...</div>}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                </Suspense>
            </div>
        </div>
    );
}

export default App;
