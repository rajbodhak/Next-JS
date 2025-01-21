import React from 'react';

const page = async ({ params }: { params: { id: string } }) => {
    // Wait for params to be resolved
    const { id } = await params;

    return (
        <div>
            <h1 className="text-4xl text-center font-bold">
                Hello, This is User {id}
            </h1>
        </div>
    );
};

export default page;
