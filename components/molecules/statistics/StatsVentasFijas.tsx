'use client';

import { useEffect, useState } from 'react';
import { getFijosStatistics } from '@/libs/estadistica-service';
import { VentasProductos } from '@/interfaces/EstadisticaInterface';
import tokens from '@/utils/Token';
import { CustomIcons } from '@/utils/Icons';

interface CardTotalFijosProps {
    vendedor_id?: number;
    coordinador_id?: number;
    ventas_pyme?: boolean;
}

export default function CardTotalFijos({ vendedor_id, coordinador_id, ventas_pyme }: CardTotalFijosProps) {
    const [totalFijos, setTotalFijos] = useState<number | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res: VentasProductos = await getFijosStatistics({ vendedor_id, coordinador_id, ventas_pyme });
                if (res) {
                    setTotalFijos(res.total);
                } else {
                    setTotalFijos(0);
                }
            } catch (error) {
                setTotalFijos(0);
            }
        };

        fetchData();
    }, [vendedor_id]);

    return (
        <div className={tokens.formCardWrapper}>
            <h2 className={tokens.formTitle}>Total Ventas Fijo</h2>
            <div className="flex items-center gap-2">
                <CustomIcons.stonks className="w-8 h-8 text-primary" />
                <p className="text-3xl font-bold text-primary">
                    {totalFijos !== null ? totalFijos : 'Cargando...'}
                </p>
            </div>
        </div>
    );
}
