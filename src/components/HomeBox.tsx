'use client'
import React from 'react'
import Button from './Button'
import { useSession } from 'next-auth/react'

function HomeBox() {
    const session = useSession()
    const data = session?.data?.user;
    console.log(data)
  return (
    <div className="flex justify-center align-middle bg-black h-dvh items-center">
      <div className="border border-white w-96 h-96 rounded-2xl flex justify-center items-center flex-col gap-10">

      <h1 className="text-2xl rounded-full border border-white h-28 w-28 text-center p-6">Home</h1>
      <p>Login email:  {data?.email}</p>
      <p>{data?.name}</p>
      <Button />
      </div>
    </div>
  )
}

export default HomeBox