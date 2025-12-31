import React, { useState } from 'react';
import MainLayout from '../layout/MainLayout';
import { useAuth } from '../context/AuthContext';
import { Plus, CreditCard, Lock, Eye } from 'lucide-react';
import { cn } from '../lib/utils';
import AddCardModal from '../components/dashboard/AddCardModal';

const Cards = () => {
    const { userData } = useAuth();
    const cardsData = userData ? userData.cardsData : [];

    const [selectedCardId, setSelectedCardId] = useState(cardsData[0]?.id);
    const [showDetails, setShowDetails] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const selectedCard = cardsData.find(c => c.id === selectedCardId) || cardsData[0];

    const getDisplayNumber = (card) => {
        if (showDetails && card.id === selectedCardId) {
            // Simulate revealing the number
            return `4532 7564 1234 ${card.number.slice(-4)}`;
        }
        return card.number;
    };

    const handleChangePin = () => {
        alert(`PIN change request sent for card ending in ${selectedCard.number.slice(-4)}`);
    };

    return (
        <MainLayout title="My Cards">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">Your Payment Methods</h2>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover"
                >
                    <Plus className="h-4 w-4" />
                    <span>Add New Card</span>
                </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {cardsData.map((card) => (
                    <div
                        key={card.id}
                        onClick={() => {
                            setSelectedCardId(card.id);
                            setShowDetails(false); // Reset details view when switching
                        }}
                        className={cn(
                            "relative overflow-hidden rounded-xl p-6 shadow-lg transition-all hover:scale-[1.02] cursor-pointer ring-2 ring-offset-2",
                            card.id === selectedCardId ? "ring-primary" : "ring-transparent",
                            card.theme === 'dark' ? "bg-gray-900 text-white" : "bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800"
                        )}
                    >
                        <div className="mb-8 flex items-start justify-between">
                            <div>
                                <p className={cn("text-xs font-medium", card.theme === 'dark' ? "text-gray-400" : "text-gray-500")}>Current Balance</p>
                                <h3 className="text-2xl font-bold">${card.balance.toLocaleString()}</h3>
                            </div>
                            <CreditCard className={cn("h-6 w-6", card.theme === 'dark' ? "text-gray-500" : "text-gray-400")} />
                        </div>

                        <div className="mb-4">
                            <p className={cn("font-mono text-lg tracking-wider", card.theme === 'dark' ? "text-gray-300" : "text-gray-700")}>
                                {getDisplayNumber(card)}
                            </p>
                        </div>

                        <div className="flex items-center justify-between text-xs">
                            <div>
                                <p className={cn("mb-1", card.theme === 'dark' ? "text-gray-400" : "text-gray-500")}>Card Holder</p>
                                <p className="font-semibold uppercase">{card.holder}</p>
                            </div>
                            <div className="text-right">
                                <p className={cn("mb-1", card.theme === 'dark' ? "text-gray-400" : "text-gray-500")}>Expires</p>
                                <p className="font-semibold">{card.expiry}</p>
                            </div>
                        </div>

                        {/* Decorative overlay */}
                        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/5 blur-3xl"></div>
                    </div>
                ))}
            </div>

            <div className="mt-8 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-bold text-gray-900">Card Settings</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border border-gray-100 p-4 hover:bg-gray-50">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                <Lock className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">Change PIN Code</p>
                                <p className="text-xs text-gray-500">Update your 4-digit security pin</p>
                            </div>
                        </div>
                        <button
                            onClick={handleChangePin}
                            className="text-sm font-medium text-gray-400 hover:text-primary"
                        >
                            Edit
                        </button>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border border-gray-100 p-4 hover:bg-gray-50">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                                <Eye className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">Show Card Details</p>
                                <p className="text-xs text-gray-500">Reveal full card number and CVV</p>
                            </div>
                        </div>
                        <label className="relative inline-flex cursor-pointer items-center">
                            <input
                                type="checkbox"
                                className="peer sr-only"
                                checked={showDetails}
                                onChange={(e) => setShowDetails(e.target.checked)}
                            />
                            <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30"></div>
                        </label>
                    </div>
                </div>
            </div>

            <AddCardModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
        </MainLayout>
    );
};

export default Cards;
