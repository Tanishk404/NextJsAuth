'use client'

import React from 'react'
import {useState} from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
function SignUp() {
   const [inputstate, setState] = useState({
          name: '',
          email:'',
          password:''
      })
      
    const router = useRouter()
      const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
          const {name, value} = e.target
          setState((prev) => ({ 
              ...prev, [name] : value
          }))
  
  
      }
  
      const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
          e.preventDefault()
          try {
              const res = await fetch("/api/auth/register", {
                method: "Post",
                headers: {
                    "Content_Type": "application/json"
                },
                body: JSON.stringify(inputstate)
              })
              

              let data = await res.json()
              if(data.status === 202){
                  toast.success(data.message)
                  router.push("/login")

              }else{
                 toast.error(data.message)

              }
              
              
          } catch (error) {
             
              console.log(error)
          }
      }
  
  
    return (
      <div className='flex w-full h-dvh justify-center items-center'>
      <ToastContainer />
          <form onSubmit={handleSubmit} className='flex flex-col border border-white w-96 h-96 gap-10 p-2 pt-10 rounded-2xl'>
              <input required name='name' onChange={handleInputChange} value={inputstate.name} className='p-2 border border-white rounded' type="text" placeholder='type your name' />
              <input required name='email' onChange={handleInputChange} value={inputstate.email} className='p-2 border border-white rounded' type="email" placeholder='type your email' />
              <input required name='password' value={inputstate.password} onChange={handleInputChange} className='p-2 border border-white rounded' type="password" placeholder='type your password' />
            <Link href={'/login'} className='underline text-blue-300 h-2 text-center' >already have a account </Link>
              <button type='submit' className='p-2 rounded-xl bg-blue-400 '>Submit</button>
          </form>
      </div>
    )
  }

export default SignUp