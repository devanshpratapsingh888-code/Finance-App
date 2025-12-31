import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '../../lib/utils';
import SavingsModal from './SavingsModal';

const SavingPlans = ({ plans = [] }) => {
    const [modalState, setModalState] = useState({
        isOpen: false,
        type: null,
        data: null
    });

    const openModal = (type, data = null) => {
        setModalState({ isOpen: true, type, data });
    };

    const closeModal = () => {
        setModalState({ ...modalState, isOpen: false });
    };

    return (
        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
            <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">Saving Plans</h3>
                <button
                    onClick={() => openModal('create')}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 text-gray-600 transition-colors hover:bg-primary hover:text-white"
                >
                    <Plus className="h-4 w-4" />
                </button>
            </div>

            <div className="space-y-5">
                {plans.map((plan) => {
                    const percentage = Math.round((plan.current / plan.target) * 100);
                    return (
                        <div
                            key={plan.name}
                            onClick={() => openModal('details', plan)}
                            className="group cursor-pointer rounded-lg p-2 transition-colors hover:bg-gray-50 -mx-2"
                        >
                            <div className="mb-2 flex items-center justify-between text-sm">
                                <div className="flex items-center">
                                    <span className="font-semibold text-gray-700">{plan.name}</span>
                                </div>
                                <span className="font-bold text-gray-900">${plan.current.toLocaleString()}</span>
                            </div>
                            <div className="h-2.5 w-full rounded-full bg-gray-100">
                                <div
                                    className={cn("h-full rounded-full transition-all duration-1000", plan.color)}
                                    style={{ width: `${percentage}%` }}
                                ></div>
                            </div>
                            <div className="mt-1 text-right">
                                <span className="text-xs text-gray-400 group-hover:text-primary transition-colors">Target: ${plan.target.toLocaleString()}</span>
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
        </div>
    );
};

export default SavingPlans;
