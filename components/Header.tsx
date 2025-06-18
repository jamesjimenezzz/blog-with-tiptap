import React from 'react'
import Link from 'next/link'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

const Header = () => {
  return (
    <header className='flex justify-between items-center max-w-[1400px] mx-auto p-4'>
        <ul className='flex gap-4'>
            <li>
                <Link href="/">Home</Link>
            </li>
            <li>
                <Link href="/about">About</Link>
            </li>
            
        </ul>
        <ul className='flex gap-4'>
            <SignedOut>
                <SignInButton/>
            </SignedOut>
            <SignedIn>
                <UserButton/>
            </SignedIn>
        </ul>
    </header>
  )
}

export default Header