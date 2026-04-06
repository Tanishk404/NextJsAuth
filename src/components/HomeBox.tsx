'use client'
import React from 'react'
import Button from './Button'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

function HomeBox() {
    const session = useSession()
    const data = session?.data?.user;
    console.log(data)
  return (
    <div className="flex justify-center align-middle bg-black h-dvh items-center">
      <div className="border border-white w-96 h-96 rounded-2xl flex justify-center items-center flex-col gap-10">

        

   
        <Image className='rounded-full' alt='image' width={100} height={100} src={data?.image || `https://ui-avatars.com/api/?name=${data?.name?.charAt(0)}& background=0D8ABC&color=000`} /> 
        

      <p>Login email:  {data?.email}</p>
      <p>{data?.name}</p>
      <Button />
      </div>
    </div>
  )
}

export default HomeBox