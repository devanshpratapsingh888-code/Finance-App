import React, { useState } from 'react';
import { recentTransactions } from '../../data/mockData';
import { Film, Briefcase, ShoppingCart, Zap, Coffee } from 'lucide-react';
import { cn } from '../../lib/utils';
import TransactionModal from './TransactionModal';

const iconMap = {
    'film': Film,
    'briefcase': Briefcase,
    'shopping-cart': ShoppingCart,
    'zap': Zap,
    'coffee': Coffee
};

const RecentTransactions = () => {
    const [selectedTx, setSelectedTx] = useState(null);

    const handleViewAll = () => {
        window.history.pushState({}, '', '/transactions');
        window.dispatchEvent(new PopStateEvent('popstate'));
    };

    return (
        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
            <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">Recent Transactions</h3>
                <button
                    onClick={handleViewAll}
                    className="text-sm font-medium text-primary hover:text-primary-hover hover:underline"
                >
                    View All
                </button>
            </div>

            <div className="space-y-6">
                {recentTransactions.map((tx) => {
                    const Icon = iconMap[tx.icon] || ShoppingCart;
                    return (
                        <div
                            key={tx.id}
                            onClick={() => setSelectedTx(tx)}
                            className="flex items-center justify-between cursor-pointer rounded-lg p-2 transition-colors hover:bg-gray-50 -mx-2"
                        >
                            <div className="flex items-center">
                                <div className={cn(
                                    "flex h-10 w-10 items-center justify-center rounded-full",
                                    tx.type === 'income' ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"
                                )}>
                                    <Icon className="h-5 w-5" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-semibold text-gray-900">{tx.name}</p>
                                    <p className="text-xs text-gray-500">{tx.category} • {tx.date}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className={cn(
                                    "text-sm font-bold",
                                    tx.type === 'income' ? "text-green-600" : "text-gray-900"
                                )}>
                                    {tx.type === 'income' ? '+' : ''}{tx.amount.toFixed(2)}
                                </p>
                                <div className={cn(
                                    "inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold",
                                    tx.status === "Completed" ? "bg-green-50 text-green-600" :
                                        tx.status === "Pending" ? "bg-yellow-50 text-yellow-600" : "bg-red-50 text-red-600"
                                )}>
                                    {tx.status}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <TransactionModal
                isOpen={!!selectedTx}
                data={selectedTx}
                onClose={() => setSelectedTx(null)}
            />
        </div>
    );
};

export default RecentTransactions;
