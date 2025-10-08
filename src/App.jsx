import React, { useState, useEffect, useContext } from 'react';

// Import Components
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import JobListings from './components/JobListings';
import SuccessStories from './components/SuccessStories';
import JobDetails from './components/JobDetails';
import ApplicationForm from './components/ApplicationForm';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage';

// Import Pages
import JobsPage from './pages/JobsPage';
import CompaniesPage from './pages/CompaniesPage';
import AboutPage from './pages/AboutPage';
import ResumePage from './pages/ResumePage';

// Import Context Providers
import { AuthProvider, AuthContext } from './context/AuthContext';
import { JobProvider } from './context/JobContext';

// Main App Component
function AppContent() {
    // This state will control which view is shown: 'home', 'login', 'jobs', 'companies', 'about', or 'resume'
    const [currentView, setCurrentView] = useState('home');
    // State for modals, moved up from JobListings
    const [selectedJobId, setSelectedJobId] = useState(null);
    const [showApplicationForm, setShowApplicationForm] = useState(false);
    const [companyFilter, setCompanyFilter] = useState(null);
    const [searchFilters, setSearchFilters] = useState({ term: '', location: '' });
    
    // Get auth context
    // This will now correctly get the context from AuthProvider
    const { isAuthenticated, user, logout, loadUser } = useContext(AuthContext);
    
    // Check if user is already logged in on component mount
    useEffect(() => {
        if (localStorage.getItem('token')) {
            loadUser();
        }
    }, []);

    const showLoginPage = () => setCurrentView('login');
    const showHomePage = () => setCurrentView('home');
    const showJobsPage = () => {
        setCompanyFilter(null); // Clear filter when navigating from header
        setSearchFilters({ term: '', location: '' });
        setCurrentView('jobs');
    };
    const showCompaniesPage = () => setCurrentView('companies');
    const showAboutPage = () => setCurrentView('about');
    const showResumePage = () => setCurrentView('resume');
    
    const handleLoginSuccess = () => {
        // This is the key change: reload user data after login
        loadUser();
        showHomePage();
    };

    const handleLogout = () => {
        logout();
        showHomePage();
    };

    const handleViewCompanyJobs = (companyName) => {
        setCompanyFilter(companyName);
        setCurrentView('jobs');
    };

    const handleHeroSearch = (term, location) => {
        setCompanyFilter(null); // Clear company-specific filter
        setSearchFilters({ term, location });
        setCurrentView('jobs');
    };

    // Modal handlers moved up from JobListings
    const handleViewDetails = (jobId) => {
        setSelectedJobId(jobId);
    };

    const handleCloseDetails = () => {
        setSelectedJobId(null);
    };

    const handleApply = (jobId) => {
        setShowApplicationForm(true);
    };

    const handleCloseApplication = () => {
        setShowApplicationForm(false);
        setSelectedJobId(null);
    };

    const handleApplicationSuccess = () => {
        setShowApplicationForm(false);
        setSelectedJobId(null);
    };

    // Function to render the current view
    const renderView = () => {
        switch (currentView) {
            case 'home':
                return (
                    <>
                        <HeroSection onSearch={handleHeroSearch} />
                        <JobListings onViewDetails={handleViewDetails} />
                        <SuccessStories />
                    </>
                );
            case 'login':
                return <LoginPage onLoginSuccess={handleLoginSuccess} />;
            case 'jobs':
                return <JobsPage companyFilter={companyFilter} initialFilters={searchFilters} />;
            case 'companies':
                return <CompaniesPage onViewJobs={handleViewCompanyJobs} />;
            case 'about':
                return <AboutPage />;
            case 'resume':
                return <ResumePage />;
            default:
                return (
                    <>
                        <HeroSection onSearch={handleHeroSearch} />
                        <JobListings onViewDetails={handleViewDetails} />
                        <SuccessStories />
                    </>
                );
        }
    };

    return (
        <div className="app">
            <Header 
                onLoginClick={showLoginPage} 
                onHomeClick={showHomePage}
                onJobsClick={showJobsPage}
                onCompaniesClick={showCompaniesPage}
                onAboutClick={showAboutPage}
                onResumeClick={showResumePage}
                onLogout={handleLogout}
            />
            {renderView()}
            <Footer />

            {/* Modals are now rendered at the top level */}
            {selectedJobId && !showApplicationForm && (
                <JobDetails 
                    jobId={selectedJobId} 
                    onClose={handleCloseDetails}
                    onApply={handleApply}
                />
            )}
            
            {showApplicationForm && (
                <ApplicationForm 
                    jobId={selectedJobId}
                    onClose={handleCloseApplication}
                    onSuccess={handleApplicationSuccess}
                />
            )}
        </div>
    );
}

// This component now correctly wraps AppContent with providers
function App() {
    return (
        <AuthProvider>
            <JobProvider>
                <AppContent />
            </JobProvider>
        </AuthProvider>
    );
}

// The default export remains the main entry point
export default App;