"use client";

import React, { useState, useEffect } from 'react';
// import { fetchNotifications } from '@/app/api/user';

interface Notification {
    id: number;
    message: string;
    time: string;
    read: boolean;
    type: 'success' | 'alert' | 'info';
}

const NotificationsPage = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadNotifications = async () => {
            setLoading(true);
            try {
                // const data = await fetchNotifications();
                // setNotifications(data);

                // --- Mock Data Placeholder ---
                await new Promise(resolve => setTimeout(resolve, 500));
                setNotifications([
                    { id: 1, message: 'Document "Q3 Report" verification successful.', time: '2 mins ago', read: false, type: 'success' },
                    { id: 2, message: 'New document "Contract-102" shared with you by Admin.', time: '1 hour ago', read: false, type: 'info' },
                    { id: 3, message: 'JWT token renewal failed. Please log in.', time: '5 hours ago', read: true, type: 'alert' },
                ]);
                // -----------------------------
            } catch (error) {
                console.error("Failed to load notifications:", error);
            } finally {
                setLoading(false);
            }
        };
        loadNotifications();
    }, []);

    const markAsRead = (id: number) => {
        setNotifications(prev => 
            prev.map(n => n.id === id ? { ...n, read: true } : n)
        );
    };

    const getNotificationColor = (type: Notification['type']) => {
        switch (type) {
            case 'success': return 'bg-green-100 border-green-400 text-green-700';
            case 'alert': return 'bg-red-100 border-red-400 text-red-700';
            case 'info': return 'bg-blue-100 border-blue-400 text-blue-700';
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Notifications</h1>
            <div className="flex justify-between items-center mb-4">
                <p className="text-gray-600">{notifications.filter(n => !n.read).length} unread notifications</p>
                <button 
                    onClick={() => setNotifications(prev => prev.map(n => ({...n, read: true})))}
                    className="text-sm text-blue-600 hover:text-blue-800"
                >
                    Mark all as read
                </button>
            </div>
            
            <div className="space-y-4">
                {loading ? (
                    <p className="text-gray-500">Loading notifications...</p>
                ) : notifications.length === 0 ? (
                    <p className="text-gray-500">You have no new notifications.</p>
                ) : (
                    notifications.map(n => (
                        <div 
                            key={n.id} 
                            className={`p-4 border-l-4 rounded-md shadow-sm transition-all flex justify-between items-center 
                                ${getNotificationColor(n.type)} ${n.read ? 'opacity-60' : 'opacity-100 font-semibold'}`
                            }
                        >
                            <div>
                                <p>{n.message}</p>
                                <span className="text-xs opacity-75">{n.time}</span>
                            </div>
                            {!n.read && (
                                <button 
                                    onClick={() => markAsRead(n.id)}
                                    className="text-xs border border-current px-2 py-1 rounded-full hover:bg-white"
                                >
                                    Mark Read
                                </button>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default NotificationsPage;