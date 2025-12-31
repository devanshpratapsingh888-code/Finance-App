import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Mail, Settings, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { messagesData } from '../data/mockData'; // We can keep messagesData static or move to context later
import ProfileModal from '../components/dashboard/ProfileModal';
import SettingsModal from '../components/dashboard/SettingsModal';

const Header = ({ title = "Dashboard" }) => {
    const { currentUser, logout } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const [showProfileModal, setShowProfileModal] = useState(false);
    const [showSettingsModal, setShowSettingsModal] = useState(false);

    const notifRef = useRef(null);
    const profileRef = useRef(null);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notifRef.current && !notifRef.current.contains(event.target)) {
                setShowNotifications(false);
            }
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowProfileMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const navigateTo = (path) => {
        window.history.pushState({}, '', path);
        window.dispatchEvent(new PopStateEvent('popstate'));
        setShowProfileMenu(false);
        setShowNotifications(false);
    };

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            console.log("Searching for:", searchQuery);
            // Implement search logic here if needed
        }
    };

    const handleSignOut = () => {
        setShowProfileMenu(false);
        if (confirm("Are you sure you want to sign out?")) {
            logout();
            // App.jsx will handle redirection
        }
    };

    return (
        <>
            <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-gray-100 bg-white/80 px-4 py-4 backdrop-blur-md sm:px-6">
                <div className="flex items-center">
                    <h1 className="text-xl font-bold text-gray-900">{title}</h1>
                </div>

                <div className="flex items-center space-x-4">
                    {/* Search Bar */}
                    <div className="relative hidden md:block">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleSearch}
                            placeholder="Search..."
                            className="block w-64 rounded-full bg-gray-50 py-2 pl-10 pr-3 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>

                    {/* Inbox */}
                    <button
                        onClick={() => navigateTo('/inbox')}
                        className="relative rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
                    >
                        <Mail className="h-5 w-5" />
                        {/* Mock unread indicator */}
                        <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-blue-500 ring-2 ring-white"></span>
                    </button>

                    {/* Notifications Dropdown */}
                    <div className="relative" ref={notifRef}>
                        <button
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="relative rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
                        >
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                        </button>

                        {showNotifications && (
                            <div className="absolute right-0 mt-2 w-80 origin-top-right rounded-xl bg-white py-2 shadow-lg ring-1 ring-black/5 focus:outline-none">
                                <div className="px-4 py-2 border-b border-gray-100">
                                    <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                                </div>
                                <div className="max-h-64 overflow-y-auto">
                                    {messagesData.slice(0, 3).map((item) => (
                                        <div key={item.id} className="flex gap-3 px-4 py-3 hover:bg-gray-50">
                                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                                                <Bell className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{item.subject}</p>
                                                <p className="text-xs text-gray-500 line-clamp-1">{item.preview}</p>
                                                <p className="mt-1 text-xs text-gray-400">{item.date}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="border-t border-gray-100 px-4 py-2">
                                    <button onClick={() => navigateTo('/inbox')} className="text-xs font-semibold text-primary hover:underline">View all notifications</button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Profile Dropdown */}
                    <div className="relative ml-2" ref={profileRef}>
                        <button
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                            className="flex items-center space-x-3 rounded-full border border-transparent p-1 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                        >
                            <div className="hidden text-right md:block">
                                <p className="text-sm font-semibold text-gray-900">{currentUser.name}</p>
                                <p className="text-xs text-gray-500">Free Account</p>
                            </div>
                            <img
                                className="h-9 w-9 rounded-full object-cover ring-2 ring-white"
                                src={currentUser.avatar}
                                alt={currentUser.name}
                            />
                        </button>

                        {showProfileMenu && (
                            <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
                                <div className="border-b border-gray-100 px-4 py-3 md:hidden">
                                    <p className="text-sm font-semibold text-gray-900">{currentUser.name}</p>
                                    <p className="text-xs text-gray-500">Free Account</p>
                                </div>

                                <button
                                    onClick={() => {
                                        setShowProfileMenu(false);
                                        setShowProfileModal(true);
                                    }}
                                    className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                >
                                    <User className="mr-3 h-4 w-4 text-gray-400" />
                                    Your Profile
                                </button>
                                <button
                                    onClick={() => {
                                        setShowProfileMenu(false);
                                        setShowSettingsModal(true);
                                    }}
                                    className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                >
                                    <Settings className="mr-3 h-4 w-4 text-gray-400" />
                                    Settings
                                </button>
                                <div className="my-1 border-t border-gray-100"></div>
                                <button
                                    onClick={handleSignOut}
                                    className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                >
                                    <LogOut className="mr-3 h-4 w-4 text-red-500" />
                                    Sign out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <ProfileModal isOpen={showProfileModal} onClose={() => setShowProfileModal(false)} />
            <SettingsModal isOpen={showSettingsModal} onClose={() => setShowSettingsModal(false)} />
        </>
    );
};

export default Header;
