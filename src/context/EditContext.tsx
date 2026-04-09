'use client'
import React, { useState, createContext, ReactNode, useEffect } from 'react'
export const  HereIsTheEditContext = createContext<any | undefined>(undefined) 

function EditContext
({children}: {children: ReactNode}) {
  const [isloading, setIsloading] = useState<boolean>(false)
  const [GetEdit, setGetEdit] = useState<any | undefined>()
useEffect(() => {
  const GetData =  async () => {
    setIsloading(true)
    try{

      const res = await fetch('api/edit', {
        method: "GET",
      
      })
      const data = await res.json();
      const parseData = data.userExist
      setGetEdit(parseData)

    }catch (error){
      console.log(error)
    }finally{
      setIsloading(false)
    }
  }
  GetData()
}, []) 


  return (
    
    <HereIsTheEditContext.Provider value={{ GetEdit, setGetEdit, isloading, setIsloading}}>
        {children}
    </HereIsTheEditContext.Provider>
    
  )
}

export default EditContext