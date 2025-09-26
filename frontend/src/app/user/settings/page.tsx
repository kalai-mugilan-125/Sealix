"use client";

import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth'; // Use the hook you implemented

const SettingsPage = () => {
    const { user, logout } = useAuth(); // Access user data and logout function

    // State for form inputs
    const [newName, setNewName] = useState(user?.name || '');
    const [newEmail, setNewEmail] = useState(user?.email || '');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleProfileUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        // Placeholder for API call to update profile
        console.log("Updating profile:", { name: newName, email: newEmail });
        alert("Profile updated successfully! (Placeholder)");
        // Call your updateProfile API here...
    };

    const handlePasswordChange = (e: React.FormEvent) => {
        e.preventDefault();
        // Placeholder for API call to change password
        console.log("Changing password...");
        alert("Password changed successfully! (Placeholder)");
        // Call your changePassword API here...
        setCurrentPassword('');
        setNewPassword('');
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">User Settings</h1>

            <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">Profile Information</h2>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email (Role: {user?.role})</label>
                        <input
                            type="email"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Update Profile
                    </button>
                </form>
            </div>

            <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">Change Password</h2>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Change Password
                    </button>
                </form>
            </div>
            
            <div className="p-6 bg-red-50 rounded-lg shadow-md flex justify-between items-center">
                <p className="text-red-700">Need to sign out?</p>
                <button
                    onClick={logout}
                    className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
                >
                    Log Out
                </button>
            </div>

        </div>
    );
};

export default SettingsPage;