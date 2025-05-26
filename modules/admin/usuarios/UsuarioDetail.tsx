'use client';

import { useEffect, useState } from 'react';
import { getUserById, updateUser } from '@/libs/user-service';
import { UserDAO, UserRole } from '@/interfaces/UserInterface';
import tokens from '@/utils/Token';

import Loading from '@/components/atoms/Loading';
import CustomButton from '@/components/atoms/CustomButton';
import AlertBox from '@/components/atoms/AlertBox';

interface Props {
  idUser: number;
}

const roles: UserRole[] = [
  'admin',
  'administrador',
  'pyme',
  'coordinador',
  'vendedor',
  'rol',
  'activador',
];

export default function UsuarioDetail({ idUser }: Props) {
  const [user, setUser] = useState<UserDAO | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    role: '' as UserRole | '',
    activo: false,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getUserById(idUser.toString())
      .then((res) => {
        if (res.data) {
          setUser(res.data);
          setFormData({
            name: res.data.name,
            username: res.data.username,
            role: res.data.role as UserRole,
            activo: res.data.activo === 1,
          });
          setError(null);
        } else {
          setError('No se encontró el usuario');
        }
      })
      .catch((err) => {
        console.error(err);
        setError('Error al cargar los datos del usuario');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [idUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value, type } = target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    const dataToSend = {
      name: formData.name,
      username: formData.username,
      role: formData.role as UserDAO['role'],
      activo: formData.activo ? 1 : 0,
    };

    try {
      await updateUser(idUser.toString(), dataToSend);
      setSuccess(true);
    } catch (err: any) {
      console.error(err);
      setError('Error al actualizar el usuario');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <Loading />;

  if (!user) return <p className="text-white">Usuario no encontrado.</p>;

  return (
    <div className={tokens.loginContainer}>
      <div className={tokens.loginCard}>
        <h1 className={`${tokens.pageTitle} text-center mb-4 text-white`}>
          Editar Usuario #{user.id}
        </h1>

        {error && (
          <AlertBox type="error" message={error} onClose={() => setError(null)} />
        )}
        {success && (
          <AlertBox
            type="success"
            message="¡Usuario actualizado con éxito!"
            onClose={() => setSuccess(false)}
          />
        )}

        <form onSubmit={handleSubmit}>
          <div className={tokens.formGroup}>
            <label className={tokens.label} htmlFor="name">
              Nombre
            </label>
            <input
              className={tokens.input}
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className={tokens.formGroup}>
            <label className={tokens.label} htmlFor="username">
              Usuario
            </label>
            <input
              className={tokens.input}
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className={tokens.formGroup}>
            <label className={tokens.label} htmlFor="role">
              Rol
            </label>
            <select
              className={tokens.input}
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un rol</option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className={`${tokens.formGroup} flex items-center justify-between`}>
            <label className={tokens.label} htmlFor="activo">
              Activo
            </label>
            <input
              type="checkbox"
              id="activo"
              name="activo"
              checked={formData.activo}
              onChange={handleChange}
              className="ml-4"
            />
          </div>

          <CustomButton
            text={isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
            color="primaryButton"
            typeButton="submit"
          />
        </form>
      </div>
    </div>
  );
}
