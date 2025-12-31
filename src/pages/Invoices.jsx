import React from 'react';
import MainLayout from '../layout/MainLayout';
import { invoicesData } from '../data/mockData';
import { Download, FileText, Filter } from 'lucide-react';
import { cn } from '../lib/utils';

const Invoices = () => {
    const handleDownloadInvoice = (invoice) => {
        const content = `
            INVOICE #${invoice.id}
            --------------------------------
            Client: ${invoice.client}
            Date: ${invoice.date}
            Due Date: ${invoice.dueDate}
            
            Status: ${invoice.status.toUpperCase()}
            --------------------------------
            TOTAL AMOUNT: $${invoice.amount.toFixed(2)}
            --------------------------------
            
            Thank you for your business.
        `;
        downloadFile(content, `invoice_${invoice.id}.txt`);
    };

    const handleDownloadReport = () => {
        const header = "Invoice ID,Client,Date,Due Date,Amount,Status\n";
        const rows = invoicesData.map(inv =>
            `${inv.id},"${inv.client}",${inv.date},${inv.dueDate},${inv.amount.toFixed(2)},${inv.status}`
        ).join("\n");

        const content = header + rows;
        downloadFile(content, `invoice_report_${new Date().toISOString().split('T')[0]}.csv`, 'text/csv');
    };

    const downloadFile = (content, filename, type = 'text/plain') => {
        const blob = new Blob([content], { type });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };

    return (
        <MainLayout title="Invoices">
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-lg font-bold text-gray-900">Invoice History</h2>
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">
                            <Filter className="h-4 w-4" />
                            <span>Filter</span>
                        </button>
                        <button
                            onClick={handleDownloadReport}
                            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover"
                        >
                            <Download className="h-4 w-4" />
                            <span>Download Report</span>
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-500">
                        <thead className="bg-gray-50 text-xs text-gray-700 uppercase">
                            <tr>
                                <th className="px-6 py-3">Invoice ID</th>
                                <th className="px-6 py-3">Client</th>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Due Date</th>
                                <th className="px-6 py-3">Amount</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoicesData.map((invoice) => (
                                <tr key={invoice.id} className="border-b bg-white hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">{invoice.id}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="mr-3 h-8 w-8 rounded-full bg-gray-100 p-1">
                                                <FileText className="h-full w-full text-gray-500" />
                                            </div>
                                            {invoice.client}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{invoice.date}</td>
                                    <td className="px-6 py-4">{invoice.dueDate}</td>
                                    <td className="px-6 py-4 font-semibold text-gray-900">${invoice.amount.toFixed(2)}</td>
                                    <td className="px-6 py-4">
                                        <span className={cn(
                                            "px-2.5 py-0.5 rounded-full text-xs font-semibold",
                                            invoice.status === "Paid" ? "bg-green-100 text-green-800" :
                                                invoice.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                                                    "bg-red-100 text-red-800"
                                        )}>
                                            {invoice.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => handleDownloadInvoice(invoice)}
                                            className="font-medium text-primary hover:underline"
                                        >
                                            Download
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </MainLayout>
    );
};

export default Invoices;
