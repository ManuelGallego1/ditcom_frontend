import { Metadata } from 'next';
import SedeDetail from '@/src/modules/admin/sedes/SedeDetail';
import { notFound } from 'next/navigation';
import { getSedeByIdServer } from '@/src/libs/sede-server-service';

interface SedePageProps {
    params: Promise<{ idSede: string }>;
}

export async function generateStaticParams() {
    const staticSedes = Array.from({ length: 30 }).map((_, i) => ({
        idSede: `${i + 1}`,
    }));
    return staticSedes;
}

export async function generateMetadata(
    props: {
        params: Promise<{ idSede: string }>;
    }
): Promise<Metadata> {
    const params = await props.params;
    const { idSede } = params;

    try {
        const sedeResponse = await getSedeByIdServer(idSede);
        if (!sedeResponse?.data) throw new Error('Sede not found');

        const sede = sedeResponse.data;
        return {
            title: `#${sede.id} - ${sede.nombre}`,
            description: `Detalles de la sede ${sede.nombre}`,
        };
    } catch {
        return {
            title: `#00 - No existente`,
            description: `Página de la sede no existente`,
        };
    }
}

export default async function SedePage(props: SedePageProps) {
    const params = await props.params;
    const { idSede } = params;
    let sede;

    try {
        const response = await getSedeByIdServer(idSede);
        if (!response?.data) throw new Error('Sede not found');
        sede = response.data;
    } catch {
        return notFound();
    }

    return <SedeDetail idSede={sede.id} />;
}