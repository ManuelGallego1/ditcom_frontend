import { Metadata } from "next"
import NotFound from '@/src/components/molecules/NotFound';

export const metadata: Metadata = {
  title: 'Plan no encontrado | Ditcom',
  description: 'El plan que buscas no existe o no está disponible.',
}

export default function NotFoundPage() {
  return (
    <NotFound
      message="El plan que buscas no existe o no está disponible."
      buttonText="Volver a la lista de planes"
      redirectTo="/admin/planes"
    />
  );
}