import React, { useState } from 'react';
import { X, User, Mail, Phone, Camera, Check } from 'lucide-react';
import { currentUser } from '../../data/mockData';

const ProfileModal = ({ isOpen, onClose }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: currentUser.name || 'Andrew Forbist',
        email: 'andrew.forbist@example.com',
        phone: '+1 (555) 123-4567',
        bio: 'Freelance Designer & Developer | Crypto Enthusiast'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                onClose();
            }, 1500);
        }, 1000);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
                {success ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                            <Check className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Profile Updated!</h3>
                        <p className="mt-2 text-gray-500">Your changes have been saved successfully.</p>
                    </div>
                ) : (
                    <>
                        {/* Header Image */}
                        <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>

                        {/* Avatar with absolute positioning */}
                        <div className="absolute top-16 left-1/2 -translate-x-1/2">
                            <div className="relative">
                                <img
                                    src={currentUser.avatar}
                                    alt="Profile"
                                    className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-md"
                                />
                                <button className="absolute bottom-0 right-0 rounded-full bg-gray-900 p-1.5 text-white shadow-sm hover:bg-black">
                                    <Camera className="h-3 w-3" />
                                </button>
                            </div>
                        </div>

                        <div className="mt-12 px-6 pb-6">
                            <div className="text-center">
                                <h2 className="text-xl font-bold text-gray-900">{formData.name}</h2>
                                <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mt-1">
                                    Pro Account
                                </span>
                            </div>

                            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Full Name</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                            <User className="h-4 w-4" />
                                        </span>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="block w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-3 text-sm focus:border-primary focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Email Address</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                            <Mail className="h-4 w-4" />
                                        </span>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="block w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-3 text-sm focus:border-primary focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Bio</label>
                                    <textarea
                                        value={formData.bio}
                                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                        rows="3"
                                        className="block w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:border-primary focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary"
                                    ></textarea>
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="flex-1 rounded-lg border border-gray-200 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="flex-1 rounded-lg bg-primary py-2.5 text-sm font-semibold text-white hover:bg-primary-hover disabled:opacity-70"
                                    >
                                        {isLoading ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        </div>

                        <button onClick={onClose} className="absolute top-4 right-4 rounded-full bg-white/20 p-1 text-white hover:bg-white/40">
                            <X className="h-5 w-5" />
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProfileModal;
