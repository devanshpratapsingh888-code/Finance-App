import { LayoutDashboard, Receipt, Wallet, CreditCard, PiggyBank, TrendingUp, Mail, Tag, BarChart3, Search, Bell, Settings } from 'lucide-react';

export const currentUser = {
    name: "Andrew Forbist",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    balance: 562000.00,
    cardNumber: "**** **** **** 2598",
    expiry: "09/25",
    cvv: "562"
};

export const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: Receipt, label: "Transactions", path: "/transactions" },
    { icon: Wallet, label: "Invoices", path: "/invoices" },
    { icon: CreditCard, label: "Cards", path: "/cards" },
    { icon: PiggyBank, label: "Saving Plans", path: "/savings" },
    { icon: TrendingUp, label: "Investments", path: "/investments" },
    { icon: Mail, label: "Inbox", path: "/inbox" },
    { icon: Tag, label: "Promos", path: "/promos" },
    { icon: BarChart3, label: "Insights", path: "/insights" },
];

export const quickActions = [
    { label: "Top Up", icon: "plus" },
    { label: "Transfer", icon: "arrow-right" },
    { label: "Request", icon: "arrow-down" },
    { label: "History", icon: "history" },
];

export const recentTransactions = [
    { id: 1, name: "Netflix Subscription", date: "24 Dec 2024", amount: -12.99, status: "Completed", type: "expense", category: "Entertainment", icon: "film" },
    { id: 2, name: "Salary Dec", date: "23 Dec 2024", amount: 4500.00, status: "Completed", type: "income", category: "Salary", icon: "briefcase" },
    { id: 3, name: "Grocery Store", date: "22 Dec 2024", amount: -156.40, status: "Completed", type: "expense", category: "Food", icon: "shopping-cart" },
    { id: 4, name: "Electric Bill", date: "20 Dec 2024", amount: -85.00, status: "Pending", type: "expense", category: "Utilities", icon: "zap" },
    { id: 5, name: "Starbucks", date: "19 Dec 2024", amount: -5.50, status: "Completed", type: "expense", category: "Food", icon: "coffee" },
];

export const savingPlans = [
    { name: "Emergency Fund", target: 10000, current: 7500, color: "bg-primary" },
    { name: "New Car", target: 25000, current: 5000, color: "bg-blue-500" },
    { name: "Vacation", target: 3000, current: 2800, color: "bg-yellow-500" },
];

export const expensesByCategory = [
    { name: 'Rent', value: 30 },
    { name: 'Food', value: 20 },
    { name: 'Utilities', value: 15 },
    { name: 'Entertainment', value: 10 },
    { name: 'Investments', value: 25 },
];

// Mock monthly data
export const cashflowData = [
    { name: 'Jan', Income: 4000, Expense: 2400 },
    { name: 'Feb', Income: 3000, Expense: 1398 },
    { name: 'Mar', Income: 2000, Expense: 9800 },
    { name: 'Apr', Income: 2780, Expense: 3908 },
    { name: 'May', Income: 1890, Expense: 4800 },
    { name: 'Jun', Income: 2390, Expense: 3800 },
    { name: 'Jul', Income: 3490, Expense: 4300 },
];

export const invoicesData = [
    { id: 'INV-001', client: 'Apple Inc.', date: '20 Dec 2024', amount: 1200.00, status: 'Paid', dueDate: '25 Dec 2024' },
    { id: 'INV-002', client: 'Google LLC', date: '21 Dec 2024', amount: 3500.50, status: 'Pending', dueDate: '30 Dec 2024' },
    { id: 'INV-003', client: 'Sarah Connor', date: '22 Dec 2024', amount: 450.00, status: 'Overdue', dueDate: '15 Dec 2024' },
    { id: 'INV-004', client: 'Tech Solutions', date: '23 Dec 2024', amount: 980.00, status: 'Paid', dueDate: '23 Dec 2024' },
];

export const cardsData = [
    { id: 1, type: 'Visa', number: '**** **** **** 2598', holder: 'Andrew Forbist', expiry: '09/25', balance: 12500.00, theme: 'dark', limit: 20000 },
    { id: 2, type: 'Mastercard', number: '**** **** **** 4432', holder: 'Andrew Forbist', expiry: '12/26', balance: 340.50, theme: 'light', limit: 5000 },
];

export const investmentsData = [
    { id: 1, name: 'S&P 500 ETF', symbol: 'VOO', quantity: 15, currentPrice: 412.30, change: 1.25, type: 'ETF' },
    { id: 2, name: 'Apple Inc.', symbol: 'AAPL', quantity: 45, currentPrice: 175.50, change: -0.45, type: 'Stock' },
    { id: 3, name: 'Bitcoin', symbol: 'BTC', quantity: 0.25, currentPrice: 42500.00, change: 3.50, type: 'Crypto' },
    { id: 4, name: 'Tesla', symbol: 'TSLA', quantity: 10, currentPrice: 240.20, change: 2.10, type: 'Stock' },
];

export const messagesData = [
    { id: 1, sender: 'Support Team', subject: 'Welcome to Pro Plan', preview: 'Thanks for upgrading to our Pro plan. Here is what...', date: '10:30 AM', read: false },
    { id: 2, sender: 'Bank Notification', subject: 'Large Transaction Alert', preview: 'We noticed a transaction of $1200.00 on your...', date: 'Yesterday', read: true },
    { id: 3, sender: 'Alice Smith', subject: 'Re: Project Invoice', preview: 'Hi Andrew, I just paid the invoice #001. Thanks!', date: '20 Dec', read: true },
];

export const promosData = [
    { id: 1, title: 'Summer Cashback', description: 'Get 5% cashback on all travel bookings this summer.', color: 'bg-orange-100', text: 'text-orange-700' },
    { id: 2, title: 'Refer a Friend', description: 'Earn $50 for every friend who joins Coinest.', color: 'bg-blue-100', text: 'text-blue-700' },
    { id: 3, title: 'Crypto Starter', description: 'Zero fees on your first 3 crypto trades.', color: 'bg-purple-100', text: 'text-purple-700' },
];

export const insightsData = [
    { name: 'Week 1', Spending: 450 },
    { name: 'Week 2', Spending: 670 },
    { name: 'Week 3', Spending: 340 },
    { name: 'Week 4', Spending: 890 },
];
