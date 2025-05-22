'use client'

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { sedeScheme } from '@/schemes/SedeScheme';
import { SedeDTO } from '@/interfaces/SedeInterface';
import { createSede } from '@/libs/sede-service';
import tokens from '@/utils/Token';
import CustomButton from '@/components/atoms/CustomButton';
import AlertBox from '@/components/atoms/AlertBox';
import Loading from '@/components/atoms/Loading';

import { useUsersByRole } from '@/hooks/useUserByRol';  // importa tu hook

type AlertType = 'success' | 'error' | 'info' | 'warning';

export default function FormSede() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<SedeDTO>({
    resolver: zodResolver(sedeScheme),
  });

  // Usa el hook para traer coordinadores
  const { items: coordinadores, loading: loadingCoordinadores, error } = useUsersByRole('coordinador');

  const [loading, setLoading] = React.useState(false);
  const [alert, setAlert] = React.useState<{ type: AlertType; message: string } | null>(null);
  const [fadeOut, setFadeOut] = React.useState(false);

  const onSubmit: SubmitHandler<SedeDTO> = async (data) => {
    setLoading(true);
    setAlert(null);
    try {
      const response = await createSede(data);
      if (response.status === 201 && response.data) {
        setAlert({ type: 'success', message: 'Sede creada correctamente.' });
        reset();
      } else if ((response as any).message) {
        setAlert({ type: 'error', message: (response as any).message });
      }
    } catch (error) {
      console.error('Error al crear sede:', error);
      setAlert({ type: 'error', message: 'Error al crear la sede.' });
    } finally {
      setLoading(false);
      setFadeOut(false);
      setTimeout(() => setFadeOut(true), 2500);
      setTimeout(() => { setAlert(null); setFadeOut(false); }, 3000);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={tokens.formCardWrapper}>
        <h4 className={tokens.formTitle}>Crear Sede</h4>
        <div className={tokens.formScrollableBody}>
          <div className={tokens.formGroup}>
            <label className={tokens.formLabel}>Nombre</label>
            <input {...register('nombre')} className={tokens.inputDark} />
            {errors.nombre && <p className={tokens.errorText}>{errors.nombre.message}</p>}
          </div>

          <div className={tokens.formGroup}>
            <label className={tokens.formLabel}>Coordinador</label>
            {loadingCoordinadores ? (
              <Loading />
            ) : error ? (
              <p className={tokens.errorText}>{error}</p>
            ) : (
              <select {...register('coordinador_id', { valueAsNumber: true })} className={tokens.inputDark} defaultValue="">
                <option value="" disabled>
                  -- Seleccionar coordinador --
                </option>
                {coordinadores.map((coord) => (
                  <option key={coord.id} value={coord.id}>
                    {coord.name} {/* o cualquier campo que identifique al coordinador */}
                  </option>
                ))}
              </select>
            )}
            {errors.coordinador_id && <p className={tokens.errorText}>{errors.coordinador_id.message}</p>}
          </div>

          {loading ? (
            <div className="flex justify-center my-4">
              <Loading />
            </div>
          ) : (
            <CustomButton text="Crear Sede" color="primaryButton" typeButton="submit" />
          )}
        </div>
      </form>

      {alert && (
        <AlertBox type={alert.type} message={alert.message} onClose={() => setAlert(null)} />
      )}
    </>
  );
}
