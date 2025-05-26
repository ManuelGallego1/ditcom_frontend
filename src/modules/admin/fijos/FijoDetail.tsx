'use client';

import { useEffect, useState } from 'react';
import { getFijoById, updateFijo } from '@/src/libs/fijo-service';
import {
    FijoDAO,
    FijoUpdateDTO,
    TipoProducto,
    TotalAdicionales,
    TotalServicios,
    Estrato
} from '@/src/interfaces/FijoInterface';
import tokens from '@/src/utils/Token';
import Loading from '@/src/components/atoms/Loading';
import CustomButton from '@/src/components/atoms/CustomButton';
import AlertBox from '@/src/components/atoms/AlertBox';
import Field from '@/src/components/atoms/Field';
import SelectField from '@/src/components/atoms/SelectField';
import { useClienteByCC } from '@/src/hooks/useClienteByCC';
import CreateClienteModal from '@/src/components/molecules/modals/ModalCliente';
import { Estado } from '@/src/interfaces/FijoInterface';

interface Props {
    idFijo: number;
}

const estratoOptions = Object.values(Estrato);
const tipoProductoList = Object.values(TipoProducto);
const totalServiciosList = Object.values(TotalServicios);
const totalAdicionalesList = Object.values(TotalAdicionales);

export default function FijoDetail({ idFijo }: Props) {
    const [fijo, setFijo] = useState<FijoDAO | null>(null);

    const [formData, setFormData] = useState({
        fecha_instalacion: '',
        fecha_legalizacion: '',
        servicios_adicionales: '',
        estrato: Estrato.NR,
        cuenta: 0,
        OT: 0,
        tipo_producto: TipoProducto.RESIDENCIAL,
        total_servicios: TotalServicios.CERO,
        total_adicionales: TotalAdicionales.CERO,
        convergente: '',
        ciudad: '',
        cliente_cc: '',
        estado: Estado.DIGITADO,
    });

    const {
        cliente,
        existe,
        loading: loadingCliente,
        error: errorCliente,
        buscarCliente
    } = useClienteByCC();

    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);


    useEffect(() => {
        setIsLoading(true);
        getFijoById(idFijo.toString())
            .then((res) => {
                if (res.data) {
                    setFijo(res.data);
                    setFormData({
                        fecha_instalacion: res.data.fecha_instalacion || '',
                        fecha_legalizacion: res.data.fecha_legalizacion || '',
                        servicios_adicionales: res.data.servicios_adicionales || '',
                        estrato: res.data.estrato || Estrato.NR,
                        cuenta: res.data.cuenta || 0,
                        OT: res.data.OT || 0,
                        tipo_producto: res.data.tipo_producto || TipoProducto.RESIDENCIAL,
                        total_servicios: res.data.total_servicios || TotalServicios.CERO,
                        total_adicionales: res.data.total_adicionales || TotalAdicionales.CERO,
                        convergente: res.data.convergente || '',
                        ciudad: res.data.ciudad || '',
                        cliente_cc: res.data.cliente_cc || '',
                        estado: res.data.estado || Estado.DIGITADO,
                    });
                    setError(null);
                } else {
                    setError('No se encontró el registro fijo');
                }
            })
            .catch(() => setError('Error al cargar los datos del fijo'))
            .finally(() => setIsLoading(false));
    }, [idFijo]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const numericFields = ['cuenta', 'OT'];

        const newValue = numericFields.includes(name) && value !== ''
            ? Number(value)
            : value;

        setFormData((prev) => ({
            ...prev,
            [name]: newValue
        }));

        console.log(`Cambio: ${name} = ${newValue} (${typeof newValue})`);
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setSuccess(false);

        const dataToSend: FijoUpdateDTO = {
            id: idFijo,
            ...formData
        };

        try {
            await updateFijo(idFijo.toString(), dataToSend);
            setSuccess(true);
        } catch {
            setError('Error al actualizar el registro fijo');
        } finally {
            setIsSubmitting(false);
        }
    };

    const [modalOpen, setModalOpen] = useState(false);

    const handleClienteCheck = async () => {
        const cc = formData.cliente_cc;
        if (!cc) return;
        await buscarCliente(cc);

        if (existe === false) {
            setModalOpen(true);
        }
    };


    if (isLoading) return <Loading />;
    if (!fijo) return <p className="text-white">Registro fijo no encontrado.</p>;

    return (
        <div className={tokens.detailContainer}>
            <div className={tokens.loginCard}>
                <h1 className={`${tokens.pageTitle} text-center mb-4 text-white`}>
                    Editar Fijo #{fijo.id}
                </h1>

                {error && <AlertBox type="error" message={error} onClose={() => setError(null)} />}
                {success && (
                    <AlertBox
                        type="success"
                        message="¡Registro fijo actualizado con éxito!"
                        onClose={() => setSuccess(false)}
                    />
                )}

                <form onSubmit={handleSubmit}>
                    <Field
                        label="Fecha Instalación"
                        name="fecha_instalacion"
                        type="date"
                        value={formData.fecha_instalacion}
                        onChange={handleChange}
                        required={true}
                    />
                    <Field
                        label="Fecha Legalización"
                        name="fecha_legalizacion"
                        type="date"
                        value={formData.fecha_legalizacion}
                        onChange={handleChange}
                        required={true}
                    />

                    <Field
                        label="Servicios Adicionales"
                        name="servicios_adicionales"
                        value={formData.servicios_adicionales}
                        onChange={handleChange}
                    />

                    <SelectField
                        label="Estrato"
                        name="estrato"
                        value={formData.estrato}
                        options={estratoOptions}
                        onChange={handleChange}
                    />

                    <Field
                        label="Cuenta"
                        name="cuenta"
                        type="number"
                        value={formData.cuenta}
                        onChange={handleChange}
                        required={true}
                    />

                    <SelectField
                        label="Estado"
                        name="estado"
                        value={formData.estado}
                        options={Object.values(Estado)}
                        onChange={handleChange}
                    />

                    <div className={tokens.formGroup}>
                        <label className={tokens.formLabel}>Cliente CC</label>
                        <div className="flex gap-2 items-center">
                            <input
                                name="cliente_cc"
                                value={formData.cliente_cc}
                                onChange={handleChange}
                                className={tokens.input}
                            />
                            <CustomButton
                                text={
                                    cliente?.cc
                                        ? 'Asignado'
                                        : existe === false
                                            ? 'Crear'
                                            : 'Buscar'
                                }
                                color="primaryButton"
                                typeButton="button"
                                onClickButton={handleClienteCheck}
                            />
                            {loadingCliente && <Loading />}
                        </div>

                        {existe === false && !loadingCliente && (
                            <p className="mt-2 font-bold">Cliente no encontrado. Puede crearlo.</p>
                        )}
                    </div>


                    <Field
                        label="OT"
                        name="OT"
                        type="number"
                        value={formData.OT}
                        onChange={handleChange}
                        required={true}
                    />

                    <SelectField
                        label="Tipo Producto"
                        name="tipo_producto"
                        value={formData.tipo_producto}
                        options={tipoProductoList}
                        onChange={handleChange}
                    />

                    <SelectField
                        label="Total Servicios"
                        name="total_servicios"
                        value={formData.total_servicios}
                        options={totalServiciosList}
                        onChange={handleChange}
                    />

                    <SelectField
                        label="Total Adicionales"
                        name="total_adicionales"
                        value={formData.total_adicionales}
                        options={totalAdicionalesList}
                        onChange={handleChange}
                    />

                    <Field
                        label="Convergente"
                        name="convergente"
                        value={formData.convergente}
                        onChange={handleChange}
                    />

                    <Field
                        label="Ciudad"
                        name="ciudad"
                        value={formData.ciudad}
                        onChange={handleChange}
                    />

                    <CustomButton
                        text={isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
                        color="primaryButton"
                        typeButton="submit"
                    />
                </form>
            </div>
            {modalOpen && (
                <CreateClienteModal
                    ccInicial={formData.cliente_cc}
                    onClose={() => setModalOpen(false)}
                    onClienteCreado={() => {
                        setModalOpen(false);
                        buscarCliente(formData.cliente_cc);
                    }}
                />
            )}
        </div>

    );
}
