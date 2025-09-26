"use client";

import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth'; // Use the hook you implemented

const VerifierSettingsPage = () => {
    const { user, logout } = useAuth(); // Access user data and logout function

    // Organization-level settings state
    const [orgName, setOrgName] = useState('Verifier Security Solutions');
    const [contactEmail, setContactEmail] = useState(user?.email || '');
    const [integrationKey, setIntegrationKey] = useState('********************gH7jK'); // Mocked Integration Key

    // User security state
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleOrgUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        // Placeholder for API call to update organization settings
        console.log("Updating Verifier organization settings:", { orgName, contactEmail });
        alert("Organization settings updated! (Placeholder)");
    };

    const handlePasswordChange = (e: React.FormEvent) => {
        e.preventDefault();
        // Placeholder for API call to change user password
        console.log("Changing password...");
        alert("Password changed successfully! (Placeholder)");
        setCurrentPassword('');
        setNewPassword('');
    };
    
    const handleKeyRegenerate = () => {
        // Placeholder for API call to generate new API key
        if (confirm("Are you sure you want to regenerate the Integration Key? This will break external integrations.")) {
             setIntegrationKey('********************' + Math.random().toString(36).substring(2, 7).toUpperCase());
             alert("New Integration Key generated! Update your integrated systems.");
        }
    };

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Verifier Settings</h1>

            {/* Organization Settings */}
            <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-800">Organization Profile</h2>
                <form onSubmit={handleOrgUpdate} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Organization Name</label>
                        <input
                            type="text"
                            value={orgName}
                            onChange={(e) => setOrgName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Primary Contact Email</label>
                        <input
                            type="email"
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Save Organization Settings
                    </button>
                </form>
            </div>

            {/* Integration Key Management */}
            <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-800">Integration Key Management</h2>
                <div className="flex justify-between items-center bg-gray-50 p-3 rounded-md border">
                    <span className="font-mono text-sm break-all">{integrationKey}</span>
                    <button
                        onClick={handleKeyRegenerate}
                        className="ml-4 px-3 py-1 bg-yellow-600 text-white text-sm font-semibold rounded-lg hover:bg-yellow-700 transition-colors"
                    >
                        Regenerate Key
                    </button>
                </div>
                <p className="mt-2 text-sm text-gray-500">This key is used by your internal systems to verify documents against the blockchain ledger.</p>
            </div>
            
            {/* User Security Settings */}
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-800">Security</h2>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
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

            <div className="mt-8 p-6 bg-red-50 rounded-lg shadow-md flex justify-between items-center">
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

export default VerifierSettingsPage;