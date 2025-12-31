import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    // In App.jsx we will mostly switch to manual routing handling or browser router?
    // The current App.jsx uses manual generic routing. We should probably stick to that or upgrade to react-router-dom?
    // The codebase already has react-router-dom installed? Let me check package.json again.
    // Checking package.json...
    // It does NOT have react-router-dom. It has "react" and "react-dom".
    // App.jsx handles routing manually using window.location.pathname.
    // I should stick to that pattern or refactor to react-router-dom. 
    // Refactoring to react-router-dom is cleaner but might be out of scope for "just" login. 
    // However, manual routing is pain for nested routes and protection.
    // I will use manual routing for now to match existing style, but `Link` won't work.
    // I'll genericize the "navigate" function from `Header.jsx` or just use `window.history.pushState` manually.

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        if (login(email, password)) {
            window.history.pushState({}, '', '/');
            window.dispatchEvent(new PopStateEvent('popstate'));
        } else {
            setError('Invalid email or password');
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
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or{' '}
                        <a href="/signup" className="font-medium text-primary hover:text-primary/80" onClick={(e) => {
                            e.preventDefault();
                            window.history.pushState({}, '', '/signup');
                            window.dispatchEvent(new PopStateEvent('popstate'));
                        }}>
                            create a new account
                        </a>
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="-space-y-px rounded-md shadow-sm">
                        <div>
                            <input
                                type="email"
                                required
                                className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-3"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                required
                                className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-3"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-sm text-red-500 text-center">
                            {error}
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            className="group relative flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
                <div className="text-center text-xs text-gray-500">
                    <p>Demo Credentials:</p>
                    <p>Email: demo@example.com</p>
                    <p>Password: password</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
