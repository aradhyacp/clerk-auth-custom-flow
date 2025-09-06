import { useState } from 'react'
import './App.css'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import AppRoutes from './routes/AppRoutes';


function App() {

  return (
    <AppRoutes/>
  )
}

export default App
