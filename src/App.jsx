import React, { useState } from 'react';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Invoices from './pages/Invoices';
import Cards from './pages/Cards';
import Savings from './pages/Savings';
import Investments from './pages/Investments';
import Inbox from './pages/Inbox';
import Promos from './pages/Promos';
import Insights from './pages/Insights';
import PlaceholderPage from './pages/PlaceholderPage';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  React.useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  React.useEffect(() => {
    const handleClick = (e) => {
      const link = e.target.closest('a');
      if (link && link.getAttribute('href') && link.getAttribute('href').startsWith('/')) {
        e.preventDefault();
        const path = link.getAttribute('href');
        window.history.pushState({}, '', path);
        setCurrentPath(path);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const getPage = () => {
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
}

export default App;
