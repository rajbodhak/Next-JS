import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <h1 className='text-3xl font-bold text-center text-green-600'>
                This is Dashboard Navbar
            </h1>
            {children}
        </div>
    )
}

export default layout
