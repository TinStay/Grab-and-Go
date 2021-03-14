import React from 'react'
import Navbar from './Navbar'
import Meta from './Meta'

const Layout = ({children}) => {
    return (
        <div className="light-green-bgc h-100vh">
            <Meta />
            <Navbar />
            {children}
        </div>
    )
}

export default Layout
