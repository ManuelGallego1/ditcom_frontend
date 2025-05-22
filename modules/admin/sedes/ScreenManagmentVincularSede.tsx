import React from 'react'
import TableSedes from '@/components/organism/tables/TableAsesorSede'
import tokens from '@/utils/Token'
import FormSedes from '@/components/molecules/forms/FormAsignarSede'

export default function ScreenManagmentUsers() {
    return (
        <div className={tokens.pageWrapper}>
            <h1 className={tokens.pageTitle}>Vincular Sedes</h1>
            <p className={tokens.pageSubtitle}>Manager para vincular sedes</p>
            <div className={tokens.gridWrapper}>
                <div className={tokens.gridLeft}>
                    <FormSedes />
                </div>
                <div className={tokens.gridRight}>
                    <TableSedes />
                </div>
            </div>
        </div>

    )
}
