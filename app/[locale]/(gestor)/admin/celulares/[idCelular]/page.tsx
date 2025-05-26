import { Metadata } from 'next';
import CelularDetail from '@/modules/admin/celulares/CelularDetail';
import { notFound } from 'next/navigation';
import { getCelularByIdServer } from '@/libs/celular-server-service';

interface CelularPageProps {
    params: { idCelular: string };
}

export async function generateStaticParams() {
    const staticCelulares = Array.from({ length: 30 }).map((_, i) => ({
        idCelular: `${i + 1}`,
    }));
    return staticCelulares;
}

export async function generateMetadata({
    params,
}: {
    params: { idCelular: string };
}): Promise<Metadata> {
    const { idCelular } = params;

    try {
        const celularResponse = await getCelularByIdServer(idCelular);
        if (!celularResponse?.data) throw new Error('Celular not found');

        const celular = celularResponse.data;
        return {
            title: `#${celular.id} - ${celular.modelo}`,
            description: `Detalles del celular ${celular.modelo}`,
        };
    } catch {
        return {
            title: `#00 - No existente`,
            description: `Página del celular no existente`,
        };
    }
}

export default async function CelularPage({ params }: CelularPageProps) {
    const { idCelular } = params;
    let celular;

    try {
        const response = await getCelularByIdServer(idCelular);
        if (!response?.data) throw new Error('Celular not found');
        celular = response.data;
    } catch {
        return notFound();
    }

    return <CelularDetail idCelular={celular.id} />;
}
