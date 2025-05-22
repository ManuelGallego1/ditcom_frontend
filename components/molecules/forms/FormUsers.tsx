'use client'

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerScheme } from '@/schemes/RegisterScheme';
import { UserDTO } from '@/interfaces/UserInterface';
import { createUser } from '@/libs/user-service';
import tokens from '@/utils/Token';
import CustomButton from '@/components/atoms/CustomButton';
import AlertBox from '@/components/atoms/AlertBox';
import Loading from '@/components/atoms/Loading';

type AlertType = 'success' | 'error' | 'info' | 'warning';

export default function FormUsers() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<UserDTO>({
        resolver: zodResolver(registerScheme)
    });

    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState<{ type: AlertType; message: string } | null>(null);
    const [fadeOut, setFadeOut] = useState(false);

    const onSubmit: SubmitHandler<UserDTO> = async data => {
        setLoading(true);
        setAlert(null);
        try {
            const response = await createUser(data); 
            if (response.status === 201 && response.data) {
                setAlert({ type: 'success', message: 'Usuario registrado correctamente.' });
                reset(); // limpia el formulario
            } else if (response.message) {
                setAlert({ type: 'error', message: response.message });
            }
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            setAlert({ type: 'error', message: 'Error al registrar el usuario.' });
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
                <h4 className={tokens.formTitle}>Crear Usuarios</h4>
                <div className={tokens.formScrollableBody}>
                    <div className={tokens.formGroup}>
                        <label className={tokens.formLabel}>Usuario</label>
                        <input {...register('username')} className={tokens.inputDark} />
                        {errors.username && <p className={tokens.errorText}>{errors.username.message}</p>}
                    </div>
                    <div className={tokens.formGroup}>
                        <label className={tokens.formLabel}>Contraseña</label>
                        <input type="password" {...register('password')} className={tokens.inputDark} />
                        {errors.password && <p className={tokens.errorText}>{errors.password.message}</p>}
                    </div>
                    <div className={tokens.formGroup}>
                        <label className={tokens.formLabel}>Nombre</label>
                        <input {...register('name')} className={tokens.inputDark} />
                        {errors.name && <p className={tokens.errorText}>{errors.name.message}</p>}
                    </div>
                    <div className={tokens.formGroup}>
                        <label className={tokens.formLabel}>Rol</label>
                        <select {...register('role')} className={tokens.inputDark}>
                            <option value="admin">Super</option>
                            <option value="administrador">Admin</option>
                            <option value="pyme">Pyme</option>
                            <option value="coordinador">Coordinador</option>
                            <option value="vendedor">Vendedor</option>
                            <option value="rol">Rol</option>
                            <option value="activador">Activador</option>
                        </select>
                        {errors.role && <p className={tokens.errorText}>{errors.role.message}</p>}
                    </div>

                    {loading ? (
                        <div className="flex justify-center my-4"><Loading /></div>
                    ) : (
                        <CustomButton
                            text="Crear Usuario"
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
