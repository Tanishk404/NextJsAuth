'use client'
import React from 'react'
import { signOut } from "next-auth/react";
import Image from "next/image";

function Button() {
  return (
    <div>
        <button className="bg-blue-400 p-2 rounded-xl cursor-pointer" onClick={() => signOut({callbackUrl: '/login'})}>Sign out</button>
    </div>
  )
}

export default Button