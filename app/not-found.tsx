import { Metadata } from "next"
import NotFound from '@/components/molecules/NotFound';

export const metadata: Metadata = {
  title: '404 Not Found',
  description: 'Page not found',
}

export default function NotFoundPage() {
  return (
    <NotFound
      message="La página que buscas no existe o no está disponible."
      buttonText="Volver a la página de inicio"
      redirectTo="/"
    />
  );
}