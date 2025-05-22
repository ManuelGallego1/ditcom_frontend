'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FijoDTO } from '@/interfaces/FijoInterface';
import { createFijo } from '@/libs/fijo-services';
import { fijoSchema } from '@/schemes/FijoScheme';
import { z } from 'zod';
import tokens from '@/utils/Token';
import CustomButton from '@/components/atoms/CustomButton';

type FijoFormDTO = z.infer<typeof fijoSchema>;

const Estrato = ['1', '2', '3', '4', '5', '6', 'NR'];
const TipoProducto = ['residencial', 'negocio'];
const TotalServicios = ['1', '2', '3'];
const TotalAdicionales = ['0', '1', '2', '3'];
const EstadoList = ['digitado', 'pendiente', 'instalado', 'legalizado'];

export default function FormFijo() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FijoFormDTO>({
    resolver: zodResolver(fijoSchema),
    defaultValues: {
      fecha_instalacion: '',
      fecha_legalizacion: '',
      servicios_adicionales: '',
      estrato: 'NR',
      cuenta: 0,
      OT: 0,
      tipo_producto: 'residencial',
      total_servicios: null,
      total_adicionales: null,
      cliente_cc: '',
      vendedor_id: 0,
      estado: 'digitado',
      convergente: '',
      ciudad: '',
    },
  });

  const onSubmit: SubmitHandler<FijoFormDTO> = async (data) => {
    try {
      const response = await createFijo(data as FijoDTO);
      alert('Registro creado correctamente.');
      console.log('Respuesta del servidor:', response);
    } catch (error) {
      console.error('Error al procesar el registro:', error);
      alert('Error al procesar el registro. Inténtalo de nuevo más tarde.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={tokens.loginCard}>
      <h4 className="text-xl font-semibold text-white mb-6">Crear Registro Fijo</h4>
      <div className="h-[60vh] overflow-y-auto space-y-5">
        <InputField label="Fecha de Instalación" type="date" register={register} name="fecha_instalacion" error={errors.fecha_instalacion} />
        <InputField label="Fecha de Legalización" type="date" register={register} name="fecha_legalizacion" error={errors.fecha_legalizacion} />
        <InputField label="Servicios Adicionales" register={register} name="servicios_adicionales" error={errors.servicios_adicionales} />
        <SelectField label="Estrato" name="estrato" register={register} error={errors.estrato} options={Estrato} />
        <InputField label="Cuenta" type="number" register={register} name="cuenta" error={errors.cuenta} />
        <InputField label="OT" type="number" register={register} name="OT" error={errors.OT} />
        <SelectField label="Tipo de Producto" name="tipo_producto" register={register} error={errors.tipo_producto} options={TipoProducto} />
        <SelectField label="Total Servicios" name="total_servicios" register={register} error={errors.total_servicios} options={TotalServicios} allowNull />
        <SelectField label="Total Adicionales" name="total_adicionales" register={register} error={errors.total_adicionales} options={TotalAdicionales} allowNull />
        <InputField label="Cédula del Cliente" register={register} name="cliente_cc" error={errors.cliente_cc} />
        <InputField label="ID Vendedor" type="number" register={register} name="vendedor_id" error={errors.vendedor_id} />
        <SelectField label="Estado" name="estado" register={register} error={errors.estado} options={EstadoList} />
        <InputField label="Convergente" register={register} name="convergente" error={errors.convergente} />
        <InputField label="Ciudad" register={register} name="ciudad" error={errors.ciudad} />
        <CustomButton
          text="Crear Registro"
          color="primaryButton"
          typeButton="submit"
          icon="Plus"
        />
      </div>
    </form>
  );
}

function InputField({ label, name, register, error, type = 'text' }: any) {
  return (
    <div className={tokens.formGroup}>
      <label className={tokens.label}>{label}</label>
      <input
        type={type}
        {...register(name)}
        className={tokens.input}
      />
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
