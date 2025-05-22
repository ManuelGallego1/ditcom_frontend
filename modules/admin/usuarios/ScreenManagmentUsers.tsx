import React from 'react'
import TableUsers from '@/components/organism/tables/TableUsers'
import FormUsers from '@/components/molecules/forms/FormUsers'

export default function ScreenManagmentUsers() {
  return (
    <div className='flex flex-col gap-6 p-6'>
      <h1 className='text-2xl font-bold text-red'>Usuarios</h1>
      <p className='text-base text-red'>Manager de usuarios</p>
      <div className='grid grid-cols-3 md:grid-cols-3 gap-6'>
        <div className='col-span-1 flex flex-col gap-2'>
          <FormUsers />
        </div>
        <div className='col-span-2 flex flex-col gap-2'>
          <TableUsers />
        </div>
      </div>
    </div>
  )
}
