"use client";

import React, { useState, useEffect } from 'react';
// import { fetchVerifierReports } from '@/app/api/reports';

interface ReportsData {
    totalVerifications: number;
    successfulVerifications: number;
    failedVerifications: number;
    successRate: number; // Percentage
    issuersVerifiedCount: number;
}

const VerifierReportsPage = () => {
    const [reports, setReports] = useState<ReportsData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadReports = async () => {
            setLoading(true);
            try {
                // In a real application, you would fetch data from your backend
                // const data = await fetchVerifierReports();
                // setReports(data);
                
                // --- Mock Data Placeholder ---
                await new Promise(resolve => setTimeout(resolve, 800));
                setReports({
                    totalVerifications: 5600,
                    successfulVerifications: 5320,
                    failedVerifications: 280,
                    successRate: 95.0, 
                    issuersVerifiedCount: 45,
                });
                // -----------------------------
            } catch (error) {
                console.error("Failed to load verifier reports:", error);
            } finally {
                setLoading(false);
            }
        };
        loadReports();
    }, []);

    const metrics = [
        { title: "Total Verifications", value: reports?.totalVerifications, unit: "Checks", color: "bg-green-600" },
        { title: "Successful Verifications", value: reports?.successfulVerifications, unit: "Checks", color: "bg-green-600" },
        { title: "Verification Success Rate", value: reports?.successRate, unit: "%", color: "bg-blue-600" },
        { title: "Failed Verifications", value: reports?.failedVerifications, unit: "Checks", color: "bg-red-600" },
        { title: "Unique Issuers Verified", value: reports?.issuersVerifiedCount, unit: "Orgs", color: "bg-yellow-600" },
    ];

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">Verification Reports Dashboard</h1>
            
            {loading ? (
                <p className="text-gray-500">Loading reports and data...</p>
            ) : reports ? (
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
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Monthly Verification Trend</h2>
                        {/* Placeholder for a Chart component showing activity over time */}
                        <div className="h-64 flex items-center justify-center text-gray-500 border border-dashed rounded-lg">
                            [Chart Component Placeholder: Verification Volume by Month]
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-xl">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Verification Failure Breakdown</h2>
                        <ul className="space-y-2">
                            <li className="p-2 border-b">Hash Mismatch (Tampered): 60%</li>
                            <li className="p-2 border-b">Document Not Found on Ledger: 30%</li>
                            <li className="p-2 border-b">Expired Document Signature: 10%</li>
                        </ul>
                    </div>
                </div>
            ) : (
                <p className="text-red-500">Unable to load reports data.</p>
            )}
        </div>
    );
};

export default VerifierReportsPage;