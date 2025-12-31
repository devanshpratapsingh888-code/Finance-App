import React, { useState } from 'react';
import { X, CreditCard, User, Send, Download } from 'lucide-react';
import { cn } from '../../lib/utils';


const QuickActionModal = ({ isOpen, onClose, type }) => {
    const [amount, setAmount] = useState('');
    const [success, setSuccess] = useState(false);

    if (!isOpen) return null;

    // Configuration based on action type
    const config = {
        'Top Up': {
            title: 'Top Up Balance',
            icon: CreditCard,
            description: 'Add money to your Coinest wallet instantly.',
            actionLabel: 'Top Up Now',
            color: 'bg-primary'
        },
        'Transfer': {
            title: 'Transfer Money',
            icon: Send,
            description: 'Send money to friends or other accounts.',
            actionLabel: 'Send Money',
            color: 'bg-blue-600'
        },
        'Request': {
            title: 'Request Money',
            icon: Download,
            description: 'Request payment from other users.',
            actionLabel: 'Send Request',
            color: 'bg-purple-600'
        }
    };

    const { title, icon: Icon, description, actionLabel, color } = config[type] || config['Top Up'];

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                setAmount('');
                onClose();
            }, 2000);
        }, 1000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-md scale-100 transform overflow-hidden rounded-2xl bg-white p-6 shadow-2xl transition-all">
                {success ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Success!</h3>
                        <p className="mt-2 text-gray-500">Your transaction has been processed successfully.</p>
                    </div>
                ) : (
                    <>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className={cn("flex h-10 w-10 items-center justify-center rounded-full text-white", color)}>
                                    <Icon className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                                </div>
                            </div>
                            <button onClick={onClose} className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <p className="mt-2 text-sm text-gray-500">{description}</p>

                        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                            {/* Amount Input */}
                            <div>
                                <label className="block text-xs font-medium text-gray-700">Amount</label>
                                <div className="relative mt-1">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                    <input
                                        type="number"
                                        required
                                        min="1"
                                        placeholder="0.00"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="block w-full rounded-lg border border-gray-300 px-3 py-2 pl-7 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                    />
                                </div>
                            </div>

                            {/* Conditional Fields based on Type */}
                            {type === 'Transfer' && (
                                <div>
                                    <label className="block text-xs font-medium text-gray-700">Recipient Email or ID</label>
                                    <input
                                        type="text"
                                        placeholder="user@example.com"
                                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                    />
                                </div>
                            )}

                            {type === 'Request' && (
                                <div>
                                    <label className="block text-xs font-medium text-gray-700">Note (Optional)</label>
                                    <input
                                        type="text"
                                        placeholder="Lunch split..."
                                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                    />
                                </div>
                            )}

                            {/* Payment Source Info */}
                            <div className="bg-gray-50 p-3 rounded-lg flex items-center justify-between text-xs text-gray-500">
                                <span>Paying from</span>
                                <span className="font-medium text-gray-900">Main Account (**** 2598)</span>
                            </div>

                            <button
                                type="submit"
                                className={cn(
                                    "w-full rounded-lg py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90",
                                    color
                                )}
                            >
                                {actionLabel}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default QuickActionModal;
