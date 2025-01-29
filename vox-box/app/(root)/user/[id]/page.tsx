import { auth } from '@/auth';
import { client } from '@/sanity/lib/client';
import { AUTHOR_BY_ID_QUERY } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Suspense } from 'react';
import { ComplainCardSkeleton } from '@/components/ComplainCard';
import UserComplain from '@/components/UserComplain';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id;
    const session = await auth();

    const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });
    console.log(user)
    if (!user) return notFound();

    return (
        <>
            <section className="profile_container">
                <div className="profile_card">
                    <div className="profile_title">
                        <h3 className="text-24-black uppercase text-center line-clamp-1">
                            {user.name}
                        </h3>
                    </div>

                    <Image
                        src={user.image}
                        alt={user.name}
                        width={220}
                        height={220}
                        className="profile_image"
                    />

                    <p className="text-30-extrabold mt-7 text-center">
                        {user?.name}
                    </p>
                </div>

                <div className="flex-1 flex flex-col gap-5 lg:-mt-5">
                    <p className="text-30-bold">
                        {session?.id === id ? "Your" : "All"} Complains
                    </p>
                    <ul className="card_grid-sm">
                        <Suspense fallback={<ComplainCardSkeleton />}>
                            <UserComplain id={id} />
                        </Suspense>
                    </ul>
                </div>
            </section>
        </>
    )
}

export default page
