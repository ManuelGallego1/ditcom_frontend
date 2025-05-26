'use client'

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { planScheme } from '@/src/schemes/PlanScheme';
import { PlanDTO } from '@/src/interfaces/PlanInterface';
import { createPlan } from '@/src/libs/plan-service';
import tokens from '@/src/utils/Token';
import CustomButton from '@/src/components/atoms/CustomButton';
import AlertBox from '@/src/components/atoms/AlertBox';
import Loading from '@/src/components/atoms/Loading';

type AlertType = 'success' | 'error' | 'info' | 'warning';

export default function FormPlan() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<PlanDTO>({
        resolver: zodResolver(planScheme)
    });

    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState<{ type: AlertType; message: string } | null>(null);
    const [fadeOut, setFadeOut] = useState(false);

    const onSubmit: SubmitHandler<PlanDTO> = async data => {
        setLoading(true);
        setAlert(null);
        try {
            const response = await createPlan(data);
            if (response.status === 201 && response.data) {
                setAlert({ type: 'success', message: 'Plan creado correctamente.' });
                reset();
            } else if ((response as any).message) {
                setAlert({ type: 'error', message: (response as any).message });
            }
        } catch (error) {
            console.error('Error al crear plan:', error);
            setAlert({ type: 'error', message: 'Error al crear el plan.' });
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
                <h4 className={tokens.formTitle}>Crear Plan</h4>
                <div className={tokens.formScrollableBody}>
                    <div className={tokens.formGroup}>
                        <label className={tokens.formLabel}>Código</label>
                        <input {...register('codigo')} className={tokens.inputDark} />
                        {errors.codigo && <p className={tokens.errorText}>{errors.codigo.message}</p>}
                    </div>
                    <div className={tokens.formGroup}>
                        <label className={tokens.formLabel}>Nombre</label>
                        <input {...register('nombre')} className={tokens.inputDark} />
                        {errors.nombre && <p className={tokens.errorText}>{errors.nombre.message}</p>}
                    </div>

                    {loading ? (
                        <div className="flex justify-center my-4"><Loading /></div>
                    ) : (
                        <CustomButton
                            text="Crear Plan"
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