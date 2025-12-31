import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { register } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        if (register(name, email, password)) {
            window.history.pushState({}, '', '/');
            window.dispatchEvent(new PopStateEvent('popstate'));
        } else {
            setError('Failed to create an account');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <div className="flex justify-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                            <span className="text-xl font-bold">C</span>
                        </div>
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Join the future of finance
                    </p>
                </div>
                <div className="rounded-md bg-yellow-50 p-4 text-center">
                    <h3 className="text-sm font-medium text-yellow-800">Registration Disabled</h3>
                    <div className="mt-2 text-sm text-yellow-700">
                        <p>New account registration is currently disabled for this demo.</p>
                        <p className="mt-2">Please use one of the test accounts provided on the login page.</p>
                    </div>
                    <div className="mt-4">
                        <a
                            href="/login"
                            className="font-medium text-primary hover:text-primary/80"
                            onClick={(e) => {
                                e.preventDefault();
                                window.history.pushState({}, '', '/login');
                                window.dispatchEvent(new PopStateEvent('popstate'));
                            }}
                        >
                            &larr; Back to Login
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
