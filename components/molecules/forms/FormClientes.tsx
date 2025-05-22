'use client'

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { clienteScheme } from '@/schemes/ClienteScheme';
import { ClienteDTO } from '@/interfaces/ClienteInterface';
import { createCliente } from '@/libs/clientes-service';
import tokens from '@/utils/Token';
import CustomButton from '@/components/atoms/CustomButton';
import AlertBox from '@/components/atoms/AlertBox';
import Loading from '@/components/atoms/Loading';

type AlertType = 'success' | 'error' | 'info' | 'warning';

export default function FormCliente() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<ClienteDTO>({
        resolver: zodResolver(clienteScheme)
    });

    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState<{ type: AlertType; message: string } | null>(null);
    const [fadeOut, setFadeOut] = useState(false);

    const onSubmit: SubmitHandler<ClienteDTO> = async data => {
        setLoading(true);
        setAlert(null);
        try {
            const response = await createCliente(data);
            if (response.status === 201 && response.data) {
                setAlert({ type: 'success', message: 'Cliente creado correctamente.' });
                reset();
            } else if ((response as any).message) {
                setAlert({ type: 'error', message: (response as any).message });
            }
        } catch (error) {
            console.error('Error al crear cliente:', error);
            setAlert({ type: 'error', message: 'Error al crear el cliente.' });
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
                <h4 className={tokens.formTitle}>Crear Cliente</h4>
                <div className={tokens.formScrollableBody}>
                    <div className={tokens.formGroup}>
                        <label className={tokens.formLabel}>Cédula</label>
                        <input {...register('cc')} className={tokens.inputDark} />
                        {errors.cc && <p className={tokens.errorText}>{errors.cc.message}</p>}
                    </div>
                    <div className={tokens.formGroup}>
                        <label className={tokens.formLabel}>Primer Nombre</label>
                        <input {...register('p_nombre')} className={tokens.inputDark} />
                        {errors.p_nombre && <p className={tokens.errorText}>{errors.p_nombre.message}</p>}
                    </div>
                    <div className={tokens.formGroup}>
                        <label className={tokens.formLabel}>Segundo Nombre</label>
                        <input {...register('s_nombre')} className={tokens.inputDark} />
                        {errors.s_nombre && <p className={tokens.errorText}>{errors.s_nombre.message}</p>}
                    </div>
                    <div className={tokens.formGroup}>
                        <label className={tokens.formLabel}>Primer Apellido</label>
                        <input {...register('p_apellido')} className={tokens.inputDark} />
                        {errors.p_apellido && <p className={tokens.errorText}>{errors.p_apellido.message}</p>}
                    </div>
                    <div className={tokens.formGroup}>
                        <label className={tokens.formLabel}>Segundo Apellido</label>
                        <input {...register('s_apellido')} className={tokens.inputDark} />
                        {errors.s_apellido && <p className={tokens.errorText}>{errors.s_apellido.message}</p>}
                    </div>
                    <div className={tokens.formGroup}>
                        <label className={tokens.formLabel}>Correo Electrónico</label>
                        <input type="email" {...register('email')} className={tokens.inputDark} />
                        {errors.email && <p className={tokens.errorText}>{errors.email.message}</p>}
                    </div>
                    <div className={tokens.formGroup}>
                        <label className={tokens.formLabel}>Número de Teléfono</label>
                        <input {...register('numero')} className={tokens.inputDark} />
                        {errors.numero && <p className={tokens.errorText}>{errors.numero.message}</p>}
                    </div>

                    {loading ? (
                        <div className="flex justify-center my-4"><Loading /></div>
                    ) : (
                        <CustomButton
                            text="Crear Cliente"
                            color="primaryButton"
                            typeButton="submit"
                        />
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
        </>
    );
}
