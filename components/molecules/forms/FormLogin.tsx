'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginScheme } from '@/schemes/LoginScheme';
import { LoginDTO, LoginDAO } from '@/interfaces/LoginInterface';
import { loginUser } from '@/libs/auth-services';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import tokens from '@/utils/Token';
import CustomButton from '@/components/atoms/CustomButton';
import AlertBox from '@/components/atoms/AlertBox';
import Loading from '@/components/atoms/Loading';
import { useState, useEffect } from 'react';

export default function FormLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDTO>({
    resolver: zodResolver(loginScheme),
  });

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [fadeOutError, setFadeOutError] = useState(false);

  const onSubmit: SubmitHandler<LoginDTO> = async (data) => {
    setIsLoading(true);
    try {
      const response: LoginDAO = await loginUser(data);

      if (response.data.token) {
        Cookies.set('token', response.data.token, { expires: 7 });
        Cookies.set('user', JSON.stringify(response.data.user), { expires: 7 });

        if (response.data.user.activo) {
          setTimeout(() => {
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
          });
        } else {
          console.log('Usuario inactivo');
        }
      }
    } catch (error) {
      setShowError(true);
      setFadeOutError(false);

      setTimeout(() => {
        setFadeOutError(true);
      }, 2500);

      setTimeout(() => {
        setShowError(false);
        setFadeOutError(false);
      }, 3000);
      
      console.error('Login fallido:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <form onSubmit={handleSubmit(onSubmit)} className={isLoading ? 'pointer-events-none opacity-50' : ''}>
        <div className={tokens.formGroup}>
          <label htmlFor="username" className={tokens.label}>Usuario</label>
          <input
            id="username"
            type="text"
            {...register('username')}
            className={tokens.input}
          />
          {errors.username && <p className={tokens.errorText}>{errors.username.message}</p>}
        </div>

        <div className={tokens.formGroupPassword}>
          <label htmlFor="password" className={tokens.label}>Contraseña</label>
          <input
            id="password"
            type="password"
            {...register('password')}
            className={tokens.input}
          />
          {errors.password && <p className={tokens.errorText}>{errors.password.message}</p>}
        </div>

        <div>
          <CustomButton
            text="Iniciar Sesión"
            color="primaryButton"
            typeButton="submit"
            onClickButton={() => { }}
          />

          {showError && (
            <div
              className={`transition-opacity duration-500 ${
                fadeOutError ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <AlertBox
                type="error"
                message="Alguno de los campos es incorrecto o el usuario no existe"
              />
            </div>
          )}
        </div>
      </form>
    </>
  );
}
