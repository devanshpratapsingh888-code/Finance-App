import React from 'react';
import { currentUser } from '../../data/mockData';
import { CreditCard, Wifi } from 'lucide-react';

const BalanceCard = () => {
    return (
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 p-6 text-white shadow-lg">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-xs font-medium text-gray-400">Total Balance</p>
                    <h3 className="text-3xl font-bold tracking-tight">${currentUser.balance.toLocaleString()}</h3>
                </div>
                <Wifi className="h-6 w-6 rotate-90 text-gray-500" />
            </div>

            <div className="mt-8 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <div className="flex h-8 w-12 items-center justify-center rounded bg-white/10">
                        <div className="h-4 w-4 rounded-full bg-red-500/80"></div>
                        <div className="-ml-2 h-4 w-4 rounded-full bg-yellow-500/80"></div>
                    </div>
                </div>
                <p className="font-mono text-lg tracking-wider text-gray-300">{currentUser.cardNumber}</p>
            </div>

            <div className="mt-6 flex items-center justify-between text-xs font-medium text-gray-400">
                <div>
                    <p className="mb-1">Card Holder</p>
                    <p className="text-sm text-white uppercase">{currentUser.name}</p>
                </div>
                <div className="text-right">
                    <p className="mb-1">Expires</p>
                    <p className="text-sm text-white">{currentUser.expiry}</p>
                </div>
            </div>

            {/* Abstract circles for decoration */}
            <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/5 blur-2xl"></div>
            <div className="absolute -bottom-10 -left-6 h-40 w-40 rounded-full bg-primary/20 blur-3xl"></div>
        </div>
    );
};

export default BalanceCard;
