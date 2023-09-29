import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useUser } from '../../context/LoggedInUserProvider'

export default function Auth() {
  const { user } = useUser()

  if (!user) return <Navigate to='/login' />

  return (
    <>
      <div className='container'>
        <Outlet />
      </div>
    </>
  )
}
