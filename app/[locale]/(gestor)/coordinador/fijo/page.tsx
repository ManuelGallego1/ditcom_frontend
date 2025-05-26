import TableFijo from '@/components/organism/tables/TableFijo';
import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Coordinador - Fijo | Ditcom',
    description: 'Gestor de Fijo',
};

export default function Page() {
    return (
        <TableFijo />
    );
}
