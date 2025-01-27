import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { COMPLAIN_BY_ID_QUERY } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import markdownit from "markdown-it";
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/app/components/View';

export const experimental_ppr = true;
const page = async ({ params }: { params: Promise<{ id: string }> }) => {

    const id = (await params).id;
    const post = await client.fetch(COMPLAIN_BY_ID_QUERY, { id });
    const md = markdownit();
    const parsedContent = md.render(post?.pitch || "");

    if (!post) return notFound();
    return (
        <>
            <section className="min-h-[35rem] w-full dark:bg-black bg-dark dark:bg-grid-white/[0.2] bg-grid-white/[0.2] relative flex flex-col items-center justify-center gap-7 p-8">
                <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
                <p className='tag'>{formatDate(post?._createdAt)}</p>
                <h1 className='heading'>{post?.title}</h1>
                <p className='sub-heading'>{post?.description}</p>
            </section>

            <section className='px-10 py-14 max-w-7xl mx-auto'>
                <img src={post?.image ?? '/default-thumbnail.png'} alt="thumbnail" className='w-full h-auto rounded-xl' />
                <div className='space-y-5 mt-10 max-w-4xl mx-auto'>
                    <div className='flex-between gap-5'>
                        <Link href={`/user/${post.author?._id}`} className='flex gap-2 items-center mb-3'>
                            <div className="w-16 h-16 rounded-full overflow-hidden drop-shadow-lg">
                                <Image
                                    src={post?.author?.image ?? '/default-avatar.png'}
                                    alt="avatar"
                                    width={64}
                                    height={64}
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <p className='text-20-medium'>{post?.author?.name}</p>
                            </div>
                        </Link>
                        <p className='category-tag'>{post.category}</p>
                    </div>

                    <h3 className='text-30-bold'>Pitch Details</h3>
                    {parsedContent ? (
                        <article
                            className='porse max-w-4xl font-work-sans break-all'
                            dangerouslySetInnerHTML={
                                { __html: parsedContent }
                            } />
                    ) : (
                        <p className='no-result'>No details Provided</p>
                    )}
                </div>
                <hr className='my-4 divider' />

                <Suspense fallback={<Skeleton className='view-skeleton' />}>
                    <View id={id} />
                </Suspense>
            </section>
        </>
    )
}

export default page
