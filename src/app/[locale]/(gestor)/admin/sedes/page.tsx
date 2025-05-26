import ScreenManagmentSedes from '@/src/modules/admin/sedes/ScreenManagmentSedes';
import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Gestor - Sedes | Ditcom',
    description: 'Gestor de Sedes',
};

export default function Page() {
    return (
        <ScreenManagmentSedes />
    );
}
