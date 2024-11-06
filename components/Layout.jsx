import React from 'react'
import Header from '../app/dashboard/_components/Header';

function Layout({ children }) {
    return (
        <div>
            <Header/>
            {children}

        </div >
    )
}

export default Layout;
