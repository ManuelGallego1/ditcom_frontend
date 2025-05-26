'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { clienteScheme } from '@/schemes/ClienteScheme';
import { ClienteDTO } from '@/interfaces/ClienteInterface';
import { createCliente } from '@/libs/clientes-service';
import tokens from '@/utils/Token';
import CustomButton from '@/components/atoms/CustomButton';
import AlertBox from '@/components/atoms/AlertBox';

export default function ClienteModal({
    onClose,
    ccInicial,
    onClienteCreado
}: {
    onClose: () => void;
    ccInicial: string;
    onClienteCreado?: () => void;
}) {
    const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ClienteDTO>({
        resolver: zodResolver(clienteScheme),
        defaultValues: {
            cc: ccInicial,
            p_nombre: '',
            s_nombre: '',
            p_apellido: '',
            s_apellido: '',
            email: '',
            numero: ''
        }
    });

    const onSubmit = async (data: ClienteDTO) => {
        try {
            await createCliente(data);
            setAlert({ type: 'success', message: 'Cliente creado exitosamente.' });
            if (onClienteCreado) onClienteCreado();
            setTimeout(() => {
                setAlert(null);
                onClose();
            }, 2000);
        } catch (error) {
            console.error('Error creando cliente', error);
            setAlert({ type: 'error', message: 'Error al crear cliente. Intenta de nuevo.' });
        }
    };

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                <div className={`${tokens.formCardWrapper} w-full max-w-md`}>
                    <h2 className={tokens.formTitle}>Crear Nuevo Cliente</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                        <div>
                            <label className="block mb-1" htmlFor="p_nombre">Primer Nombre</label>
                            <input id="p_nombre" {...register('p_nombre')} placeholder="Primer Nombre" className={tokens.input} />
                            {errors.p_nombre && <p className={tokens.errorText}>{errors.p_nombre.message}</p>}
                        </div>

                        <div>
                            <label className="block mb-1" htmlFor="s_nombre">Segundo Nombre</label>
                            <input id="s_nombre" {...register('s_nombre')} placeholder="Segundo Nombre" className={tokens.input} />
                        </div>

                        <div>
                            <label className="block mb-1" htmlFor="p_apellido">Primer Apellido</label>
                            <input id="p_apellido" {...register('p_apellido')} placeholder="Primer Apellido" className={tokens.input} />
                            {errors.p_apellido && <p className={tokens.errorText}>{errors.p_apellido.message}</p>}
                        </div>

                        <div>
                            <label className="block mb-1" htmlFor="s_apellido">Segundo Apellido</label>
                            <input id="s_apellido" {...register('s_apellido')} placeholder="Segundo Apellido" className={tokens.input} />
                        </div>

                        <div>
                            <label className="block mb-1" htmlFor="email">Correo</label>
                            <input id="email" {...register('email')} placeholder="Correo" className={tokens.input} />
                            {errors.email && <p className={tokens.errorText}>{errors.email.message}</p>}
                        </div>

                        <div>
                            <label className="block mb-1" htmlFor="numero">Número</label>
                            <input id="numero" {...register('numero')} placeholder="Número" className={tokens.input} />
                            {errors.numero && <p className={tokens.errorText}>{errors.numero.message}</p>}
                        </div>

                        <div className="flex justify-end gap-2 pt-4">
                            <CustomButton
                                text="Cancelar"
                                color="secondaryButton"
                                onClickButton={onClose}
                                icon="close"
                            />
                            <CustomButton
                                text="Crear"
                                color="primaryButton"
                                typeButton="submit"
                                icon="success"
                            />
                        </div>
                    </form>
                </div>
            </div>

            {alert && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[60]">
                    <AlertBox
                        type={alert.type}
                        message={alert.message}
                        onClose={() => setAlert(null)}
                    />
                </div>
            )}

        </>
    );
}
