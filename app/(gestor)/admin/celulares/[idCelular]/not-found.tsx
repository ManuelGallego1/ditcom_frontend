import { Metadata } from "next"
import NotFound from '@/components/molecules/NotFound';

export const metadata: Metadata = {
  title: 'Celular no encontrado | Ditcom',
  description: 'El celular que buscas no existe o no está disponible.',
}

export default function NotFoundPage() {
  return (
    <NotFound
      message="El celular que buscas no existe o no está disponible."
      buttonText="Volver a la lista de celulares"
      redirectTo="/admin/celulares"
    />
  );
}