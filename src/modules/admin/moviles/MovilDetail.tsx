'use client';

import { useEffect, useState } from 'react';
import { getMovilById, updateMovil } from '@/src/libs/movil-service';
import {
    MovilDAO,
    MovilUpdateDTO,
    TipoMovil,
    TipoProducto,
    Financiera,
    Estado
} from '@/src/interfaces/MovilInterface';
import tokens from '@/src/utils/Token';
import Loading from '@/src/components/atoms/Loading';
import CustomButton from '@/src/components/atoms/CustomButton';
import AlertBox from '@/src/components/atoms/AlertBox';
import Field from '@/src/components/atoms/Field';
import SelectField from '@/src/components/atoms/SelectField';
import { useClienteByCC } from '@/src/hooks/useClienteByCC';
import CreateClienteModal from '@/src/components/molecules/modals/ModalCliente';
import { useMarcasCelulares } from '@/src/hooks/useMarcasCelulares';
import { useModelosByMarca } from '@/src/hooks/useModelosByMarca';
import { usePlanes } from '@/src/hooks/usePlanes';
import Cookies from 'js-cookie';

interface Props {
    idMovil: number;
}

const tipoMovilList = Object.values(TipoMovil);
const tipoProductoList = Object.values(TipoProducto);
const financieraList = Object.values(Financiera);
const estadoList = Object.values(Estado);

