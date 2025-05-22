'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { sedeAsesorScheme } from '@/schemes/SedeAsesorScheme';
import { SedeAsesorDTO } from '@/interfaces/SedeAsesorInterface';
import { createSedeAsesor } from '@/libs/sede-asesor-service';
import tokens from '@/utils/Token';
import CustomButton from '@/components/atoms/CustomButton';
import AlertBox from '@/components/atoms/AlertBox';
import Loading from '@/components/atoms/Loading';

import { useUsersByRole } from '@/hooks/useUserByRol';
import { useSedes } from '@/hooks/useSedes';

type AlertType = 'success' | 'error' | 'info' | 'warning';

export default function FormSedeAsesor() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<SedeAsesorDTO>({
    resolver: zodResolver(sedeAsesorScheme),
  });

  const { items: vendedores, loading: loadingVendedores, error: errorVendedores } = useUsersByRole('vendedor');
  const { items: sedes, loading: loadingSedes, error: errorSedes } = useSedes();

  const [loading, setLoading] = React.useState(false);
  const [alert, setAlert] = React.useState<{ type: AlertType; message: string } | null>(null);
  const [fadeOut, setFadeOut] = React.useState(false);

  const onSubmit: SubmitHandler<SedeAsesorDTO> = async (data) => {
    setLoading(true);
    setAlert(null);
    try {
      const response = await createSedeAsesor(data);
      if (response.status === 201 && response.data) {
        setAlert({ type: 'success', message: 'Relación sede-asesor creada correctamente.' });
        reset();
      } else if ((response as any).message) {
        setAlert({ type: 'error', message: (response as any).message });
      }
    } catch (error) {
      console.error('Error al asignar asesor:', error);
      setAlert({ type: 'error', message: 'Error al asignar asesor a sede.' });
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
        <h4 className={tokens.formTitle}>Asignar Asesor a Sede</h4>
        <div className={tokens.formScrollableBody}>

          {/* Select Sede */}
          <div className={tokens.formGroup}>
            <label className={tokens.formLabel}>Sede</label>
            {loadingSedes ? (
              <Loading />
            ) : errorSedes ? (
              <p className={tokens.errorText}>{errorSedes}</p>
            ) : (
              <select {...register('sede_id', { valueAsNumber: true })} className={tokens.inputDark} defaultValue="">
                <option value="" disabled>-- Seleccionar sede --</option>
                {sedes.map((sede) => (
                  <option key={sede.id} value={sede.id}>{sede.nombre}</option>
                ))}
              </select>
            )}
            {errors.sede_id && <p className={tokens.errorText}>{errors.sede_id.message}</p>}
          </div>

          {/* Select Asesor */}
          <div className={tokens.formGroup}>
            <label className={tokens.formLabel}>Asesor</label>
            {loadingVendedores ? (
              <Loading />
            ) : errorVendedores ? (
              <p className={tokens.errorText}>{errorVendedores}</p>
            ) : (
              <select {...register('vendedor_id', { valueAsNumber: true })} className={tokens.inputDark} defaultValue="">
                <option value="" disabled>-- Seleccionar asesor --</option>
                {vendedores.map((vendedor) => (
                  <option key={vendedor.id} value={vendedor.id}>{vendedor.name}</option>
                ))}
              </select>
            )}
            {errors.vendedor_id && <p className={tokens.errorText}>{errors.vendedor_id.message}</p>}
          </div>

          {/* Botón / Loading */}
          {loading ? (
            <div className="flex justify-center my-4">
              <Loading />
            </div>
          ) : (
            <CustomButton text="Asignar Asesor" color="primaryButton" typeButton="submit" />
          )}
        </div>
      </form>

      {alert && (
        <AlertBox type={alert.type} message={alert.message} onClose={() => setAlert(null)} />
      )}
    </>
  );
}
