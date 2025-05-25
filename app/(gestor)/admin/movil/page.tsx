import TableMovil from '@/components/organism/tables/TableMovil';
import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Gestor - Movil',
    description: 'Gestor de Movil',
};

export default function Page() {
    return (
        <TableMovil />
    );
}
