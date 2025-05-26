import FormFijo from '@/components/molecules/forms/FormFijo';
import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Crear - Fijo | Ditcom',
    description: 'Crea un nuevo producto Fijo en Ditcom',
};

export default function Page() {
    return (
        <FormFijo />
    );
}