export default function MovilDetail({ idMovil }: Props) {
    const [movil, setMovil] = useState<MovilDAO | null>(null);
    const [formData, setFormData] = useState({
        min: '',
        imei: '',
        iccid: '',
        tipo: TipoMovil.KIT_PREPAGO,
        plan_id: 0,
        celulares_id: 0,
        cliente_cc: '',
        tipo_producto: TipoProducto.RESIDENCIAL,
        factura: '',
        ingreso_caja: '',
        valor_total: 0,
        valor_recarga: null as number | null,
        financiera: Financiera.NA,
        vendedor_id: 0,
        estado: Estado.PENDIENTE,
    });

    const { marcas } = useMarcasCelulares();
    const [selectedMarca, setSelectedMarca] = useState<string | null>(null);
    const { modelos } = useModelosByMarca(selectedMarca);
    const { planes } = usePlanes();

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
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getMovilById(idMovil.toString())
            .then((res) => {
                if (res.data) {
                    const data = res.data;
                    setMovil(data);
                    setFormData({
                        min: data.min || '',
                        imei: data.imei || '',
                        iccid: data.iccid || '',
                        tipo: data.tipo || TipoMovil.KIT_PREPAGO,
                        plan_id: data.plan_id || 0,
                        celulares_id: data.celulares_id || 0,
                        cliente_cc: data.cliente_cc || '',
                        tipo_producto: data.tipo_producto || TipoProducto.RESIDENCIAL,
                        factura: data.factura || '',
                        ingreso_caja: data.ingreso_caja || '',
                        valor_total: data.valor_total || 0,
                        valor_recarga: data.valor_recarga ?? null,
                        financiera: data.financiera || Financiera.NA,
                        vendedor_id: data.vendedor_id || getVendedorIdFromCookie(),
                        estado: data.estado || Estado.PENDIENTE,
                    });
                    setSelectedMarca(data.celular.marca || null);
                    setError(null);
                } else {
                    setError('No se encontró el registro móvil');
                }
            })
            .catch(() => setError('Error al cargar los datos del móvil'))
            .finally(() => setIsLoading(false));
    }, [idMovil]);

    function getVendedorIdFromCookie() {
        const userCookie = Cookies.get('user');
        return userCookie ? JSON.parse(userCookie).id ?? 0 : 0;
    }

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        const numericFields = [
            'plan_id',
            'celulares_id',
            'valor_total',
            'valor_recarga',
            'vendedor_id'
        ];
        let newValue: any = value;
        if (numericFields.includes(name)) {
            newValue = value === '' ? '' : Number(value);
            if (name === 'valor_recarga' && value === '') {
                newValue = null;
            }
        }
        if (name === 'marca') {
            setSelectedMarca(value);
            setFormData((prev) => ({
                ...prev,
                celulares_id: 0
            }));
            return;
        }
        setFormData((prev) => ({
            ...prev,
            [name]: newValue
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setSuccess(false);

        const dataToSend: MovilUpdateDTO = {
            id: idMovil,
            ...formData
        };

        try {
            await updateMovil(idMovil.toString(), dataToSend);
            setSuccess(true);
        } catch {
            setError('Error al actualizar el registro móvil');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClienteCheck = async () => {
        const cc = formData.cliente_cc;
        if (!cc) return;
        await buscarCliente(cc);
        if (existe === false) {
            setModalOpen(true);
        }
    };

    if (isLoading) return <Loading />;
    if (!movil) return <p className="text-white">Registro móvil no encontrado.</p>;

    return (
        <div className={tokens.detailContainer}>
            <div className={tokens.loginCard}>
                <h1 className={`${tokens.pageTitle} text-center mb-4 text-white`}>
                    Editar Móvil #{movil.id}
                </h1>

                {error && <AlertBox type="error" message={error} onClose={() => setError(null)} />}
                {success && (
                    <AlertBox
                        type="success"
                        message="¡Registro móvil actualizado con éxito!"
                        onClose={() => setSuccess(false)}
                    />
                )}

                <form onSubmit={handleSubmit}>
                    <Field label="MIN" name="min" value={formData.min} onChange={handleChange} required />
                    <Field label="IMEI" name="imei" value={formData.imei} onChange={handleChange} required />
                    <Field label="ICCID" name="iccid" value={formData.iccid} onChange={handleChange} required />

                    <SelectField label="Tipo" name="tipo" value={formData.tipo} options={tipoMovilList} onChange={handleChange} />

                    <SelectField
                        label="Plan"
                        name="plan_id"
                        value={formData.plan_id}
                        options={planes.map(p => ({ label: `${p.codigo} ${p.nombre}`, value: p.id }))}
                        onChange={handleChange}
                    />

                    <div className={tokens.formGroup}>
                        <label className={tokens.formLabel}>Marca</label>
                        <select
                            className={tokens.input}
                            name="marca"
                            onChange={handleChange}
                            value={selectedMarca ?? ''}
                        >
                            <option value="">Seleccione una opción</option>
                            {marcas.map((marca, i) => (
                                <option key={i} value={marca}>{marca}</option>
                            ))}
                        </select>
                    </div>

                    <SelectField
                        label="Modelo"
                        name="celulares_id"
                        value={formData.celulares_id}
                        options={modelos.map(m => ({ label: m.modelo, value: m.id }))}
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
                                text={cliente?.cc ? 'Asignado' : existe === false ? 'Crear' : 'Buscar'}
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

                    <Field label="Factura" name="factura" value={formData.factura} onChange={handleChange} />
                    <Field label="Ingreso Caja" name="ingreso_caja" value={formData.ingreso_caja} onChange={handleChange} />
                    <Field label="Valor Total" name="valor_total" type="number" value={formData.valor_total} onChange={handleChange} required />
                    <Field label="Valor Recarga" name="valor_recarga" type="number" value={formData.valor_recarga ?? ''} onChange={handleChange} />

                    <SelectField label="Tipo de Producto" name="tipo_producto" value={formData.tipo_producto} options={tipoProductoList} onChange={handleChange} />
                    <SelectField label="Financiera" name="financiera" value={formData.financiera} options={financieraList} onChange={handleChange} />
                    <SelectField label="Estado" name="estado" value={formData.estado} options={estadoList} onChange={handleChange} />

                    <CustomButton text={isSubmitting ? 'Guardando...' : 'Guardar Cambios'} color="primaryButton" typeButton="submit" />
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
