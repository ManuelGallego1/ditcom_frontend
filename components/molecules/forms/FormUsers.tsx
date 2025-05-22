'use client'

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerScheme } from '@/schemes/RegisterScheme';
import { UserDTO, UserDAO } from '@/interfaces/UserInterface';
import { createUser } from '@/libs/user-service';
import tokens from '@/utils/Token';
import CustomButton from '@/components/atoms/CustomButton';

export default function FormUsers() {
    const { register, handleSubmit, formState: { errors } } = useForm<UserDTO>({
        resolver: zodResolver(registerScheme)
    });

    const onSubmit: SubmitHandler<UserDTO> = async data => {
        try {
            const response = await createUser(data); 
            if (response.status === 201 && response.data) {
                alert('Usuario registrado correctamente.');
            } else if (response.message) {
                alert(response.message);
            }
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
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
                 <CustomButton
                    text="Crear Usuario"
                    color="primaryButton"
                    typeButton="submit"
                />
            </div>
        </form>
    );
}
