import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import React from 'react'
import { Link } from 'react-router-dom'

const Root = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10 bg-background">
    <Card className="w-full max-w-sm md:max-w-3xl flex flex-col items-center p-10">
      <div className="">Welcome to Clerk Auth test for custom flow</div>
      <Button><Link to="/signup">Go to sign up / register</Link></Button>
      <Button><Link to="/login">Go to Login</Link></Button>
    </Card>
    </div>
  )
}

export default Root