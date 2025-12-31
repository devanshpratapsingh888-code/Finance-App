import React, { useState } from 'react';
import MainLayout from '../layout/MainLayout';
import { recentTransactions } from '../data/mockData';
import { Search, Filter, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { cn } from '../lib/utils';
import TransactionModal from '../components/dashboard/TransactionModal';

// Enhanced mock data generator for more items
const allTransactions = [
    ...recentTransactions,
    { id: 6, name: "Amazon Purchase", date: "18 Dec 2024", amount: -120.50, status: "Completed", type: "expense", category: "Shopping", icon: "shopping-cart" },
    { id: 7, name: "Freelance Project", date: "15 Dec 2024", amount: 1200.00, status: "Completed", type: "income", category: "Freelance", icon: "briefcase" },
    { id: 8, name: "Gym Membership", date: "12 Dec 2024", amount: -45.00, status: "Completed", type: "expense", category: "Health", icon: "zap" },
    { id: 9, name: "Mobile Bill", date: "10 Dec 2024", amount: -60.00, status: "Completed", type: "expense", category: "Utilities", icon: "zap" },
    { id: 10, name: "Dividend Payout", date: "05 Dec 2024", amount: 150.25, status: "Completed", type: "income", category: "Investment", icon: "trending-up" },
    { id: 11, name: "Uber Ride", date: "04 Dec 2024", amount: -18.40, status: "Cancelled", type: "expense", category: "Transport", icon: "car" },
];

const Transactions = () => {
    const [filter, setFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTx, setSelectedTx] = useState(null);

    const filteredData = allTransactions.filter(tx => {
        const matchesFilter = filter === 'All' ||
            (filter === 'Income' && tx.type === 'income') ||
            (filter === 'Expense' && tx.type === 'expense');

        const matchesSearch = tx.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tx.category.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesFilter && matchesSearch;
    });

    return (
        <MainLayout title="Transactions">
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                {/* Controls */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search transaction..."
                            className="w-full sm:w-64 rounded-lg bg-gray-50 py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setFilter('All')}
                            className={cn("rounded-lg px-4 py-2 text-sm font-medium transition-colors", filter === 'All' ? "bg-primary text-white" : "bg-gray-50 text-gray-600 hover:bg-gray-100")}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilter('Income')}
                            className={cn("rounded-lg px-4 py-2 text-sm font-medium transition-colors", filter === 'Income' ? "bg-green-100 text-green-700" : "bg-gray-50 text-gray-600 hover:bg-gray-100")}
                        >
                            Income
                        </button>
                        <button
                            onClick={() => setFilter('Expense')}
                            className={cn("rounded-lg px-4 py-2 text-sm font-medium transition-colors", filter === 'Expense' ? "bg-red-100 text-red-700" : "bg-gray-50 text-gray-600 hover:bg-gray-100")}
                        >
                            Expense
                        </button>
                        <button className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">
                            <Filter className="h-4 w-4" />
                            <span>Filter</span>
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-500">
                        <thead className="bg-gray-50 text-xs text-gray-700 uppercase">
                            <tr>
                                <th className="px-6 py-3">Transaction</th>
                                <th className="px-6 py-3">Category</th>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.length > 0 ? (
                                filteredData.map((item) => (
                                    <tr
                                        key={item.id}
                                        onClick={() => setSelectedTx(item)}
                                        className="border-b bg-white hover:bg-gray-50 cursor-pointer transition-colors"
                                    >
                                        <td className="w-1/3 px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className={cn(
                                                    "flex h-8 w-8 items-center justify-center rounded-full mr-3",
                                                    item.type === 'income' ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                                                )}>
                                                    {item.type === 'income' ? <ArrowDownLeft className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                                                </div>
                                                <span className="font-semibold text-gray-900">{item.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">{item.category}</td>
                                        <td className="px-6 py-4">{item.date}</td>
                                        <td className="px-6 py-4">
                                            <span className={cn(
                                                "px-2.5 py-0.5 rounded-full text-xs font-semibold",
                                                item.status === "Completed" ? "bg-green-100 text-green-800" :
                                                    item.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                                                        "bg-red-100 text-red-800"
                                            )}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className={cn(
                                            "px-6 py-4 text-right font-bold",
                                            item.type === 'income' ? "text-green-600" : "text-gray-900"
                                        )}>
                                            {item.type === 'income' ? '+' : ''}{item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                        No transactions found matching your criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Placeholder */}
                <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                    <span className="text-sm text-gray-500">Showing <span className="font-semibold text-gray-900">{filteredData.length > 0 ? 1 : 0}-{Math.min(10, filteredData.length)}</span> of <span className="font-semibold text-gray-900">{filteredData.length}</span></span>
                    <div className="flex space-x-2">
                        <button className="rounded-md border border-gray-300 px-3 py-1 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50" disabled>Previous</button>
                        <button className="rounded-md border border-gray-300 px-3 py-1 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50" disabled>Next</button>
                    </div>
                </div>

                <TransactionModal
                    isOpen={!!selectedTx}
                    data={selectedTx}
                    onClose={() => setSelectedTx(null)}
                />
            </div>
        </MainLayout>
    );
};

export default Transactions;
