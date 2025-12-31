import React, { useState } from 'react';
import MainLayout from '../layout/MainLayout';
import { savingPlans } from '../data/mockData';
import { Plus, Target, TrendingUp } from 'lucide-react';
import { cn } from '../lib/utils';
import SavingsModal from '../components/dashboard/SavingsModal';

const Savings = () => {
    const [modalState, setModalState] = useState({
        isOpen: false,
        type: null, // 'create', 'details', 'add'
        data: null
    });

    const openModal = (type, data = null) => {
        setModalState({ isOpen: true, type, data });
    };

    const closeModal = () => {
        setModalState({ ...modalState, isOpen: false });
    };

    return (
        <MainLayout title="Saving Plans">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* New Goal Card */}
                <button
                    onClick={() => openModal('create')}
                    className="flex h-64 flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 transition-colors hover:border-primary hover:bg-primary/5"
                >
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
                        <Plus className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Create New Goal</h3>
                    <p className="mt-1 text-sm text-gray-500">Save for something simplified</p>
                </button>

                {savingPlans.map((plan) => {
                    const percentage = Math.round((plan.current / plan.target) * 100);
                    return (
                        <div key={plan.name} className="flex h-64 flex-col justify-between rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                            <div>
                                <div className="mb-4 flex items-center justify-between">
                                    <div className={cn("p-2 rounded-lg bg-opacity-20 text-gray-700", plan.color.replace('bg-', 'bg-opacity-20 text-').replace('500', '700'))}>
                                        <Target className="h-6 w-6" />
                                    </div>
                                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">{percentage}%</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
                                <p className="text-sm text-gray-500">Target: ${plan.target.toLocaleString()}</p>
                            </div>

                            <div>
                                <div className="mb-2 flex items-end justify-between">
                                    <span className="text-2xl font-bold text-gray-900">${plan.current.toLocaleString()}</span>
                                    <span className="mb-1 text-sm text-gray-500">Saved</span>
                                </div>
                                <div className="h-3 w-full rounded-full bg-gray-100">
                                    <div
                                        className={cn("h-full rounded-full transition-all duration-1000", plan.color)}
                                        style={{ width: `${percentage}%` }}
                                    ></div>
                                </div>
                                <div className="mt-4 flex gap-2">
                                    <button
                                        onClick={() => openModal('details', plan)}
                                        className="flex-1 rounded-lg border border-gray-200 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
                                    >
                                        View Details
                                    </button>
                                    <button
                                        onClick={() => openModal('add', plan)}
                                        className="flex-1 rounded-lg bg-primary py-2 text-sm font-medium text-white hover:bg-primary-hover"
                                    >
                                        Add Funds
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <SavingsModal
                isOpen={modalState.isOpen}
                type={modalState.type}
                data={modalState.data}
                onClose={closeModal}
            />
        </MainLayout>
    );
};

export default Savings;
