import React from 'react';
import MainLayout from '../layout/MainLayout';
import BalanceCard from '../components/dashboard/BalanceCard';
import QuickActions from '../components/dashboard/QuickActions';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import CashflowChart from '../components/dashboard/CashflowChart';
import ExpenseBreakdown from '../components/dashboard/ExpenseBreakdown';
import SavingPlans from '../components/dashboard/SavingPlans';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const { userData, currentUser } = useAuth();

    // If loading or no data yet, should be handled by App.jsx or AuthContext loading state, 
    // but safe check here.
    if (!userData) return null;

    return (
        <MainLayout title="Overview">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Left Column */}
                <div className="space-y-6 lg:col-span-2">
                    <div className="grid gap-6 md:grid-cols-2">
                        <BalanceCard currentUser={userData.currentUser} />
                        <div className="flex flex-col gap-6">
                            <QuickActions />
                            {/* Placeholder for Daily Limit or another small widget */}
                            <div className="flex-1 rounded-xl bg-gradient-to-br from-green-50 to-white p-6 shadow-sm ring-1 ring-green-100">
                                <h3 className="mb-2 text-sm font-semibold text-gray-700">Daily Budget</h3>
                                <div className="flex items-end space-x-2">
                                    <span className="text-2xl font-bold text-gray-900">$124.50</span>
                                    <span className="mb-1 text-xs text-gray-500">/ $400.00</span>
                                </div>
                                <div className="mt-3 h-2 w-full rounded-full bg-gray-200">
                                    <div className="h-full w-[30%] rounded-full bg-primary"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <CashflowChart data={userData.cashflowData} />
                    <RecentTransactions transactions={userData.recentTransactions.slice(0, 5)} />
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    <SavingPlans plans={userData.savingPlans} />
                    <ExpenseBreakdown expenses={userData.expensesByCategory} />
                    {/* Promo Card */}

                </div>
            </div>
        </MainLayout>
    );
};

export default Dashboard;
