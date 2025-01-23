import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { auth, signOut, signIn } from '@/auth'

const Navbar = async () => {
    const session = await auth();
    return (
        <header className='px-5 py-3 shadow-sm font-work-sans'>
            <nav className='flex items-center justify-between'>
                <Link href={"/"}>
                    <Image src={"/logo.png"} alt='Logo' width={40} height={40} />
                </Link>

                <div className='flex items-center gap-5'>
                    {session && session?.user ? (
                        <>
                            <Link href={"/complain/create/"}>
                                <span>Create</span>
                            </Link>

                            <form action={async () => {
                                "use server";
                                await signOut();
                            }}>
                                <button type='submit'>
                                    Logout
                                </button>
                            </form>

                            <Link href={`/users/${session?.id}`}>
                                <span>{session?.user?.name}</span>
                            </Link>
                        </>
                    ) : (
                        <form action={async () => {
                            "use server";
                            await signIn();
                        }}>
                            <button type='submit'>
                                Login
                            </button>
                        </form>
                    )}
                </div>
            </nav>
        </header >
    )
}

export default Navbar
