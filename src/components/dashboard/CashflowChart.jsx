import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const CashflowChart = ({ data = [] }) => {
    return (
        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
            <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">Cashflow</h3>
                <select className="rounded-lg border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600 focus:outline-none">
                    <option>Last 7 Months</option>
                    <option>Last 12 Months</option>
                </select>
            </div>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6B7280', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6B7280', fontSize: 12 }}
                        />
                        <Tooltip
                            cursor={{ fill: '#F3F4F6' }}
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Legend
                            verticalAlign="top"
                            height={36}
                            iconType="circle"
                            wrapperStyle={{ fontSize: '12px', fontWeight: 500 }}
                        />
                        <Bar
                            dataKey="Income"
                            fill="#2F9E44"
                            radius={[4, 4, 0, 0]}
                            barSize={20}
                        />
                        <Bar
                            dataKey="Expense"
                            fill="#1F2937"
                            radius={[4, 4, 0, 0]}
                            barSize={20}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default CashflowChart;
