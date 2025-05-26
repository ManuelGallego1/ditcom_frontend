import React from 'react'
import TableSedes from '@/src/components/organism/tables/TableSedes'
import tokens from '@/src/utils/Token'
import FormSedes from '@/src/components/molecules/forms/FormSedes'

export default function ScreenManagmentUsers() {
    return (
        <div className={tokens.pageWrapper}>
            <h1 className={tokens.pageTitle}>Sedes</h1>
            <p className={tokens.pageSubtitle}>Manager de sedes</p>
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
