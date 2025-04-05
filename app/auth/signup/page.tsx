"use client"

import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const SignupPage = () => {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username, email, password
            }),
        });

        if (!res.ok) {
            const data = await res.json()
            setError(data.error);
            return
        }

        return router.push("/auth/login");
    }

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
            <form onSubmit={handleSignup} className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">Signup</h1>
                <div className="mb-4">
                    <input
                        type="text"
                        value={username}
                        placeholder="John Doe"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="block w-full p-4 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="email"
                        value={email}
                        placeholder="johndoe@gmail.com"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="block w-full p-4 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="mb-6">
                    <input
                        type="password"
                        value={password}
                        placeholder="********"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="block w-full p-4 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                    Signup
                </button>
            </form>
        </div>
    )
}

export default SignupPage