"use client";

import React, { useState, useEffect } from 'react';
// Assuming you have a standard data fetching utility
// import { fetchSharedDocuments } from '@/app/api/documents'; 

interface SharedDocument {
    id: string;
    name: string;
    sharedBy: string;
    sharedDate: string;
}

const SharedWithMePage = () => {
    const [documents, setDocuments] = useState<SharedDocument[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Placeholder for API call to fetch documents shared with the current user
        const loadSharedDocuments = async () => {
            setLoading(true);
            try {
                // const data = await fetchSharedDocuments();
                // setDocuments(data);
                
                // --- Mock Data Placeholder ---
                await new Promise(resolve => setTimeout(resolve, 500));
                setDocuments([
                    { id: '001', name: 'Q3 Financial Report', sharedBy: 'IssuerOrg', sharedDate: '2025-09-20' },
                    { id: '002', name: 'Contract Agreement v2', sharedBy: 'VerifierCo', sharedDate: '2025-09-25' },
                ]);
                // -----------------------------
            } catch (error) {
                console.error("Failed to load shared documents:", error);
            } finally {
                setLoading(false);
            }
        };
        loadSharedDocuments();
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Documents Shared With Me</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
                {loading ? (
                    <p className="text-gray-500">Loading shared documents...</p>
                ) : documents.length === 0 ? (
                    <p className="text-gray-500">No documents have been shared with you.</p>
                ) : (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shared By</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {documents.map(doc => (
                                <tr key={doc.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer">{doc.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.sharedBy}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.sharedDate}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button className="text-green-600 hover:text-green-900 mr-4">View</button>
                                        <button className="text-red-600 hover:text-red-900">Download</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default SharedWithMePage;