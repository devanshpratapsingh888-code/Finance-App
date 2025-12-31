import React, { useState } from 'react';
import { X, Moon, Bell, Shield, Smartphone, Globe, ChevronRight } from 'lucide-react';

import { cn } from '../../lib/utils';

// Custom toggle component since we don't have headlessui installed and I shouldn't install deps
const Toggle = ({ enabled, onChange }) => (
    <button
        type="button"
        className={cn(
            "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-opacity-75",
            enabled ? "bg-primary" : "bg-gray-200"
        )}
        onClick={() => onChange(!enabled)}
    >
        <span className="sr-only">Use setting</span>
        <span
            aria-hidden="true"
            className={cn(
                "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                enabled ? "translate-x-5" : "translate-x-0"
            )}
        />
    </button>
);

const SettingsModal = ({ isOpen, onClose }) => {

    const [settings, setSettings] = useState({
        darkMode: false,
        emailNotif: true,
        pushNotif: true,
        twoFactor: false
    });

    const toggle = (key) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const sections = [
        {
            title: "Appearance",
            items: [
                { icon: Moon, label: "Dark Mode", type: "toggle", key: "darkMode", desc: "Reduce eye strain at night" }
            ]
        },
        {
            title: "Notifications",
            items: [
                { icon: Bell, label: "Push Notifications", type: "toggle", key: "pushNotif", desc: "Receive alerts on your device" },
                { icon: Globe, label: "Email Digest", type: "toggle", key: "emailNotif", desc: "Weekly summary of your activity" }
            ]
        },
        {
            title: "Security",
            items: [
                { icon: Shield, label: "Two-Factor Auth", type: "toggle", key: "twoFactor", desc: "Add an extra layer of security" },
                { icon: Smartphone, label: "Manage Devices", type: "link", desc: "See connected devices" }
            ]
        }
    ];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
                <div className="border-b border-gray-100 px-6 py-4 flex items-center justify-between bg-white">
                    <h2 className="text-lg font-bold text-gray-900">Settings</h2>
                    <button onClick={onClose} className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="max-h-[70vh] overflow-y-auto px-6 py-2">
                    {sections.map((section, idx) => (
                        <div key={idx} className="py-4">
                            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">{section.title}</h3>
                            <div className="space-y-4">
                                {section.items.map((item, itemIdx) => (
                                    <div key={itemIdx} className="flex items-center justify-between">
                                        <div className="flex items-start gap-3">
                                            <div className="mt-0.5 rounded-lg bg-gray-50 p-2 text-gray-600">
                                                <item.icon className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{item.label}</p>
                                                <p className="text-xs text-gray-500">{item.desc}</p>
                                            </div>
                                        </div>

                                        {item.type === 'toggle' ? (
                                            <Toggle enabled={settings[item.key]} onChange={() => toggle(item.key)} />
                                        ) : (
                                            <button className="rounded-full p-1 text-gray-400 hover:bg-gray-50">
                                                <ChevronRight className="h-5 w-5" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            {idx < sections.length - 1 && <div className="mt-6 border-b border-gray-100"></div>}
                        </div>
                    ))}
                </div>

                <div className="border-t border-gray-100 bg-gray-50 px-6 py-4 flex justify-end">
                    <button onClick={onClose} className="rounded-lg bg-primary px-6 py-2 text-sm font-semibold text-white hover:bg-primary-hover">
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;
