import { Metadata } from "next";
import NotFound from '@/src/components/molecules/NotFound';

export const metadata: Metadata = {
    title: 'Venta fija no encontrado | Ditcom',
    description: 'La venta fija que buscas no existe o no está disponible.',
};

export default function NotFoundPage() {
    return (
        <NotFound
            message="La venta fija que buscas no existe o no está disponible."
            buttonText="Volver a la lista de ventas fijas"
            redirectTo="/activador/fijo"
        />
    );
}