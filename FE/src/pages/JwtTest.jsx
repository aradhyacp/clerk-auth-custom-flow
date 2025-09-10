import React, { useState } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { Button } from '@/components/ui/button';



const JwtTest = () => {
    const [userData, setUserdata] = useState("")
    const [adminData, setAdmindata] = useState("")
    const { getToken } = useAuth();
    
    
    const jwtHandlerForUser = async () => {
        const token = await getToken();
        const res = await fetch("http://localhost:3000/api/user/jwttest", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await res.json()
  setUserdata(json.message)
  console.log(res);
  
console.log(json);

    }

    const jwtHandlerForAdmin = async () => {
        const token = await getToken();
        const res = await fetch("http://localhost:3000/api/admin/jwttest", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await res.json()
  setAdmindata(json.message)
  console.log(res);
  
console.log(json);

    }
  return (
    <div className='flex flex-row justify-evenly mt-10'>
        <div className="">
            <Button onClick={jwtHandlerForUser}>Click to call user api here</Button>
        <div className="">user data : {userData}</div>
        </div>
        
        <div className="">
            <Button onClick={jwtHandlerForAdmin}>Click to call admin api here</Button>
        <div className="">admin data : {adminData}</div>
    </div>
        </div>
        
  )
}

export default JwtTest