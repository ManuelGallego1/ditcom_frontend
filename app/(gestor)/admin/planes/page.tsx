import ScreenManagmentPlanes from '@/modules/admin/planes/ScreenManagmentPlanes';
import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Gestor - Planes | Ditcom',
    description: 'Gestor de Planes',
};

export default function Page() {
    return (
        <ScreenManagmentPlanes />
    );
}
