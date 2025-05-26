'use client'

import React, { useState } from 'react';
import NavBar from '@/components/molecules/NavBar';

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleSidebarToggle = (isOpen: boolean) => {
        setSidebarOpen(isOpen);
    };

    return (
        <div className="flex overflow-hidden h-screen w-screen">
            <div className={`flex-1 transition-all duration-500 ${sidebarOpen ? 'ml-60' : 'ml-0'}`}>
                <NavBar onSidebarToggle={handleSidebarToggle} />
                <div className='p-4 w-full h-full md:w-auto overflow-x-hidden' style={{ maxWidth: '100%', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    <style jsx>{`
                        ::-webkit-scrollbar {
                            display: none;
                        }
                    `}</style>
                    {children}
                </div>
            </div>
        </div>
    );
}
