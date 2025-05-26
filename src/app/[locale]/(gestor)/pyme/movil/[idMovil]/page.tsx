import { Metadata } from 'next';
import MovilDetail from '@/src/modules/admin/moviles/MovilDetail';
import { notFound } from 'next/navigation';
import { getMovilByIdServer } from '@/src/libs/movil-server-service';

interface MovilPageProps {
    params: { idMovil: string };
}

export async function generateStaticParams() {
    const staticMoviles = Array.from({ length: 30 }).map((_, i) => ({
        idMovil: `${i + 1}`,
    }));
    return staticMoviles;
}

export async function generateMetadata({
    params,
}: {
    params: { idMovil: string };
}): Promise<Metadata> {
    const { idMovil } = params;

    try {
        const movilResponse = await getMovilByIdServer(idMovil);
        if (!movilResponse?.data) throw new Error('Movil not found');

        const movil = movilResponse.data;
        return {
            title: `Pyme Móvil - ${movil.min} | Ditcom`,
            description: `Detalles del móvil ${movil.min} - ${movil.cliente_cc}`,
        };
    } catch {
        return {
            title: `#00 - No existente`,
            description: `Página del móvil no existente`,
        };
    }
}

export default async function MovilPage({ params }: MovilPageProps) {
    const { idMovil } = params;
    let movil;

    try {
        const response = await getMovilByIdServer(idMovil);
        if (!response?.data) throw new Error('Movil not found');
        movil = response.data;
    } catch {
        return notFound();
    }

    return <MovilDetail idMovil={movil.id} />;
}