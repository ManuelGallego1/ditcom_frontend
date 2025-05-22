import React from 'react';

interface SideBarButtonProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}

export default function SideBarButton({ sidebarOpen, setSidebarOpen }: SideBarButtonProps) {
  return (
    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="m-4 p-2 bg-blue-500 text-white rounded">
            {sidebarOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            )}
        </button>
  )
}
