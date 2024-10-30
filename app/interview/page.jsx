'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { LoaderCircle } from 'lucide-react';

const page = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/dashboard")
  }, [])
  return (
    <div className='h-screen flex items-center justify-center'>
      <LoaderCircle className='animate-spin' />
    </div>
  )
}

export default page
