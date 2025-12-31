import React from 'react';
import MainLayout from '../layout/MainLayout';
import { insightsData } from '../data/mockData';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Insights = () => {
    return (
        <MainLayout title="Financial Insights">
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                <h3 className="mb-6 text-lg font-bold text-gray-900">Spending Trends</h3>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={insightsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorSpending" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#2F9E44" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#2F9E44" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <Tooltip />
                            <Area type="monotone" dataKey="Spending" stroke="#2F9E44" fillOpacity={1} fill="url(#colorSpending)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </MainLayout>
    );
};

export default Insights;
