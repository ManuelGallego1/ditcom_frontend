'use client';

import { useEffect, useState } from 'react';
import { getMovilesStatistics } from '@/libs/estadistica-service';
import { VentasProductos } from '@/interfaces/EstadisticaInterface';
import tokens from '@/utils/Token';
import { CustomIcons } from '@/utils/Icons';

interface CardTotalMovilesProps {
    vendedor_id?: number;
    coordinador_id?: number;
    ventas_pyme?: boolean;
}

export default function CardTotalMoviles({ vendedor_id, coordinador_id, ventas_pyme }: CardTotalMovilesProps) {
    const [totalMoviles, setTotalMoviles] = useState<number | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res: VentasProductos = await getMovilesStatistics({ vendedor_id, coordinador_id, ventas_pyme });
                if (res) {
                    setTotalMoviles(res.total);
                } else {
                    setTotalMoviles(0);
                }
            } catch (error) {
                setTotalMoviles(0);
            }
        };

        fetchData();
    }, [vendedor_id, coordinador_id, ventas_pyme]);

    return (
        <div className={tokens.formCardWrapper}>
            <h2 className={tokens.formTitle}>Total Ventas Móvil</h2>
            <div className="flex items-center gap-2">
                <CustomIcons.stonks className="w-8 h-8 text-primary" />
                <p className="text-3xl font-bold text-primary">
                    {totalMoviles !== null ? totalMoviles : 'Cargando...'}
                </p>
            </div>
        </div>
    );
}
