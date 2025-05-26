'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginScheme } from '@/src/schemes/LoginScheme';
import { LoginDTO, LoginDAO } from '@/src/interfaces/LoginInterface';
import { loginUser } from '@/src/libs/auth-services';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useTranslations } from 'next-intl';
import tokens from '@/src/utils/Token';
import CustomButton from '@/src/components/atoms/CustomButton';
import AlertBox from '@/src/components/atoms/AlertBox';
import Loading from '@/src/components/atoms/Loading';
import { useState } from 'react';

export default function FormLogin() {
  const t = useTranslations('Login');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDTO>({
    resolver: zodResolver(loginScheme),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [fadeOutError, setFadeOutError] = useState(false);

  const redirectByRole = (role: string) => {
    switch (role) {
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
      case 'activador':
        router.push('/activador');
        break;
      case 'coordinador':
        router.push('/coordinador');
        break;
      default:
        console.warn('Role not found:', role);
    }
  };

  const handleErrorDisplay = () => {
    setShowError(true);
    setFadeOutError(false);

    setTimeout(() => setFadeOutError(true), 2000);
    setTimeout(() => setShowError(false), 2500);
  };

  const onSubmit: SubmitHandler<LoginDTO> = async (data) => {
    setIsLoading(true);
    try {
      const response: LoginDAO = await loginUser(data);

      if (response.data.token) {
        Cookies.set('token', response.data.token, { expires: 7 });
        Cookies.set('user', JSON.stringify(response.data.user), { expires: 7 });

        if (response.data.user.activo) {
          redirectByRole(response.data.user.role);
        } else {
          handleErrorDisplay();
          console.warn('Usuario inactivo');
        }
      }
    } catch (error) {
      console.error('Login fallido:', error);
      handleErrorDisplay();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loading />}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={isLoading ? 'pointer-events-none opacity-50' : ''}
      >
        {/* Usuario */}
        <div className={tokens.formGroup}>
          <label htmlFor="username" className={tokens.label}>
            {t('username')}
          </label>
          <input
            id="username"
            type="text"
            autoComplete="username"
            aria-invalid={!!errors.username}
            {...register('username')}
            className={tokens.input}
          />
          {errors.username && (
            <p className={tokens.errorText}>{errors.username.message}</p>
          )}
        </div>

        {/* Contraseña */}
        <div className={tokens.formGroupPassword}>
          <label htmlFor="password" className={tokens.label}>
            {t('password')}
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            aria-invalid={!!errors.password}
            {...register('password')}
            className={tokens.input}
          />
          {errors.password && (
            <p className={tokens.errorText}>{errors.password.message}</p>
          )}
        </div>

        {/* Botón + alerta */}
        <div>
          <CustomButton
            text={t('loginButton')}
            color="primaryButton"
            typeButton="submit"
          />

          {showError && (
            <div
              className={`transition-opacity duration-500 ${
                fadeOutError ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <AlertBox type="error" message={t('errorMessage')} />
            </div>
          )}
        </div>
      </form>
    </>
  );
}
