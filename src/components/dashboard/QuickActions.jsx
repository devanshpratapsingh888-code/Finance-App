import React, { useState } from 'react';
import { quickActions } from '../../data/mockData';
import { Plus, ArrowRight, ArrowDown, History } from 'lucide-react';
import QuickActionModal from './QuickActionModal';

const iconMap = {
    'plus': Plus,
    'arrow-right': ArrowRight,
    'arrow-down': ArrowDown,
    'history': History
};

const QuickActions = () => {
    const [modalType, setModalType] = useState(null);

    const handleClick = (label) => {
        if (label === 'History') {
            // Manual navigation for History
            window.history.pushState({}, '', '/transactions');
            // Dispatch popstate event so App.jsx catches it
            const navEvent = new PopStateEvent('popstate');
            window.dispatchEvent(navEvent);
        } else {
            setModalType(label);
        }
    };

    return (
        <>
            <div className="flex justify-between rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                {quickActions.map((action) => {
                    const Icon = iconMap[action.icon];
                    return (
                        <button
                            key={action.label}
                            className="group flex flex-col items-center"
                            onClick={() => handleClick(action.label)}
                        >
                            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 text-gray-600 transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-primary group-hover:shadow-lg group-hover:text-white">
                                <Icon className="h-5 w-5" />
                            </div>
                            <span className="text-xs font-medium text-gray-600 group-hover:text-gray-900">{action.label}</span>
                        </button>
                    );
                })}
            </div>

            <QuickActionModal
                isOpen={!!modalType}
                type={modalType}
                onClose={() => setModalType(null)}
            />
        </>
    );
};

export default QuickActions;
