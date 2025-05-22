import React from 'react'
import TableUsers from '@/components/organism/tables/TableUsers'
import tokens from '@/utils/Token'

export default function ScreenManagmentUsers() {
  return (
    <div className={tokens.pageWrapper}>
      <h1 className={tokens.pageTitle}>Usuarios</h1>
      <p className={tokens.pageSubtitle}>Manager de usuarios</p>
      <div className={tokens.gridWrapper}>
        <div className={tokens.gridLeft}>
          {/* Aquí podrías agregar futuros filtros, etc. */}
        </div>
        <div className={tokens.gridRight}>
          <TableUsers />
        </div>
      </div>
    </div>

  )
}
