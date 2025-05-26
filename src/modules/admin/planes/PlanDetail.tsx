'use client';

import { useEffect, useState } from 'react';
import { getPlanById, updatePlan } from '@/src/libs/plan-service';
import { PlanDAO, PlanDTO } from '@/src/interfaces/PlanInterface';
import tokens from '@/src/utils/Token';
import Loading from '@/src/components/atoms/Loading';
import CustomButton from '@/src/components/atoms/CustomButton';
import AlertBox from '@/src/components/atoms/AlertBox';

interface Props {
    idPlan: number;
}

export default function PlanDetail({ idPlan }: Props) {
    const [plan, setPlan] = useState<PlanDAO | null>(null);
    const [formData, setFormData] = useState({
        codigo: '',
        nombre: '',
        activo: false,
    });

    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getPlanById(idPlan.toString())
            .then((res) => {
                if (res.data) {
                    setPlan(res.data);
                    setFormData({
                        codigo: res.data.codigo,
                        nombre: res.data.nombre,
                        activo: res.data.activo === 1,
                    });
                    setError(null);
                } else {
                    setError('No se encontró el plan');
                }
            })
            .catch(() => setError('Error al cargar los datos del plan'))
            .finally(() => setIsLoading(false));
    }, [idPlan]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setSuccess(false);

        const dataToSend: PlanDTO & { activo: number } = {
            codigo: formData.codigo,
            nombre: formData.nombre,
            activo: formData.activo ? 1 : 0,
        };

        try {
            await updatePlan(idPlan.toString(), dataToSend);
            setSuccess(true);
        } catch {
            setError('Error al actualizar el plan');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) return <Loading />;
    if (!plan) return <p className="text-white">Plan no encontrado.</p>;

    return (
        <div className={tokens.loginContainer}>
            <div className={tokens.loginCard}>
                <h1 className={`${tokens.pageTitle} text-center mb-4 text-white`}>
                    Editar Plan #{plan.id}
                </h1>

                {error && (
                    <AlertBox type="error" message={error} onClose={() => setError(null)} />
                )}
                {success && (
                    <AlertBox
                        type="success"
                        message="¡Plan actualizado con éxito!"
                        onClose={() => setSuccess(false)}
                    />
                )}

                <form onSubmit={handleSubmit}>
                    <div className={tokens.formGroup}>
                        <label className={tokens.label} htmlFor="codigo">
                            Código
                        </label>
                        <input
                            className={tokens.input}
                            type="text"
                            id="codigo"
                            name="codigo"
                            value={formData.codigo}
                            onChange={handleChange}
                            required
                        />
                    </div>

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