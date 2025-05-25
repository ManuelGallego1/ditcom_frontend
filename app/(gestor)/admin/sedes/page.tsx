import ScreenManagmentSedes from '@/modules/admin/sedes/ScreenManagmentSedes';
import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Gestor - Sedes',
    description: 'Gestor de Sedes',
};

export default function Page() {
    return (
        <ScreenManagmentSedes />
    );
}
