import {
    currentUser as defaultUser,
    recentTransactions,
    savingPlans,
    expensesByCategory,
    cashflowData,
    invoicesData,
    cardsData,
    investmentsData,
    messagesData,
    promosData,
    insightsData
} from '../data/mockData';

const STORAGE_KEY = 'finance_app_users';
const CURRENT_USER_KEY = 'finance_app_current_user_id';

// Helper to get all users
const getUsers = () => {
    const users = localStorage.getItem(STORAGE_KEY);
    return users ? JSON.parse(users) : {};
};

// Helper to save all users
const saveUsers = (users) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

export const initializeUser = (userId, name, email, password) => {
    const users = getUsers();

    if (users[userId]) {
        throw new Error('User already exists');
    }

    // specific default data for new users (empty/fresh state)
    const newUser = {
        id: userId,
        name,
        email,
        password, // In a real app, this should be hashed!
        data: {
            currentUser: { ...defaultUser, name, balance: 1000.00 }, // Starter balance
            recentTransactions: [
                ...recentTransactions,
                { id: 6, name: "Amazon Purchase", date: "18 Dec 2024", amount: -120.50, status: "Completed", type: "expense", category: "Shopping", icon: "shopping-cart" },
                { id: 7, name: "Freelance Project", date: "15 Dec 2024", amount: 1200.00, status: "Completed", type: "income", category: "Freelance", icon: "briefcase" },
                { id: 8, name: "Gym Membership", date: "12 Dec 2024", amount: -45.00, status: "Completed", type: "expense", category: "Health", icon: "zap" },
                { id: 9, name: "Mobile Bill", date: "10 Dec 2024", amount: -60.00, status: "Completed", type: "expense", category: "Utilities", icon: "zap" },
                { id: 10, name: "Dividend Payout", date: "05 Dec 2024", amount: 150.25, status: "Completed", type: "income", category: "Investment", icon: "trending-up" },
                { id: 11, name: "Uber Ride", date: "04 Dec 2024", amount: -18.40, status: "Cancelled", type: "expense", category: "Transport", icon: "car" },
            ],
            savingPlans: savingPlans,
            expensesByCategory: expensesByCategory,
            cashflowData: cashflowData,
            invoicesData: invoicesData,
            cardsData: cardsData,
            investmentsData: investmentsData,
            messagesData: [{
                id: 1,
                sender: 'System',
                subject: 'Welcome!',
                preview: 'Welcome to your new dashboard.',
                date: 'Now',
                read: false
            }],
            promosData: promosData, // Generic promos can stay
            insightsData: []
        }
    };

    users[userId] = newUser;
    saveUsers(users);
    return newUser;
};

// Initialize the "demo" user if not exists, using the full mock data
export const initializeDemoUser = () => {
    const users = getUsers();
    const demoId = 'demo_user';

    if (!users[demoId]) {
        users[demoId] = {
            id: demoId,
            name: 'Andrew Forbist',
            email: 'demo@example.com',
            password: 'password',
            data: {
                currentUser: defaultUser,
                recentTransactions,
                savingPlans,
                expensesByCategory,
                cashflowData,
                invoicesData,
                cardsData,
                investmentsData,
                messagesData,
                promosData,
                insightsData
            }
        };
        saveUsers(users);
    }
};

export const authenticateUser = (email, password) => {
    const users = getUsers();
    const user = Object.values(users).find(u => u.email === email && u.password === password);
    return user ? user : null;
};

export const getUserData = (userId) => {
    const users = getUsers();
    return users[userId] ? users[userId].data : null;
};

export const getLoggedInUserId = () => {
    return localStorage.getItem(CURRENT_USER_KEY);
};

export const setLoggedInUserId = (userId) => {
    if (userId) {
        localStorage.setItem(CURRENT_USER_KEY, userId);
    } else {
        localStorage.removeItem(CURRENT_USER_KEY);
    }
};
