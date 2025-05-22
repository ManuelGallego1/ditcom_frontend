'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginScheme } from '@/schemes/LoginScheme';
import { LoginDTO, LoginDAO } from '@/interfaces/LoginInterface';
import { loginUser } from '@/libs/auth-services';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import tokens from '@/utils/Token';

export default function FormLogin() {
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
      <div className={tokens.formGroup}>
        <label htmlFor="username" className={tokens.label}>
          Usuario
        </label>
        <input
          id="username"
          type="text"
          {...register('username')}
          className={tokens.input}
        />
        {errors.username && <p className={tokens.errorText}>{errors.username.message}</p>}
      </div>

      <div className={tokens.formGroupPassword}>
        <label htmlFor="password" className={tokens.label}>
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          {...register('password')}
          className={tokens.input}
        />
        {errors.password && <p className={tokens.errorText}>{errors.password.message}</p>}
      </div>

      <div>
        <button type="submit" className={tokens.formButton}>
          Iniciar Sesión
        </button>
      </div>
    </form>
  );
}
