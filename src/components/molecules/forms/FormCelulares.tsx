'use client'

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { celularScheme } from '@/src/schemes/CelularScheme';
import { CelularDTO } from '@/src/interfaces/CelularInterface';
import { createCelular } from '@/src/libs/celulares-service';
import tokens from '@/src/utils/Token';
import CustomButton from '@/src/components/atoms/CustomButton';
import AlertBox from '@/src/components/atoms/AlertBox';
import Loading from '@/src/components/atoms/Loading';

type AlertType = 'success' | 'error' | 'info' | 'warning';

export default function FormCelular() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<CelularDTO>({
        resolver: zodResolver(celularScheme)
    });

    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState<{ type: AlertType; message: string } | null>(null);
    const [fadeOut, setFadeOut] = useState(false);

    const onSubmit: SubmitHandler<CelularDTO> = async data => {
        setLoading(true);
        setAlert(null);
        try {
            const response = await createCelular(data);
            if (response.status === 201 && response.data) {
                setAlert({ type: 'success', message: 'Celular creado correctamente.' });
                reset();
            } else if ((response as any).message) {
                setAlert({ type: 'error', message: (response as any).message });
            }
        } catch (error) {
            console.error('Error al crear celular:', error);
            setAlert({ type: 'error', message: 'Error al crear el celular.' });
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
                <h4 className={tokens.formTitle}>Crear Celular</h4>
                <div className={tokens.formScrollableBody}>
                    <div className={tokens.formGroup}>
                        <label className={tokens.formLabel}>Marca</label>
                        <input {...register('marca')} className={tokens.inputDark} />
                        {errors.marca && <p className={tokens.errorText}>{errors.marca.message}</p>}
                    </div>
                    <div className={tokens.formGroup}>
                        <label className={tokens.formLabel}>Modelo</label>
                        <input {...register('modelo')} className={tokens.inputDark} />
                        {errors.modelo && <p className={tokens.errorText}>{errors.modelo.message}</p>}
                    </div>

                    {loading ? (
                        <div className="flex justify-center my-4"><Loading /></div>
                    ) : (
                        <CustomButton
                            text="Crear Celular"
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
