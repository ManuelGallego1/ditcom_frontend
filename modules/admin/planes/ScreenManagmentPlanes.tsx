import React from 'react'
import TablePlanes from '@/components/organism/tables/TablePlanes'
import tokens from '@/utils/Token'

export default function ScreenManagmentUsers() {
    return (
        <div className={tokens.pageWrapper}>
            <h1 className={tokens.pageTitle}>Planes</h1>
            <p className={tokens.pageSubtitle}>Manager de planes</p>
            <div className={tokens.gridWrapper}>
                <div className={tokens.gridLeft}>
                    {/* Aquí podrías agregar futuros filtros, etc. */}
                </div>
                <div className={tokens.gridRight}>
                    <TablePlanes />
                </div>
            </div>
        </div>

    )
}
