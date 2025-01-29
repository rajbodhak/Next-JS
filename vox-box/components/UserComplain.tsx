import { client } from '@/sanity/lib/client'
import { COMPLAIN_BY_AUTHOR_QUERY } from '@/sanity/lib/queries'
import React from 'react'
import ComplainCard, { ComplainCardType } from './ComplainCard'

const UserComplain = async ({ id }: { id: string }) => {
    const complains = await client.fetch(COMPLAIN_BY_AUTHOR_QUERY, { id })
    return (
        <>
            {complains.length > 0 ? (
                complains.map((complain: ComplainCardType) => (
                    <ComplainCard key={complain._id} post={complain} />
                ))
            ) : (
                <p className="no-result">No posts yet</p>
            )}
        </>
    );
}

export default UserComplain
