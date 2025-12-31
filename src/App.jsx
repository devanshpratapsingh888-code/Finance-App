import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Transactions from './pages/Transactions';
import Invoices from './pages/Invoices';
import Cards from './pages/Cards';
import Savings from './pages/Savings';
import Investments from './pages/Investments';
import Inbox from './pages/Inbox';
import Promos from './pages/Promos';
import Insights from './pages/Insights';
import PlaceholderPage from './pages/PlaceholderPage';

// Internal component to consume AuthContext
const AppContent = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const { currentUser, loading } = useAuth();

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      const link = e.target.closest('a');
      if (link && link.getAttribute('href') && link.getAttribute('href').startsWith('/')) {
        e.preventDefault();
        const path = link.getAttribute('href');
        window.history.pushState({}, '', path);
        setCurrentPath(path);
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  // Auth Protection Logic
  useEffect(() => {
    if (!loading) {
      if (!currentUser && (currentPath !== '/login' && currentPath !== '/signup')) {
        window.history.pushState({}, '', '/login');
        setCurrentPath('/login');
      } else if (currentUser && (currentPath === '/login' || currentPath === '/signup')) {
        window.history.pushState({}, '', '/');
        setCurrentPath('/');
      }
    }
  }, [currentUser, loading, currentPath]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const getPage = () => {
    // If not logged in, only show public pages
    if (!currentUser) {
      if (currentPath === '/signup') return <SignUp />;
      return <Login />;
    }

    switch (currentPath) {
      case '/':
        return <Dashboard />;
      case '/transactions':
        return <Transactions />;
      case '/invoices':
        return <Invoices />;
      case '/cards':
        return <Cards />;
      case '/savings':
        return <Savings />;
      case '/investments':
        return <Investments />;
      case '/inbox':
        return <Inbox />;
      case '/promos':
        return <Promos />;
      case '/insights':
        return <Insights />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      {getPage()}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
