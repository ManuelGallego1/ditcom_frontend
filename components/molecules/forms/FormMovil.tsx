'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MovilSchema } from '@/schemes/MovilScheme';
import {
  Financiera,
  MovilDTO,
  TipoMovil,
  TipoProducto
} from '@/interfaces/MovilInterface';
import { createMovil } from '@/libs/movil-service';
import tokens from '@/utils/Token';
import CustomButton from '@/components/atoms/CustomButton';
import AlertBox from '@/components/atoms/AlertBox';
import Loading from '@/components/atoms/Loading';
import Cookies from 'js-cookie';
import { useMarcasCelulares } from '@/hooks/useMarcasCelulares';
import { useModelosByMarca } from '@/hooks/useModelosByMarca';
import { usePlanes } from '@/hooks/usePlanes';
import { useClienteByCC } from '@/hooks/useClienteByCC';
import CreateClienteModal from '@/components/molecules/modals/ModalCliente';

type AlertType = 'success' | 'error' | 'info' | 'warning';

export default function FormMovil() {
  const { marcas } = useMarcasCelulares();
  const [selectedMarca, setSelectedMarca] = useState<string | null>(null);
  const { modelos } = useModelosByMarca(selectedMarca);
  const { planes } = usePlanes();

  const {
    cliente,
    existe,
    loading: loadingCliente,
    error: errorCliente,
    buscarCliente
  } = useClienteByCC();

  const [modalOpen, setModalOpen] = useState(false);

  const userCookie = Cookies.get('user');
  const vendedorIdFromCookie = userCookie ? JSON.parse(userCookie).id ?? 0 : 0;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues
  } = useForm<MovilDTO>({
    resolver: zodResolver(MovilSchema),
    defaultValues: {
      vendedor_id: 16,
      min: '',
      imei: '',
      iccid: '',
      tipo: TipoMovil.KIT_PREPAGO,
      plan_id: 0,
      celulares_id: 0,
      cliente_cc: '',
      tipo_producto: TipoProducto.RESIDENCIAL,
      factura: '',
      ingreso_caja: '',
      valor_total: 0,
      valor_recarga: null,
      financiera: Financiera.NA
    }
  });

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: AlertType; message: string } | null>(null);
  const [fadeOut, setFadeOut] = useState(false);

  const onSubmit: SubmitHandler<MovilDTO> = async (data) => {
    console.log('Formulario enviado:', data);
    setLoading(true);
    setAlert(null);
    try {
      const response = await createMovil(data);
      if (response.status === 201 && response.data) {
        setAlert({ type: 'success', message: 'Móvil creado correctamente.' });
        reset();
        setSelectedMarca(null);
      } else if ((response as any).message) {
        setAlert({ type: 'error', message: (response as any).message });
      }
    } catch (error) {
      console.error('Error al crear móvil:', error);
      setAlert({ type: 'error', message: 'Error al crear el móvil.' });
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

  const handleClienteCheck = async () => {
    const cc = getValues('cliente_cc');
    if (!cc) return;
    await buscarCliente(cc);

    if (existe === false) {
      setModalOpen(true);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-full w-full p-4">
        <form onSubmit={handleSubmit(onSubmit)} className={`${tokens.formCardWrapper} w-[40vw]`}>
          <h4 className={tokens.formTitle}>Crear Móvil</h4>
          <div className={tokens.formScrollableBody}>
            <Field label="MIN" name="min" register={register} error={errors.min} />
            <Field label="IMEI" name="imei" register={register} error={errors.imei} />
            <Field label="ICCID" name="iccid" register={register} error={errors.iccid} />

            <SelectField
              name="tipo"
              label="Tipo"
              register={register}
              error={errors.tipo}
              options={[
                'kit prepago', 'kit financiado', 'wb', 'up grade', 'linea nueva',
                'reposicion', 'portabilidad pre', 'portabilidad pos',
                'venta de tecnologia', 'equipo pos'
              ]}
            />

            <SelectField
              name="plan_id"
              label="Plan"
              register={register}
              error={errors.plan_id}
              valueAsNumber={true}
              options={planes.map(p => ({ label: `${p.codigo} ${p.nombre}`, value: p.id }))}
            />

            <div className={tokens.formGroup}>
              <label className={tokens.formLabel}>Marca</label>
              <select
                className={tokens.input}
                onChange={(e) => {
                  setSelectedMarca(e.target.value);
                  setValue('celulares_id', 0);
                }}
                value={selectedMarca ?? ''}
              >
                <option value="">Seleccione una opción</option>
                {marcas.map((marca, i) => (
                  <option key={i} value={marca}>{marca}</option>
                ))}
              </select>
            </div>

            <SelectField
              name="celulares_id"
              label="Modelo"
              register={register}
              error={errors.celulares_id}
              valueAsNumber={true}
              options={modelos.map(m => ({ label: m.modelo, value: m.id }))}
            />

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

            <Field label="Factura" name="factura" register={register} error={errors.factura} />
            <Field label="Ingreso Caja" name="ingreso_caja" register={register} error={errors.ingreso_caja} />
            <Field label="Valor Total" name="valor_total" register={register} error={errors.valor_total} type="number" />
            <Field label="Valor Recarga" name="valor_recarga" register={register} error={errors.valor_recarga} type="number" />

            <SelectField
              name="tipo_producto"
              label="Tipo de Producto"
              register={register}
              error={errors.tipo_producto}
              options={[{ label: 'residencial', value: 'residencial' }, { label: 'pyme', value: 'pyme' }]}
            />

            <input type="hidden" value={16} {...register('vendedor_id')} />

            <SelectField
              name="financiera"
              label="Financiera"
              register={register}
              error={errors.financiera}
              options={['crediminuto', 'celya', 'brilla', 'N/A']}
            />

            {loading ? (
              <div className="flex justify-center my-4"><Loading /></div>
            ) : (
              <CustomButton text="Crear Móvil" color="primaryButton" typeButton="submit" />
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
    </>
  );
}

function Field({ label, name, register, error, type = 'text', readOnly = false }: any) {
  const inputProps = type === 'number' ? { valueAsNumber: true } : {};
  return (
    <div className={tokens.formGroup}>
      <label className={tokens.formLabel}>{label}</label>
      <input type={type} {...register(name, inputProps)} className={tokens.input} readOnly={readOnly} />
      {error && <p className={tokens.errorText}>{error.message}</p>}
    </div>
  );
}

function SelectField({ label, name, register, error, options, valueAsNumber = false }: any) {
  return (
    <div className={tokens.formGroup}>
      <label className={tokens.formLabel}>{label}</label>
      <select {...register(name, valueAsNumber ? { valueAsNumber: true } : {})} className={tokens.input}>
        <option value="">Seleccione una opción</option>
        {options.map((option: any, index: number) => (
          <option key={index} value={option.value ?? option}>
            {option.label ?? option}
          </option>
        ))}
      </select>
      {error && <p className={tokens.errorText}>{error.message}</p>}
    </div>
  );
}
