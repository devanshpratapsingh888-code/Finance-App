import React from 'react';
import { X, Calendar, Tag, CreditCard, ArrowUpRight, ArrowDownLeft, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

const TransactionModal = ({ isOpen, onClose, data }) => {
    if (!isOpen || !data) return null;

    const handleDownloadReceipt = () => {
        const receiptContent = `
            RECEIPT
            --------------------------------
            Transaction ID: #${data.id}82937429
            Date: ${data.date}
            Time: 10:42 AM
            
            Description: ${data.name}
            Category: ${data.category}
            Payment Method: Visa •••• 4242
            
            --------------------------------
            AMOUNT: ${data.type === 'income' ? '+' : ''}${data.amount < 0 ? data.amount.toFixed(2).replace('-', '-$') : `$${data.amount.toFixed(2)}`}
            STATUS: ${data.status.toUpperCase()}
            --------------------------------
            
            Thank you for banking with Coinest!
        `;

        const blob = new Blob([receiptContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `receipt_${data.id}_${data.date.replace(/\s/g, '_')}.txt`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            <div className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
                {/* Header */}
                <div className="relative bg-gray-50 px-6 py-6 text-center">
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 rounded-full p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>

                    <div className={cn(
                        "mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full shadow-sm",
                        data.type === 'income' ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                    )}>
                        {data.type === 'income' ? <ArrowDownLeft className="h-8 w-8" /> : <ArrowUpRight className="h-8 w-8" />}
                    </div>

                    <h2 className="text-xl font-bold text-gray-900">{data.name}</h2>
                    <p className={cn("text-2xl font-bold mt-1", data.type === 'income' ? "text-green-600" : "text-gray-900")}>
                        {data.type === 'income' ? '+' : ''}{data.amount < 0 ? data.amount.toFixed(2).replace('-', '-$') : `$${data.amount.toFixed(2)}`}
                    </p>
                </div>

                {/* Details */}
                <div className="px-6 py-6 space-y-5">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                        <span className="text-sm text-gray-500">Status</span>
                        <span className={cn(
                            "flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold",
                            data.status === "Completed" ? "bg-green-50 text-green-700" :
                                data.status === "Pending" ? "bg-yellow-50 text-yellow-700" :
                                    "bg-red-50 text-red-700"
                        )}>
                            {data.status === "Completed" ? <CheckCircle className="h-3 w-3" /> :
                                data.status === "Pending" ? <Clock className="h-3 w-3" /> :
                                    <AlertCircle className="h-3 w-3" />}
                            {data.status}
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-1">
                                <Calendar className="h-3.5 w-3.5" /> Date
                            </p>
                            <p className="text-sm font-medium text-gray-900">{data.date}</p>
                        </div>
                        <div>
                            <p className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-1">
                                <Clock className="h-3.5 w-3.5" /> Time
                            </p>
                            <p className="text-sm font-medium text-gray-900">10:42 AM</p>
                        </div>
                        <div>
                            <p className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-1">
                                <Tag className="h-3.5 w-3.5" /> Category
                            </p>
                            <p className="text-sm font-medium text-gray-900">{data.category}</p>
                        </div>
                        <div>
                            <p className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-1">
                                <CreditCard className="h-3.5 w-3.5" /> Payment
                            </p>
                            <p className="text-sm font-medium text-gray-900">Visa •••• 4242</p>
                        </div>
                    </div>

                    <div className="rounded-lg bg-gray-50 p-3 text-xs text-gray-500 text-center">
                        Transaction ID: #{data.id}82937429
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-6 py-4">
                    <button
                        onClick={handleDownloadReceipt}
                        className="w-full rounded-lg border border-gray-200 bg-white py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm"
                    >
                        Download Receipt
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TransactionModal;
