import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <h1 className='text-3xl font-bold text-yellow-600 text-center'>This is Main Navbar</h1>
            {children}
        </div>
    )
}

export default layout
