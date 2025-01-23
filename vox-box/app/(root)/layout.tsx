import React from 'react';
import Navbar from '../components/Navbar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <main className="font-work-sans">
            <Navbar />
            {children}
        </main>
    );
}

export default Layout;