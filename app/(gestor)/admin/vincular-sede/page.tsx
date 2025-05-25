import ScreenManagmentSedes from '@/modules/admin/sedes/ScreenManagmentVincularSede';
import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Gestor - Vincular Sede | Ditcom',
    description: 'Gestor de Vincular Sede',
};

export default function Page() {
    return (
        <ScreenManagmentSedes />
    );
}
