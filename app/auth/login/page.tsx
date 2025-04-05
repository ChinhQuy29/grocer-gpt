"use client";

import React, { useState, useEffect } from 'react'
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const router = useRouter();
    const { data: session, status } = useSession();

    // Check for session changes and redirect if authenticated
    useEffect(() => {
        if (status === 'authenticated' && session?.user?.id) {
            router.push(`/profile/${session.user.id}`);
        }
    }, [session, status, router]);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (res?.error) {
                setError("Invalid credentials");
                return;
            }

            // The redirect will happen in the useEffect hook when session is updated
        } catch (err) {
            console.error("Login error:", err);
            setError("An error occurred during login");
        }
    }

    return (
        <div>
            {error && <div style={{ color: "red" }}>{error}</div>}
            <form onSubmit={handleLogin}>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='johndoe@gmail.com' />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='***********' />
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default LoginPage