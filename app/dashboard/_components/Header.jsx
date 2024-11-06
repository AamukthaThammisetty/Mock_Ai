"use client"

import { UserButton, useUser } from '@clerk/nextjs'
import React, { useEffect } from 'react'
import Image from 'next/image'
import logo from "../../../public/logo.svg"
import { usePathname } from 'next/navigation'
import Link from "next/link"
import {Button} from '../../../components/ui/button'

function Header() {
    const { isSignedIn } = useUser();  // Get user state from Clerk
    const path = usePathname();
    // Get current path if needed (not used directly here)

    useEffect(() => {

        // You can add any side-effects here if needed
    }, [path]);

    return (
        <div className='flex p-4 items-center justify-between px-5'>
            <Link href={'/'} className="text-lg font-bold">Mock.ai</Link>

            {/* Render UserButton if user is signed in, otherwise show sign-in button */}
            {isSignedIn ? (
                <div className={"flex items-center justify-center gap-10"}>
                    <Link href={'/dashboard'}>dashboard</Link>
                        <UserButton/>
                </div>

            ) : (
                <Link href="/sign-in">
                    <Button className="">
                        Login
                    </Button>
                </Link>
            )}
        </div>
    )
}

export default Header
