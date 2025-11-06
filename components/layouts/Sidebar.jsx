"use client";
import React from 'react'
import Sidelink from '../common/Sidelink'
import { Users, LayoutDashboard, UserCog, SquareUser, BriefcaseBusiness, Folders, Building2, FolderKey, MonitorCog, Layers, NotebookText, Weight } from 'lucide-react'

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
                        href="/dashboard/users/role"
                        icon={<UserCog />}
                    />
                    <Sidelink
                        title="Permission Management"
                        href="/dashboard/users/permission"
                        icon={<FolderKey />}
                    />
                </Sidelink>
                <Sidelink
                    title="Master Data SDM"
                    icon={
                        <Folders />
                    }
                >
                    <Sidelink
                        title="Departement Management"
                        href="/dashboard/master-data/departement"
                        icon={<Building2 />}
                    />
                    <Sidelink
                        title="Jabatan Management"
                        href="/dashboard/master-data/jabatan"
                        icon={<BriefcaseBusiness />}
                    />
                </Sidelink>
                <Sidelink
                    title="KPI Management"
                    icon={
                        <MonitorCog />
                    }
                >
                    <Sidelink
                        title="Category Management"
                        href="/dashboard/kpi/category-management"
                        icon={<Layers />}
                    />
                    <Sidelink
                        title="Indicator Management"
                        href="/dashboard/kpi/indicator-management"
                        icon={<NotebookText />}
                    />
                    <Sidelink
                        title="Bobot Management"
                        href="/dashboard/kpi/bobot-management"
                        icon={<Weight />}
                    />
                </Sidelink>
            </ul>
        </nav>
    )
}

export default Sidebar