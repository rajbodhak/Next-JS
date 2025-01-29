import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { auth, signOut, signIn } from '@/auth'
import { BadgePlus, LogOut } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const Navbar = async () => {
    const session = await auth();
    return (
        <header className='px-5 py-3 w-full font-work-sans fixed top-10 inset-x-0 max-w-3xl mx-auto z-50 bg-black/70 rounded-full bg-opacity-45 bg-clip-padding backdrop-filter backdrop-blur-sm shadow-2xl'>
            <nav className='top-2 flex items-center justify-between'>
                <Link href={"/"}>
                    <Image src={"/logo.png"} alt='Logo' width={40} height={40} />
                </Link>

                <div className='flex items-center gap-5'>
                    {session && session?.user ? (
                        <>
                            <Link href={"/complain/create/"}>
                                <span className='max-sm:hidden'>Create</span>
                                <BadgePlus className='size-6 sm:hidden text-white/90' />
                            </Link>

                            <form action={async () => {
                                "use server";
                                await signOut();
                            }}>
                                <button type='submit'>
                                    <span className="max-sm:hidden">Logout</span>
                                    <LogOut className='size-6 sm:hidden text-white/90 mt-1' />
                                </button>
                            </form>

                            <Link href={`/user/${session?.id}`}>
                                <Avatar className='size-10'>
                                    <AvatarImage src={session?.user?.image || ''} alt={session?.user?.name || ''} />
                                    <AvatarFallback>AV</AvatarFallback>
                                </Avatar>
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
