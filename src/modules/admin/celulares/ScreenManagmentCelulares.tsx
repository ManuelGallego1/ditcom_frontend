import React from 'react'
import TableCelulares from '@/src/components/organism/tables/TableCelulares'
import tokens from '@/src/utils/Token'
import FormCelular from '@/src/components/molecules/forms/FormCelulares'

export default function ScreenManagmentUsers() {
    return (
        <div className={tokens.pageWrapper}>
            <h1 className={tokens.pageTitle}>Celulares</h1>
            <p className={tokens.pageSubtitle}>Manager de celulares</p>
            <div className={tokens.gridWrapper}>
                <div className={tokens.gridLeft}>
                    <FormCelular />
                </div>
                <div className={tokens.gridRight}>
                    <TableCelulares />
                </div>
            </div>
        </div>

    )
}
