'use client';

import { useEffect, useState } from 'react';
import { getSedeById, updateSede } from '@/libs/sede-service';
import { SedeDAO, SedeDTO } from '@/interfaces/SedeInterface';
import tokens from '@/utils/Token';
import Loading from '@/components/atoms/Loading';
import CustomButton from '@/components/atoms/CustomButton';
import AlertBox from '@/components/atoms/AlertBox';


interface Props {
    idSede: number;
}

export default function SedeDetail({ idSede }: Props) {
    const [sede, setSede] = useState<SedeDAO | null>(null);
    const [formData, setFormData] = useState({
        nombre: '',
        coordinador_id: 0,
        activo: false,
    });

    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getSedeById(idSede.toString())
            .then((res) => {
                if (res.data) {
                    setSede(res.data);
                    setFormData({
                        nombre: res.data.nombre,
                        coordinador_id: res.data.coordinador_id,
                        activo: res.data.activo === 1,
                    });
                    setError(null);
                } else {
                    setError('No se encontró la sede');
                }
            })
            .catch(() => setError('Error al cargar los datos de la sede'))
            .finally(() => setIsLoading(false));
    }, [idSede]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : (type === 'number' ? Number(value) : value),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setSuccess(false);

        const dataToSend: SedeDTO & { activo: number } = {
            nombre: formData.nombre,
            coordinador_id: formData.coordinador_id,
            activo: formData.activo ? 1 : 0,
        };

        try {
            await updateSede(idSede.toString(), dataToSend);
            setSuccess(true);
        } catch {
            setError('Error al actualizar la sede');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) return <Loading />;
    if (!sede) return <p className="text-white">Sede no encontrada.</p>;

    return (
        <div className={tokens.loginContainer}>
            <div className={tokens.loginCard}>
                <h1 className={`${tokens.pageTitle} text-center mb-4 text-white`}>
                    Editar Sede #{sede.id}
                </h1>

                {error && (
                    <AlertBox type="error" message={error} onClose={() => setError(null)} />
                )}
                {success && (
                    <AlertBox
                        type="success"
                        message="¡Sede actualizada con éxito!"
                        onClose={() => setSuccess(false)}
                    />
                )}

                <form onSubmit={handleSubmit}>
                    <div className={tokens.formGroup}>
                        <label className={tokens.label} htmlFor="nombre">
                            Nombre
                        </label>
                        <input
                            className={tokens.input}
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={tokens.formGroup}>
                        <label className={tokens.label} htmlFor="coordinador_id">
                            Coordinador ID
                        </label>
                        <input
                            className={tokens.input}
                            type="number"
                            id="coordinador_id"
                            name="coordinador_id"
                            value={formData.coordinador_id}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={`${tokens.formGroup} flex items-center justify-between`}>
                        <label className={tokens.label} htmlFor="activo">
                            Activo
                        </label>
                        <input
                            type="checkbox"
                            id="activo"
                            name="activo"
                            checked={formData.activo}
                            onChange={handleChange}
                            className="ml-4"
                        />
                    </div>

                    <CustomButton
                        text={isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
                        color="primaryButton"
                        typeButton="submit"
                    />
                </form>
            </div>
        </div>
    );
}