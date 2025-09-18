import Link from 'next/link'
import React from 'react'

function Sidelink({ children, icon }) {
    return (
        <li>
            <Link href="/" className="side-menu side-menu--active">
                <div className="side-menu__icon">
                    {icon}

                </div>
                <div className="side-menu__title"> Inbox </div>
            </Link>
            {children}
        </li>
    )
}

export default Sidelink