import { Metadata } from "next";
import NotFound from '@/components/molecules/NotFound';

export const metadata: Metadata = {
    title: 'Venta movil no encontrado | Ditcom',
    description: 'La venta movil que buscas no existe o no está disponible.',
};

export default function NotFoundPage() {
    return (
        <NotFound
            message="La venta movil que buscas no existe o no está disponible."
            buttonText="Volver a la lista de móviles"
            redirectTo="/coordinador/movil"
        />
    );
}