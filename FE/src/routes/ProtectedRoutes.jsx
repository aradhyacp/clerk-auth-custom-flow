import React from 'react'
import { useAuth } from '@clerk/clerk-react'
import { Outlet, Navigate } from 'react-router-dom'

const ProtectedRoutes = () => {
    const { isSignedIn } = useAuth()
    console.log(isSignedIn);
    

  return (
    isSignedIn?<Outlet/>:<Navigate to="/login"/>
  )
}

export default ProtectedRoutes