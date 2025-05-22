import { Metadata } from 'next';
import UsuarioDetail from '@/modules/admin/usuarios/UsuarioDetail';
import { notFound } from 'next/navigation';
import { getUserByIdServer } from '@/libs/user-server-service';

interface UserPageProps {
  params: Promise<{ idUsuario: string }>;
}

export async function generateStaticParams() {
  const staticUsers = Array.from({ length: 30 }).map((_, i) => ({
    idUsuario: `${i + 1}`,
  }));
  return staticUsers;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ idUsuario: string }>;
}): Promise<Metadata> {
  const { idUsuario } = await params;

  try {
    const userResponse = await getUserByIdServer(idUsuario);
    if (!userResponse?.data) throw new Error('User not found');

    const user = userResponse.data;
    return {
      title: `#${user.id} - ${user.name}`,
      description: `Detalles del usuario ${user.name}`,
    };
  } catch {
    return {
      title: `#00 - No existente`,
      description: `Página del usuario no existente`,
    };
  }
}

export default async function UserPage({ params }: UserPageProps) {
  const { idUsuario } = await params;
  let user;

  try {
    const response = await getUserByIdServer(idUsuario);
    if (!response?.data) throw new Error('User not found');
    user = response.data;
  } catch {
    return notFound();
  }

  return <UsuarioDetail idUser={user.id} />;
}
