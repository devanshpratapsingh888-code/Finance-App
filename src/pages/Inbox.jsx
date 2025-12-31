import React from 'react';
import MainLayout from '../layout/MainLayout';
import { useAuth } from '../context/AuthContext';
import { Mail, Star, Trash2 } from 'lucide-react';
import { cn } from '../lib/utils';

const Inbox = () => {
    const { userData } = useAuth();
    if (!userData) return null;
    const { messagesData } = userData;

    return (
        <MainLayout title="Inbox">
            <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-gray-100 p-4">
                    <h2 className="font-bold text-gray-900">Messages</h2>
                    <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                        {messagesData.length} New
                    </span>
                </div>
                <div className="divide-y divide-gray-100">
                    {messagesData.map((msg) => (
                        <div key={msg.id} className={cn("flex cursor-pointer items-center gap-4 p-4 transition-colors hover:bg-gray-50", !msg.read && "bg-blue-50/50")}>
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-200 text-gray-600">
                                {msg.sender.charAt(0)}
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between">
                                    <p className={cn("truncate text-sm font-medium", !msg.read ? "text-gray-900 font-bold" : "text-gray-700")}>
                                        {msg.sender}
                                    </p>
                                    <p className="text-xs text-gray-500">{msg.date}</p>
                                </div>
                                <p className={cn("truncate text-sm font-medium", !msg.read ? "text-black" : "text-gray-800")}>{msg.subject}</p>
                                <p className="truncate text-sm text-gray-500">{msg.preview}</p>
                            </div>
                            <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                                <button className="rounded p-1 hover:bg-gray-200">
                                    <Star className="h-4 w-4 text-gray-400" />
                                </button>
                                <button className="rounded p-1 hover:bg-gray-200">
                                    <Trash2 className="h-4 w-4 text-gray-400" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
};

export default Inbox;
