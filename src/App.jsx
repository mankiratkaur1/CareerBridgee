import React, { useState } from 'react';

// Import Components
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import JobListings from './components/JobListings';
import SuccessStories from './components/SuccessStories';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage';

// Import Pages
import JobsPage from './pages/JobsPage';
import CompaniesPage from './pages/CompaniesPage';
import AboutPage from './pages/AboutPage';

// Main App Component
export default function App() {
    // This state will control which view is shown: 'home', 'login', 'jobs', 'companies', or 'about'
    const [currentView, setCurrentView] = useState('home');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const showLoginPage = () => setCurrentView('login');
    const showHomePage = () => setCurrentView('home');
    const showJobsPage = () => setCurrentView('jobs');
    const showCompaniesPage = () => setCurrentView('companies');
    const showAboutPage = () => setCurrentView('about');
    
    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        showHomePage();
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        // Optionally, you can redirect to home or login page after logout
        showHomePage();
    };

    // A simple router to render content based on the current view
    const renderView = () => {
        switch (currentView) {
            case 'login':
                return <LoginPage onLoginSuccess={handleLoginSuccess} />;
            case 'jobs':
                return <JobsPage />;
            case 'companies':
                return <CompaniesPage />;
            case 'about':
                return <AboutPage />;
            default:
                // Default to home view
                return (
                    <>
                        <main>
                            <HeroSection />
                            <JobListings />
                            <SuccessStories />
                        </main>
                    </>
                );
        }
    }

    return (
        <div className="bg-gray-50 font-sans">
            <Header 
                onLoginClick={showLoginPage} 
                onLogoutClick={handleLogout} 
                isLoggedIn={isLoggedIn}
                onJobsClick={showJobsPage}
                onCompaniesClick={showCompaniesPage}
                onAboutClick={showAboutPage}
                onHomeClick={showHomePage}
            />
            {renderView()}
            <Footer />
        </div>
    );
}