import { auth } from '@/auth'
import StartUpForm from '@/components/ui/StartUpForm';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async () => {

    const session = await auth();
    if (!session) redirect("/")
    return (
        <>
            <section className='min-h-[28rem] w-full dark:bg-black bg-dark dark:bg-grid-white/[0.2] bg-grid-white/[0.2] relative flex flex-col items-center justify-center gap-7 p-8'>
                <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
                <h1 className='heading '>Submit Your Complain</h1>
            </section>

            <StartUpForm />
        </>
    )
}

export default page
