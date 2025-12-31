import React, { useState } from 'react';
import { X, Target, Plus } from 'lucide-react';
import { cn } from '../../lib/utils';

const SavingsModal = ({ isOpen, onClose, type, data }) => {


    const [formData, setFormData] = useState({
        name: '',
        target: '',
        current: 0,
        color: 'bg-primary'
    });

    const [addAmount, setAddAmount] = useState('');
    const [success, setSuccess] = useState(false);

    // Initialize form data if in edit/add mode
    React.useEffect(() => {
        if (data) {
            setFormData(data);
        }
    }, [data]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
            onClose();
            // Here you would typically call onSave to update the parent state
        }, 1500);
    };

    if (!isOpen) return null;

    const colors = [
        { name: 'Green', value: 'bg-primary' },
        { name: 'Blue', value: 'bg-blue-500' },
        { name: 'Yellow', value: 'bg-yellow-500' },
        { name: 'Purple', value: 'bg-purple-500' },
        { name: 'Red', value: 'bg-red-500' },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 shadow-2xl transition-all">
                {success ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Success!</h3>
                        <p className="mt-2 text-gray-500">
                            {type === 'create' ? 'New saving goal created.' :
                                type === 'add' ? 'Funds added successfully.' : 'Changes saved.'}
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-gray-900">
                                {type === 'create' && 'Create New Goal'}
                                {type === 'details' && 'Goal Details'}
                                {type === 'add' && 'Add Funds'}
                            </h3>
                            <button onClick={onClose} className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {type === 'create' && (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700">Goal Name</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Dream House"
                                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700">Target Amount</label>
                                    <div className="relative mt-1">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                        <input
                                            type="number"
                                            required
                                            placeholder="10000"
                                            className="block w-full rounded-lg border border-gray-300 px-3 py-2 pl-7 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-2">Color Tag</label>
                                    <div className="flex gap-2">
                                        {colors.map(c => (
                                            <button
                                                key={c.value}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, color: c.value })}
                                                className={cn(
                                                    "h-8 w-8 rounded-full transition-transform hover:scale-110",
                                                    c.value,
                                                    formData.color === c.value && "ring-2 ring-offset-2 ring-gray-400"
                                                )}
                                                title={c.name}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <button type="submit" className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-white hover:bg-primary-hover">
                                    Create Goal
                                </button>
                            </form>
                        )}

                        {type === 'add' && (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="rounded-lg bg-gray-50 p-4 mb-4">
                                    <p className="text-sm text-gray-500">Current Progress</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-bold text-gray-900">{data?.name}</span>
                                        <span className="text-sm font-medium text-primary">${data?.current.toLocaleString()} / ${data?.target.toLocaleString()}</span>
                                    </div>
                                    <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                                        <div
                                            className={cn("h-full rounded-full", data?.color)}
                                            style={{ width: `${Math.min((data?.current / data?.target) * 100, 100)}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-700">Amount to Add</label>
                                    <div className="relative mt-1">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                        <input
                                            type="number"
                                            required
                                            value={addAmount}
                                            onChange={(e) => setAddAmount(e.target.value)}
                                            placeholder="0.00"
                                            className="block w-full rounded-lg border border-gray-300 px-3 py-2 pl-7 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                        />
                                    </div>
                                </div>
                                <button type="submit" className="w-full rounded-lg bg-green-600 py-2.5 text-sm font-semibold text-white hover:bg-green-700">
                                    Confirm Deposit
                                </button>
                            </form>
                        )}

                        {type === 'details' && (
                            <div className="space-y-6">
                                <div className="text-center">
                                    <div className={cn("inline-flex h-16 w-16 items-center justify-center rounded-full bg-opacity-10", data?.color.replace('bg-', 'text-').replace('500', '600'))}>
                                        <Target className="h-8 w-8" />
                                    </div>
                                    <h2 className="mt-3 text-2xl font-bold text-gray-900">{data?.name}</h2>
                                    <p className="text-gray-500">Target: ${data?.target.toLocaleString()}</p>
                                </div>

                                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-gray-600">Progress</span>
                                        <span className="font-bold text-gray-900">{Math.round((data?.current / data?.target) * 100)}%</span>
                                    </div>
                                    <div className="h-3 w-full rounded-full bg-gray-200">
                                        <div
                                            className={cn("h-full rounded-full transition-all", data?.color)}
                                            style={{ width: `${(data?.current / data?.target) * 100}%` }}
                                        ></div>
                                    </div>
                                    <div className="mt-2 flex justify-between text-xs text-gray-500">
                                        <span>${data?.current.toLocaleString()} saved</span>
                                        <span>${(data?.target - data?.current).toLocaleString()} remaining</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="rounded-lg border border-gray-100 p-3 text-center">
                                        <p className="text-xs text-gray-500">Last Contribution</p>
                                        <p className="font-bold text-gray-900">Dec 24, 2024</p>
                                    </div>
                                    <div className="rounded-lg border border-gray-100 p-3 text-center">
                                        <p className="text-xs text-gray-500">Monthly Average</p>
                                        <p className="font-bold text-gray-900">$450.00</p>
                                    </div>
                                </div>

                                <button onClick={onClose} className="w-full rounded-lg border border-gray-200 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50">
                                    Close
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default SavingsModal;
