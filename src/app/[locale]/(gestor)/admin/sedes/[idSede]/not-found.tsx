import { Metadata } from "next";
import NotFound from '@/src/components/molecules/NotFound';

export const metadata: Metadata = {
    title: 'Sede no encontrada | Ditcom',
    description: 'La sede que buscas no existe o no está disponible.',
};

export default function NotFoundPage() {
    return (
        <NotFound
            message="La sede que buscas no existe o no está disponible."
            buttonText="Volver a la lista de sedes"
            redirectTo="/admin/sedes"
        />
    );
}