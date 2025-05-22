'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MovilDTO } from '@/interfaces/MovilInterface';
import { createMovil } from '@/libs/movil-service';
import { MovilSchema } from '@/schemes/MovilScheme';
import { z } from 'zod';
import tokens from '@/utils/Token';
import CustomButton from '@/components/atoms/CustomButton';

type MovilFormDTO = z.infer<typeof MovilSchema>;

export default function FormMovil() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MovilFormDTO>({
    resolver: zodResolver(MovilSchema),
    defaultValues: {
      min: '',
      imei: '',
      iccid: '',
      tipo: 'wb',
      plan_id: 0,
      celulares_id: 0,
      cliente_cc: '',
      factura: '',
      ingreso_caja: '',
      valor_total: 0,
      valor_recarga: null,
      tipo_producto: 'residencial',
      vendedor_id: 0,
      financiera: 'crediminuto',
      estado: 'digitado',
    },
  });

  const onSubmit: SubmitHandler<MovilFormDTO> = async (data) => {
    try {
      const response = await createMovil(data as unknown as MovilDTO);
      alert('Registro creado correctamente.');
      console.log('Respuesta del servidor:', response);
    } catch (error) {
      console.error('Error al procesar el registro:', error);
      alert('Error al procesar el registro. Inténtalo de nuevo más tarde.');
    }
  };

  const tipoOptions = [
    "kit prepago",
    "kit financiado",
    "wb",
    "up grade",
    "linea nueva",
    "reposicion",
    "portabilidad pre",
    "portabilidad pos",
    "venta de tecnologia",
    "equipo pos",
  ];

  const tipoProductoOptions = ["residencial", "pyme"];
  const financieraOptions = ["crediminuto", "celya", "brilla", "N/A"];
  const estadoOptions = ["digitado", "reclamar", "instalado", "cancelado", "razonado"];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={tokens.loginCard}>
      <h4 className="text-xl font-semibold text-white mb-6">Crear Registro Móvil</h4>
      <div className="h-[60vh] overflow-y-auto space-y-5">
        <InputField label="MIN" register={register} name="min" error={errors.min} />
        <InputField label="IMEI" register={register} name="imei" error={errors.imei} />
        <InputField label="ICCID" register={register} name="iccid" error={errors.iccid} />
        <SelectField label="Tipo" name="tipo" register={register} error={errors.tipo} options={tipoOptions} />
        <InputField label="Plan ID" type="number" register={register} name="plan_id" error={errors.plan_id} />
        <InputField label="Celulares ID" type="number" register={register} name="celulares_id" error={errors.celulares_id} />
        <InputField label="Cliente CC" register={register} name="cliente_cc" error={errors.cliente_cc} />
        <InputField label="Factura" register={register} name="factura" error={errors.factura} />
        <InputField label="Ingreso Caja" register={register} name="ingreso_caja" error={errors.ingreso_caja} />
        <InputField label="Valor Total" type="number" register={register} name="valor_total" error={errors.valor_total} />
        <InputField label="Valor Recarga" type="number" register={register} name="valor_recarga" error={errors.valor_recarga} />
        <SelectField label="Tipo de Producto" name="tipo_producto" register={register} error={errors.tipo_producto} options={tipoProductoOptions} />
        <InputField label="Vendedor ID" type="number" register={register} name="vendedor_id" error={errors.vendedor_id} />
        <SelectField label="Financiera" name="financiera" register={register} error={errors.financiera} options={financieraOptions} />
        <SelectField label="Estado" name="estado" register={register} error={errors.estado} options={estadoOptions} />
        <CustomButton text="Crear Registro" color="primaryButton" typeButton="submit" icon="Plus" />
      </div>
    </form>
  );
}

function InputField({ label, name, register, error, type = 'text' }: any) {
  return (
    <div className={tokens.formGroup}>
      <label className={tokens.label}>{label}</label>
      <input type={type} {...register(name)} className={tokens.input} />
      {error && <p className={tokens.errorText}>{error.message}</p>}
    </div>
  );
}

function SelectField({ label, name, register, error, options, allowNull = false }: any) {
  return (
    <div className={tokens.formGroup}>
      <label className={tokens.label}>{label}</label>
      <select {...register(name)} className={tokens.input}>
        {allowNull && <option value="">Seleccione una opción</option>}
        {options.map((option: string) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      {error && <p className={tokens.errorText}>{error.message}</p>}
    </div>
  );
}
