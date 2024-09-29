"use client"
import { UserButton } from '@clerk/nextjs'
import React, { useEffect } from 'react'
import Image from 'next/image'
import logo from "../../../public/logo.svg"
import { usePathname } from 'next/navigation'
function Header() {
  const path=usePathname();
  useEffect(()=>{
  
  },[])
  return (
    <div className='flex p-4 items-center justify-between bg-secondary shadow-sm'>
      <Image className='' src={logo} width={160} heigth={100} alt="logo"/>
      <ul className='gap-6 hidden md:flex '>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
          ${path=="/dashboard" && 'text-primary font-bold'} `}>Dashboard</li>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
          ${path=="/dashboard" && 'text-primary font-bold'} `}>Questions</li>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
          ${path=="/dashboard" && 'text-primary font-bold'} `}>Upgrade</li>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
          ${path=="/dashboard" && 'text-primary font-bold'} `}>How it works?</li>
      </ul>
      <UserButton/>
    </div>
  )
}

export default Header
