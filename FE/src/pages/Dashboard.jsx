import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import React from 'react'

const Dashboard = () => {
  return (
    <div>Dashboard
      <div className="">
        <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
      </div>
    </div>
  )
}

export default Dashboard