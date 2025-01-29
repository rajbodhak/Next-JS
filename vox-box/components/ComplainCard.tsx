import React from 'react'
import { cn, formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Author, Complain } from '@/sanity.types';
import { Skeleton } from './ui/skeleton';

export type ComplainCardType = Omit<Complain, "author"> & {
    author?: Author;
};

const ComplainCard = ({ post }: { post: ComplainCardType }) => {
    const { _id, _createdAt, author, views, title, description, category, image } = post;
    return (
        <li className='complain-card group'>
            <div className='flex-between'>
                <p className='complain-card_date'>
                    {formatDate(_createdAt)}
                </p>
                <div className='flex gap-1.5'>
                    <EyeIcon className='size-6 text-slate-300' />
                    <span className='text-16-medium'>{views}</span>
                </div>
            </div>
            <div className='flex-between mt-5 gap-5'>
                <div className='flex-1'>
                    <Link href={`/user/${author?._id}`}>
                        <p className='text-16-medium line-clamp-1'>{author?.name}</p>
                    </Link>
                    <Link href={`/complain/${_id}`}>
                        <h3 className='text-26-semibold line-clamp-1'>{title}</h3></Link>
                </div>
                <Link href={`/user/${author?._id}`}>
                    <Image src={author?.image!} alt={author?.name!} width={48} height={48} className="rounded-full" />
                </Link>
            </div>
            <Link href={`/complain/${_id}`}>
                <p className='complain-card_desc'>
                    {description}
                </p>
                {image ? (<img src={image} alt="complain-image" className="complain-card_img" />) : (<img src="https://media.istockphoto.com/id/676694048/vector/complaints-files-and-documents-in-cabinet-in-office-3d-rendered-illustration.jpg?s=612x612&w=0&k=20&c=hbudcUf3ug2JlE8j1UwzC1605PCGBEYpmu2I8t0XqLI=" alt="complain-image" className="complain-card_img" />)}
            </Link>

            <div className='flex-between gap-3 mt-5'>
                <p className='text-16-medium'>{category}</p>
                <Button className='complain-card_btn' asChild>
                    <Link href={`/complain/${_id}`}>
                        Details
                    </Link>
                </Button>
            </div>
        </li>
    )
}

export const ComplainCardSkeleton = () => (
    <>
        {[0, 1, 2, 3, 4].map((index: number) => (
            <li key={cn('skeleton', index)}>
                <Skeleton className='complain-card_skeleton' />
            </li>
        ))}
    </>
)

export default ComplainCard
