"use client";
import React from 'react'
import Sidelink from '../common/Sidelink'
import { Users, LayoutDashboard, UserCog, SquareUser, BriefcaseBusiness, Folders, Building2 } from 'lucide-react'

function Sidebar() {
    return (
        <nav className="side-nav side-nav--simple">
            <ul>
                <Sidelink
                    href="/dashboard"
                    title="Dashboard"
                    icon={
                        <LayoutDashboard />
                    }
                />
                <li className="side-nav__devider my-6"></li>
                <Sidelink
                    title="Users Management"
                    href="/dashboard/users"
                    icon={
                        <SquareUser />
                    }>
                    <Sidelink
                        title="Users List"
                        href="/dashboard/users/list"
                        icon={<Users />}
                    />
                    <Sidelink
                        title="Role Management"
                        href="/dashboard/users/add"
                        icon={<UserCog />}
                    />

                </Sidelink>
                <Sidelink
                    title="Master Data"
                    icon={
                        <Folders />
                    }
                >
                    <Sidelink
                        title="Master Departemen"
                        href="/users/add"
                        icon={<Building2 />}
                    />
                    <Sidelink
                        title="Master Jabatan"
                        href="/users/add"
                        icon={<BriefcaseBusiness />}
                    />
                </Sidelink>
            </ul>
        </nav>
    )
}

export default Sidebar