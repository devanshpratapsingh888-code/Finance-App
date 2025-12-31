import React from 'react'; // Sidebar component
import { navItems } from '../data/mockData';
import { cn } from '../lib/utils';


const Sidebar = ({ activePath = "/" }) => {
    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-gray-100 bg-white px-4 py-6 transition-transform sm:translate-x-0">
            <div className="mb-8 flex items-center px-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
                    <span className="font-bold">C</span>
                </div>
                <span className="ml-2 text-xl font-bold tracking-tight text-gray-900">COINEST</span>
            </div>

            <nav className="space-y-1">
                {navItems.map((item) => {
                    const isActive = activePath === item.path;
                    return (
                        <a
                            key={item.label}
                            href={item.path}
                            className={cn(
                                "flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-gray-50",
                                isActive ? "bg-primary/10 text-primary hover:bg-primary/20" : "text-gray-600 hover:text-gray-900"
                            )}
                        >
                            <item.icon className={cn("mr-3 h-5 w-5", isActive ? "text-primary" : "text-gray-400")} />
                            {item.label}
                            {item.badge && (
                                <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                                    {item.badge}
                                </span>
                            )}
                        </a>
                    );
                })}
            </nav>


        </aside>
    );
};

export default Sidebar;
