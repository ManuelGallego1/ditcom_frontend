import ScreenManagmentUsers from '@/modules/admin/usuarios/ScreenManagmentUsers';
import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Gestor - Usuarios',
    description: 'Gestor de Usuarios',
};

export default function Page() {
    return (
        <ScreenManagmentUsers />
    );
}
