import React from 'react';
import MainLayout from '../layout/MainLayout';
import { Construction } from 'lucide-react';

const PlaceholderPage = ({ title }) => {
    return (
        <MainLayout title={title}>
            <div className="flex h-[60vh] flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Construction className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Coming Soon</h2>
                <p className="mt-2 max-w-sm text-sm text-gray-500">
                    The <span className="font-semibold text-gray-700">{title}</span> feature is currently under development. Check back later for updates!
                </p>
                <button
                    onClick={() => window.history.back()}
                    className="mt-6 rounded-lg bg-primary px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
                >
                    Go Back
                </button>
            </div>
        </MainLayout>
    );
};

export default PlaceholderPage;
