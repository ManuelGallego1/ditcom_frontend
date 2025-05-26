import NotFound from "@/src/components/molecules/NotFound";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Usuario no encontrado | Ditcom',
    description: 'El usuario que buscas no existe o no está disponible.',
};

export default function NotFoundPage() {
    return (
        <NotFound
            message="El usuario que buscas no existe o no está disponible."
            buttonText="Volver a la lista de usuarios"
            redirectTo="/admin/usuarios"
        />
    );
}