import React from 'react'
import TableUsers from '@/src/components/organism/tables/TableUsers'
import FormUsers from '@/src/components/molecules/forms/FormUsers'
import tokens from '@/src/utils/Token'

export default function ScreenManagmentUsers() {
  return (
    <div className={tokens.pageWrapper}>
      <h1 className={tokens.pageTitle}>Usuarios</h1>
      <p className={tokens.pageSubtitle}>Manager de usuarios</p>
      <div className={tokens.gridWrapper}>
        <div className={tokens.gridLeft}>
          <FormUsers />
        </div>
        <div className={tokens.gridRight}>
          <TableUsers />
        </div>
      </div>
    </div>

  )
}
