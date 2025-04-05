"use client"

import React from 'react'
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { signOut } from 'next-auth/react';

const ProfilePage = () => {
    const { id } = useParams();
    const { data: session } = useSession();

    return (
        <div>
            <div>
                Profile {id}
            </div>
            <div>
                User's ID: {session?.user?.id}
            </div>
            <button 
                onClick={() => signOut({ callbackUrl: '/auth/login' })} 
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
                Sign Out
            </button>
        </div>
    )
}

export default ProfilePage