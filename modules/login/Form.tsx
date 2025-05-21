'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginScheme } from '@/schemes/LoginScheme';
import { LoginDTO, LoginDAO } from '@/interfaces/LoginInterface';
import { loginUser } from '@/libs/auth-services';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import formTokens from '@/utils/Token'; // 👈 Aquí se importan los tokens

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDTO>({
    resolver: zodResolver(loginScheme),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<LoginDTO> = async (data) => {
    try {
      const response: LoginDAO = await loginUser(data);

      if (response.data.token) {
        Cookies.set('token', response.data.token, { expires: 7 });
        Cookies.set('user', JSON.stringify(response.data.user), { expires: 7 });

        if (response.data.user.activo) {
          switch (response.data.user.role) {
            case 'administrador':
            case 'admin':
              router.push('/admin');
              break;
            case 'vendedor':
              router.push('/asesor');
              break;
            case 'pyme':
              router.push('/pyme');
              break;
            default:
              console.log('Role not found');
          }
        } else {
          console.log('User is not active');
        }
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={formTokens.formGroup}>
        <label htmlFor="username" className={formTokens.label}>
          Usuario
        </label>
        <input
          id="username"
          type="text"
          {...register('username')}
          className={formTokens.input}
        />
        {errors.username && <p className={formTokens.errorText}>{errors.username.message}</p>}
      </div>

      <div className="mb-6">
        <label htmlFor="password" className={formTokens.label}>
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          {...register('password')}
          className={formTokens.input}
        />
        {errors.password && <p className={formTokens.errorText}>{errors.password.message}</p>}
      </div>

      <div>
        <button type="submit" className={formTokens.button}>
          Iniciar Sesión
        </button>
      </div>
    </form>
  );
}
