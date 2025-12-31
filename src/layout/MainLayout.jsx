import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const MainLayout = ({ children, title }) => {
    return (
        <div className="min-h-screen bg-background">
            <Sidebar />
            <div className="sm:ml-64">
                <Header title={title} />
                <main className="p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
