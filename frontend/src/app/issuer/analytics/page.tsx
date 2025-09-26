"use client";

import React, { useState, useEffect } from 'react';
// import { fetchIssuerAnalytics } from '@/app/api/analytics'; 
// Assuming you have a reusable component for charting or metrics display

interface AnalyticsData {
    totalDocumentsIssued: number;
    totalDocumentsVerified: number;
    verificationSuccessRate: number; // Percentage
    pendingVerifications: number;
    storageUsedGB: number;
}

const IssuerAnalyticsPage = () => {
    const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadAnalytics = async () => {
            setLoading(true);
            try {
                // In a real application, you would fetch data from your backend
                // const data = await fetchIssuerAnalytics();
                // setAnalytics(data);
                
                // --- Mock Data Placeholder ---
                await new Promise(resolve => setTimeout(resolve, 800));
                setAnalytics({
                    totalDocumentsIssued: 1540,
                    totalDocumentsVerified: 1210,
                    verificationSuccessRate: 78.57, 
                    pendingVerifications: 55,
                    storageUsedGB: 15.2,
                });
                // -----------------------------
            } catch (error) {
                console.error("Failed to load issuer analytics:", error);
            } finally {
                setLoading(false);
            }
        };
        loadAnalytics();
    }, []);

    const metrics = [
        { title: "Total Issued", value: analytics?.totalDocumentsIssued, unit: "Docs", color: "bg-blue-500" },
        { title: "Total Verified", value: analytics?.totalDocumentsVerified, unit: "Docs", color: "bg-green-500" },
        { title: "Success Rate", value: analytics?.verificationSuccessRate, unit: "%", color: "bg-green-500" },
        { title: "Pending Verification", value: analytics?.pendingVerifications, unit: "Requests", color: "bg-yellow-500" },
        { title: "Storage Used", value: analytics?.storageUsedGB, unit: "GB", color: "bg-red-500" },
    ];

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">Issuer Analytics Dashboard</h1>
            
            {loading ? (
                <p className="text-gray-500">Loading metrics and data...</p>
            ) : analytics ? (
                <div className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                        {metrics.map((metric) => (
                            <div 
                                key={metric.title} 
                                className={`p-6 rounded-lg text-white shadow-lg ${metric.color}`}
                            >
                                <p className="text-sm opacity-80">{metric.title}</p>
                                <h2 className="text-4xl font-extrabold mt-1">
                                    {metric.value}
                                    <span className="text-xl ml-2 font-normal">{metric.unit}</span>
                                </h2>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-xl">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Monthly Issuance Trend</h2>
                        {/* Placeholder for a Chart component (e.g., Recharts, Chart.js) */}
                        <div className="h-64 flex items-center justify-center text-gray-500 border border-dashed rounded-lg">
                            [Chart Component Placeholder: Issuance Volume Over Time]
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-xl">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Top 5 Most Verified Documents</h2>
                        {/* Placeholder for a table or list */}
                        <ul className="space-y-2">
                            <li className="p-2 border-b">1. Certificate of Origin (450 verifications)</li>
                            <li className="p-2 border-b">2. Shipping Invoice Q4 (320 verifications)</li>
                            <li className="p-2 border-b">3. Employee Record H9 (150 verifications)</li>
                        </ul>
                    </div>
                </div>
            ) : (
                <p className="text-red-500">Unable to load analytics data.</p>
            )}
        </div>
    );
};

export default IssuerAnalyticsPage;