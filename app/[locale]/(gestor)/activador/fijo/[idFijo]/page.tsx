import { Metadata } from 'next';
import FijoDetail from '@/modules/admin/fijos/FijoDetail';
import { notFound } from 'next/navigation';
import { getFijoByIdServer } from '@/libs/fijo-server-service';

interface FijoPageProps {
    params: { idFijo: string };
}

export async function generateStaticParams() {
    const staticFijos = Array.from({ length: 30 }).map((_, i) => ({
        idFijo: `${i + 1}`,
    }));
    return staticFijos;
}

export async function generateMetadata({
    params,
}: {
    params: { idFijo: string };
}): Promise<Metadata> {
    const { idFijo } = params;

    try {
        const fijoResponse = await getFijoByIdServer(idFijo);
        if (!fijoResponse?.data) throw new Error('Fijo not found');

        const fijo = fijoResponse.data;
        return {
            title: `Activador Fijo - ${fijo.OT} | Ditcom`,
            description: `Detalles del fijo ${fijo.OT} - ${fijo.cliente_cc}`,
        };
    } catch {
        return {
            title: `#00 - No existente`,
            description: `Página del fijo no existente`,
        };
    }
}

export default async function FijoPage({ params }: FijoPageProps) {
    const { idFijo } = params;
    let fijo;

    try {
        const response = await getFijoByIdServer(idFijo);
        if (!response?.data) throw new Error('Fijo not found');
        fijo = response.data;
    } catch {
        return notFound();
    }

    return <FijoDetail idFijo={fijo.id} />;
}