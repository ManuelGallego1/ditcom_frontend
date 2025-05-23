'use client';

import { useEffect, useState } from 'react';
import { getCelularById, updateCelular } from '@/libs/celulares-service';
import { CelularDAO, CelularUpdateDTO } from '@/interfaces/CelularInterface';
import tokens from '@/utils/Token';

import Loading from '@/components/atoms/Loading';
import CustomButton from '@/components/atoms/CustomButton';
import AlertBox from '@/components/atoms/AlertBox';

interface Props {
  idCelular: number;
}

export default function CelularDetail({ idCelular }: Props) {
  const [celular, setCelular] = useState<CelularDAO | null>(null);
  const [formData, setFormData] = useState({
    marca: '',
    modelo: '',
    activo: false,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getCelularById(idCelular.toString())
      .then((res) => {
        if (res.data) {
          setCelular(res.data);
          setFormData({
            marca: res.data.marca,
            modelo: res.data.modelo,
            activo: res.data.activo === 1,
          });
          setError(null);
        } else {
          setError('No se encontró el celular');
        }
      })
      .catch(() => setError('Error al cargar los datos del celular'))
      .finally(() => setIsLoading(false));
  }, [idCelular]);

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

    const dataToSend: CelularUpdateDTO = {
      id: idCelular,
      marca: formData.marca,
      modelo: formData.modelo,
      activo: formData.activo ? 1 : 0,
    };

    try {
      await updateCelular(idCelular.toString(), dataToSend);
      setSuccess(true);
    } catch {
      setError('Error al actualizar el celular');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <Loading />;
  if (!celular) return <p className="text-white">Celular no encontrado.</p>;

  return (
    <div className={tokens.loginContainer}>
      <div className={tokens.loginCard}>
        <h1 className={`${tokens.pageTitle} text-center mb-4 text-white`}>
          Editar Celular #{celular.id}
        </h1>

        {error && (
          <AlertBox type="error" message={error} onClose={() => setError(null)} />
        )}
        {success && (
          <AlertBox
            type="success"
            message="¡Celular actualizado con éxito!"
            onClose={() => setSuccess(false)}
          />
        )}

        <form onSubmit={handleSubmit}>
          <div className={tokens.formGroup}>
            <label className={tokens.label} htmlFor="marca">
              Marca
            </label>
            <input
              className={tokens.input}
              type="text"
              id="marca"
              name="marca"
              value={formData.marca}
              onChange={handleChange}
              required
            />
          </div>

          <div className={tokens.formGroup}>
            <label className={tokens.label} htmlFor="modelo">
              Modelo
            </label>
            <input
              className={tokens.input}
              type="text"
              id="modelo"
              name="modelo"
              value={formData.modelo}
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
