import React from 'react'
import TableCelulares from '@/components/organism/tables/TableCelulares'
import tokens from '@/utils/Token'

export default function ScreenManagmentUsers() {
    return (
        <div className={tokens.pageWrapper}>
            <h1 className={tokens.pageTitle}>Celulares</h1>
            <p className={tokens.pageSubtitle}>Manager de celulares</p>
            <div className={tokens.gridWrapper}>
                <div className={tokens.gridLeft}>
                    {/* Aquí podrías agregar futuros filtros, etc. */}
                </div>
                <div className={tokens.gridRight}>
                    <TableCelulares />
                </div>
            </div>
        </div>

    )
}
