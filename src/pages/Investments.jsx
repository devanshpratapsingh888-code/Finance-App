import React from 'react';
import MainLayout from '../layout/MainLayout';
import { investmentsData } from '../data/mockData';
import { TrendingUp, TrendingDown, PieChart as PieChartIcon, Activity } from 'lucide-react';
import { cn } from '../lib/utils';
import { BarChart, Bar, ResponsiveContainer, XAxis } from 'recharts';

const Investments = () => {
    return (
        <MainLayout title="Investments">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Portfolio Summary */}
                <div className="rounded-xl bg-gray-900 p-6 text-white lg:col-span-2">
                    <div className="mb-8">
                        <p className="text-sm text-gray-400">Total Portfolio Value</p>
                        <div className="flex items-end gap-4">
                            <h2 className="text-4xl font-bold">$42,593.50</h2>
                            <div className="flex items-center gap-1 rounded-full bg-green-500/20 px-2 py-1 text-sm font-medium text-green-400">
                                <TrendingUp className="h-4 w-4" />
                                <span>+2.4%</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="rounded-lg bg-gray-800 p-4">
                            <p className="mb-1 text-xs text-gray-400">Stocks</p>
                            <h4 className="font-bold">$24,500</h4>
                        </div>
                        <div className="rounded-lg bg-gray-800 p-4">
                            <p className="mb-1 text-xs text-gray-400">Crypto</p>
                            <h4 className="font-bold">$12,400</h4>
                        </div>
                        <div className="rounded-lg bg-gray-800 p-4">
                            <p className="mb-1 text-xs text-gray-400">Cash</p>
                            <h4 className="font-bold">$5,693</h4>
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <h3 className="mb-4 font-bold text-gray-900">Allocation</h3>
                    <div className="flex items-center justify-center p-4">
                        <PieChartIcon className="h-32 w-32 text-primary" />
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Stocks</span>
                            <span className="font-medium text-gray-900">58%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-gray-100">
                            <div className="h-full w-[58%] rounded-full bg-primary"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                <h3 className="mb-4 font-bold text-gray-900">Assets</h3>
                <table className="w-full text-left text-sm text-gray-500">
                    <thead className="bg-gray-50 text-xs text-gray-700 uppercase">
                        <tr>
                            <th className="px-6 py-3">Asset</th>
                            <th className="px-6 py-3">Symbol</th>
                            <th className="px-6 py-3">Price</th>
                            <th className="px-6 py-3">Holdings</th>
                            <th className="px-6 py-3">Value</th>
                            <th className="px-6 py-3">24h Change</th>
                        </tr>
                    </thead>
                    <tbody>
                        {investmentsData.map((asset) => (
                            <tr key={asset.id} className="border-b hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                                            <Activity className="h-4 w-4" />
                                        </div>
                                        {asset.name}
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-mono">{asset.symbol}</td>
                                <td className="px-6 py-4">${asset.currentPrice.toLocaleString()}</td>
                                <td className="px-6 py-4">{asset.quantity}</td>
                                <td className="px-6 py-4 font-bold text-gray-900">${(asset.quantity * asset.currentPrice).toLocaleString()}</td>
                                <td className="px-6 py-4">
                                    <div className={cn("flex items-center gap-1", asset.change >= 0 ? "text-green-600" : "text-red-600")}>
                                        {asset.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                                        {Math.abs(asset.change)}%
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </MainLayout>
    );
};

export default Investments;
