'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FijoScheme } from '@/src/schemes/FijoScheme';
import { createFijo } from '@/src/libs/fijo-service';
import { FijoDTO, TipoProducto, TotalAdicionales, TotalServicios, Estrato } from '@/src/interfaces/FijoInterface';
import { z } from 'zod';
import tokens from '@/src/utils/Token';
import CustomButton from '@/src/components/atoms/CustomButton';
import AlertBox from '@/src/components/atoms/AlertBox';
import Loading from '@/src/components/atoms/Loading';
import Field from '@/src/components/atoms/Field';
import SelectField from '@/src/components/atoms/SelectField';
import Cookies from 'js-cookie';
import { useClienteByCC } from '@/src/hooks/useClienteByCC';
import CreateClienteModal from '@/src/components/molecules/modals/ModalCliente';

type FijoFormDTO = z.infer<typeof FijoScheme>;
type AlertType = 'success' | 'error' | 'info' | 'warning';
const estratoOptions = Object.values(Estrato);
const tipoProductoList = Object.values(TipoProducto);
const totalServiciosList = Object.values(TotalServicios);
const totalAdicionalesList = Object.values(TotalAdicionales);

export default function FormFijo() {
  const userCookie = Cookies.get('user');
  const vendedorIdFromCookie = userCookie ? JSON.parse(userCookie).id ?? 0 : 0;

  const {
    cliente,
    existe,
    loading: loadingCliente,
    error: errorCliente,
    buscarCliente
  } = useClienteByCC();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue,
  } = useForm<FijoFormDTO>({
    resolver: zodResolver(FijoScheme),
    defaultValues: {
      fecha_instalacion: '',
      fecha_legalizacion: '',
      servicios_adicionales: '',
      estrato: Estrato.NR,
      cuenta: 0,
      OT: 0,
      tipo_producto: TipoProducto.RESIDENCIAL,
      total_servicios: TotalServicios.CERO,
      total_adicionales: TotalAdicionales.CERO,
      cliente_cc: '',
      vendedor_id: vendedorIdFromCookie,
      convergente: '',
      ciudad: ''
    }
  });

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: AlertType; message: string } | null>(null);
  const [fadeOut, setFadeOut] = useState(false);

  const onSubmit: SubmitHandler<FijoFormDTO> = async (data) => {
    setLoading(true);
    setAlert(null);
    try {
      const response = await createFijo(data as FijoDTO);
      setAlert({ type: 'success', message: 'Registro fijo creado correctamente.' });
      reset();
    } catch (error: any) {
      console.error('Error al procesar el registro:', error);
      if (error?.message) {
        setAlert({ type: 'error', message: error.message });
      } else if (typeof error === 'object' && error !== null && 'message' in error) {
        setAlert({ type: 'error', message: (error as any).message });
      } else {
        setAlert({ type: 'error', message: 'Error al procesar el registro. Inténtalo de nuevo.' });
      }
    } finally {
      setLoading(false);
      setFadeOut(false);
      setTimeout(() => setFadeOut(true), 2500);
      setTimeout(() => {
        setAlert(null);
        setFadeOut(false);
      }, 3000);
    }
  };

  const [modalOpen, setModalOpen] = useState(false);

  const handleClienteCheck = async () => {
    const cc = getValues('cliente_cc');
    if (!cc) return;
    await buscarCliente(cc);

    if (existe === false) {
      setModalOpen(true);
    }
  };

  return (
    <div className="flex justify-center items-center h-full w-full p-4">
      <form onSubmit={handleSubmit(onSubmit)} className={`${tokens.formCardWrapper} w-[40vw]`}>
        <h4 className={tokens.formTitle}>Crear Registro Fijo</h4>
        <div className={tokens.formScrollableBody}>
          <Field label="Fecha Instalación" name="fecha_instalacion" register={register} error={errors.fecha_instalacion} type="date" />
          <Field label="Fecha Legalización" name="fecha_legalizacion" register={register} error={errors.fecha_legalizacion} type="date" />
          <Field label="Servicios Adicionales" name="servicios_adicionales" register={register} error={errors.servicios_adicionales} />
          <SelectField label="Estrato" name="estrato" register={register} error={errors.estrato} options={estratoOptions} />
          <Field label="Cuenta" name="cuenta" register={register} error={errors.cuenta} type="number" />
          <Field label="OT" name="OT" register={register} error={errors.OT} type="number" />
          <SelectField label="Tipo Producto" name="tipo_producto" register={register} error={errors.tipo_producto} options={tipoProductoList} />
          <SelectField label="Total Servicios" name="total_servicios" register={register} error={errors.total_servicios} options={totalServiciosList} />
          <SelectField label="Total Adicionales" name="total_adicionales" register={register} error={errors.total_adicionales} options={totalAdicionalesList} />
          <div className={tokens.formGroup}>
            <label className={tokens.formLabel}>Cliente CC</label>
            <div className="flex gap-2 items-center">
              <input {...register('cliente_cc')} className={tokens.input} />
              <CustomButton
                text={
                  cliente?.cc
                    ? 'Asignado'
                    : existe === false
                      ? 'Crear'
                      : 'Buscar'
                }
                color="primaryButton"
                typeButton="button"
                onClickButton={handleClienteCheck}
              />

              {loadingCliente && <Loading />}
            </div>
            {errors.cliente_cc && <p className={tokens.errorText}>{errors.cliente_cc.message}</p>}
            {existe === false && !loadingCliente && (
              <p className="mt-2 font-bold">Cliente no encontrado. Puede crearlo.</p>
            )}
          </div>
          <input type="hidden" value={vendedorIdFromCookie} {...register('vendedor_id')} />
          <Field label="Convergente" name="convergente" register={register} error={errors.convergente} />
          <Field label="Ciudad" name="ciudad" register={register} error={errors.ciudad} />

          {loading ? (
            <div className="flex justify-center my-4"><Loading /></div>
          ) : (
            <CustomButton text="Crear Registro" color="primaryButton" typeButton="submit" icon="plus" />
          )}
        </div>
      </form>

      {alert && (
        <AlertBox
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      {modalOpen && (
        <CreateClienteModal
          ccInicial={getValues('cliente_cc')}
          onClose={() => setModalOpen(false)}
          onClienteCreado={() => {
            setModalOpen(false);
            buscarCliente(getValues('cliente_cc'));
          }}
        />
      )}
    </div>
  );
}