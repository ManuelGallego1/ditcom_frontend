import FormMovil from '@/components/molecules/forms/FormMovil';
import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Asesor Crear - Movil | Ditcom',
    description: 'Crea un nuevo producto Movil en Ditcom',
};

export default function Page() {
    return (
        <FormMovil />
    );
}
