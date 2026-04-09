'use client'
import Image from 'next/image'
import React, { useEffect, useState, useRef, useContext } from 'react'
import { useSession } from 'next-auth/react'
import { BiCamera } from 'react-icons/bi'
import { HereIsTheEditContext } from '@/context/EditContext'
import { useRouter } from 'next/navigation'


function Edit() {
    const {GetEdit, setGetEdit, isloading, setIsloading} = useContext<any>(HereIsTheEditContext)
    const [preview, setPreview] = useState<any>(null)
    const Imgref = useRef<HTMLInputElement>(null)
    const session = useSession()
    const data = session?.data?.user;
    const [inputName, setInputName] = useState<string>('')
    const [imgval, setImg] = useState('')

  

const { update } = useSession()

    const router = useRouter()
   
    useEffect(() => {
                if (data?.image) {
                setPreview(data?.image)
                }
    }, [data])
            
    const HandleClick = () => {
      if(Imgref.current){
        Imgref.current.click()
      }
    }
    

    const selectFile = (e:React.ChangeEvent<HTMLInputElement>) => {
          const file:any = e?.target?.files?.[0] ;
          if(!file) return 
          setImg(file)
          const url = URL.createObjectURL(file)
          if(!url) return
          setPreview(url)
          setGetEdit((prev:any) => ({
            ...prev,
            image: url
          }))      
        }

    const HandleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsloading(true)
        try {
            const formdata = new FormData()
            if(inputName) {
                formdata.append('name', inputName)
            }
            if(imgval) {
                formdata.append('image', imgval)
            }
            const res = await  fetch('/api/edit', {
                method: 'PUT',
                body: formdata
            })
            const data = await res.json() 
            setGetEdit(data.userCheck)
        router.push('/')
        } catch (error) {
            console.log(error)
        }finally{
            setIsloading(false)
        }

          
        }

  return (
    <div className={`flex justify-center align-middle  h-dvh items-center absolute w-full top-0 left-0`}>

    <div className="" >
    <form onSubmit={HandleSubmit} className="border border-white w-96 h-96 rounded-2xl flex justify-center bg-black items-center flex-col gap-10 relative p-4">
        <input ref={Imgref} hidden type="file" name='image'
        className='' onChange={selectFile} />

    <div className='relative rounded-full' onClick={HandleClick}>
        <BiCamera className='text-2xl absolute bottom-0 right-0 bg-amber-100 text-black rounded-2xl cursor-pointer' />
        <Image 
        loading="eager"
        className='rounded-full border-2 hover:border-blue-300 border-white cursor-pointer w-28 h-28 object-cover' alt='image' width={100} height={100} 
        src={GetEdit?.image || `https://ui-avatars.com/api/?name=${GetEdit?.name?.charAt(0) || 'U'}& background=0D8ABC&color=000`}
        /> 
    </div>

      <p>Login email:  {data?.email}</p>

      <input type="text" name='name' value={inputName || GetEdit?.name || ''}  className='bg-[#2e2e2e] p-2 rounded-md w-full border' onChange={(e) => (setInputName(e.target.value))}/>

        <div className='flex gap-10'>

            <button type='submit' className='bg-[#2e2e2e] hover:bg-[#1e1e1e] p-2 cursor-pointer rounded-2xl '>Save</button>

            <button type='button' className='border p-2 rounded-2xl hover:bg-[#2f2f2f] cursor-pointer' onClick={() => (router.push('/'))}>Cancel</button>

        </div>
    </form>
      </div>
    </div>
  )
}

export default Edit