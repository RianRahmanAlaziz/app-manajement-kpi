"use client";
import React from 'react'
import Sidelink from '../common/Sidelink'
import { Users, LayoutDashboard } from 'lucide-react'

function Sidebar() {
    return (
        <nav className="side-nav side-nav--simple">
            <ul>
                <Sidelink
                    cls="side-menu--active"
                    title="Dashboard"
                    icon={
                        <LayoutDashboard />
                    }
                />
                <li className="side-nav__devider my-6"></li>

                <Sidelink
                    title="Users"
                    icon={
                        <Users />
                    }>
                    <Sidelink
                        title="List Users"
                        href="/users/list"
                        icon={<svg
                            id="Layer_1"
                            fill="currentColor"
                            height="25"
                            viewBox="0 0 512 512"
                            width="25"
                            xmlns="http://www.w3.org/2000/svg"
                            data-name="Layer 1">
                            <path d="m502.706 222.877-230.165-176.245a27.6 27.6 0 0 0 -33.082 0l-230.166 176.245c-8.736 6.69-11.657 17.691-7.269 27.374 4.068 8.977 13.192 14.553 23.81 14.553h60.853v166.9c0 21.595 19.745 39.164 44.015 39.164h250.598c24.27 0 44.015-17.569 44.015-39.164v-166.904h60.853c10.617 0 19.74-5.576 23.809-14.552 4.387-9.68 1.466-20.682-7.271-27.371zm-218.43 223.993h-56.552v-115.562h56.552zm201.89-206.07h-72.853a12 12 0 0 0 -12 12v178.9c0 8.22-9.166 15.164-20.015 15.164h-73.022v-127.556a12 12 0 0 0 -12-12h-80.552a12 12 0 0 0 -12 12v127.562h-73.024c-10.85 0-20.015-6.944-20.015-15.164v-178.906a12 12 0 0 0 -12-12h-72.851c-.161 0-.312-.007-.452-.018l228.669-175.1a3.7 3.7 0 0 1 3.9 0l228.668 175.1c-.141.018-.292.018-.453.018z" />
                        </svg>}
                    />
                    <Sidelink
                        title="Add User"
                        href="/users/add"
                        icon={<svg
                            id="Layer_1"
                            fill="currentColor"
                            height="25"
                            viewBox="0 0 512 512"
                            width="25"
                            xmlns="http://www.w3.org/2000/svg"
                            data-name="Layer 1">
                            <path d="m502.706 222.877-230.165-176.245a27.6 27.6 0 0 0 -33.082 0l-230.166 176.245c-8.736 6.69-11.657 17.691-7.269 27.374 4.068 8.977 13.192 14.553 23.81 14.553h60.853v166.9c0 21.595 19.745 39.164 44.015 39.164h250.598c24.27 0 44.015-17.569 44.015-39.164v-166.904h60.853c10.617 0 19.74-5.576 23.809-14.552 4.387-9.68 1.466-20.682-7.271-27.371zm-218.43 223.993h-56.552v-115.562h56.552zm201.89-206.07h-72.853a12 12 0 0 0 -12 12v178.9c0 8.22-9.166 15.164-20.015 15.164h-73.022v-127.556a12 12 0 0 0 -12-12h-80.552a12 12 0 0 0 -12 12v127.562h-73.024c-10.85 0-20.015-6.944-20.015-15.164v-178.906a12 12 0 0 0 -12-12h-72.851c-.161 0-.312-.007-.452-.018l228.669-175.1a3.7 3.7 0 0 1 3.9 0l228.668 175.1c-.141.018-.292.018-.453.018z" />
                        </svg>}
                    />

                </Sidelink>
            </ul>
        </nav>
    )
}

export default Sidebar