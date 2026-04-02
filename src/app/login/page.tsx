'use client'
import { signIn } from 'next-auth/react'
import React, { useState } from 'react'
import {ToastContainer, toast} from 'react-toastify'
import { useRouter } from 'next/navigation'

function Login() {
    const router = useRouter()
    const [inputstate, setState] = useState({
        email:'',
        password:''
    })

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const {name, value} = e.target
        setState((prev) => ({ 
            ...prev, [name] : value
        }))


    }

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const res = await signIn('credentials', {
                email: inputstate.email,
                password: inputstate.password,
                redirect: false
            })
            
            if(res?.error){
                toast.error(res.error)
            }else{
                router.push("/")

                toast.success("login sucessfully")


            }
        
            
            
        } catch (error) {
           
            console.log(error)
        }
    }


  return (
    <div className='flex w-full h-dvh justify-center items-center'>
    <ToastContainer />
        <form onSubmit={handleSubmit} className='flex flex-col border border-white w-96 h-96 gap-10 p-2 pt-10 rounded-2xl'>
            <input required name='email' onChange={handleInputChange} value={inputstate.email} className='p-2 border border-white rounded' type="email" placeholder='type your email' />
            <input required name='password' value={inputstate.password} onChange={handleInputChange} className='p-2 border border-white rounded' type="password" placeholder='type your password' />
            <button 
            type='button'
            className="text-blue-300 underline" onClick={() => router.push("/signup")} >register before login</button>
            <button type='submit' className='p-2 rounded-xl bg-blue-400 '>Submit</button>
        </form>
    </div>
  )
}

export default Login