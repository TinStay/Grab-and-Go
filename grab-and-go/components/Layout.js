import React from 'react'
import Navbar from './Navbar'
import Meta from './Meta'

const Layout = ({children}) => {
    return (
        <div>
            <Meta />
            <Navbar />
            {children}
        </div>
    )
}

export default Layout
