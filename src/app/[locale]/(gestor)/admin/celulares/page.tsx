import ScreenManagmentCelulares from '@/src/modules/admin/celulares/ScreenManagmentCelulares';
import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Gestor - Celulares | Ditcom',
    description: 'Gestor de Celulares',
};

export default function Page() {
    return (
        <ScreenManagmentCelulares />
    );
}
