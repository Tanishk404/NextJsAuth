'use client'
import React, {  useState, useEffect, useContext } from 'react'
import Button from './Button'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { FaEdit } from "react-icons/fa";

import { HereIsTheEditContext } from '@/context/EditContext'
import { useRouter } from 'next/navigation'
import { Skeleton, Avatar } from '@mui/material'


function HomeBox() {
    const session = useSession()

    const {GetEdit, setGetEdit, isloading, setIsloading} = useContext<any>(HereIsTheEditContext)


    const router = useRouter()

    const data = session?.data?.user;
    
  return (
    <div className="flex justify-center align-middle bg-[#1e1e1e] h-dvh items-center">
      {
        isloading ?         <Skeleton
          height={384} // w-96 h-96 is 384px
          width={384}
          variant="rectangular"
          className="bg-gray-500 rounded-2xl relative flex justify-center items-center" 
        >
          
          <Skeleton
            variant="circular"
            width={112} // w-28 h-28 for Avatar
            height={112}
            sx={{ bgcolor: 'white' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" 
          />
        </Skeleton> :
      <div className="border border-white w-96 h-96 rounded-2xl flex justify-center items-center flex-col gap-10 relative">
        <button onClick={() => router.push('/edit')} className='p-2 cursor-pointer absolute right-0 top-0 mt-2' >
          <FaEdit className='text-end ' />
        </button>



   
        <Image 
        loading="eager"
        className='rounded-full border-2 hover:border-blue-300 border-white cursor-pointer w-28 h-28 object-cover' alt='image' width={100} height={100} 
         src={GetEdit?.image || `https://ui-avatars.com/api/?name=${data?.name?.charAt(0)}& background=0D8ABC&color=000`}
          /> 
        

      <p>Login email:  {data?.email}</p>
      <p>{GetEdit?.name}</p>

      <Button />

      
      </div>
      }

    </div>
  )
}

export default HomeBox