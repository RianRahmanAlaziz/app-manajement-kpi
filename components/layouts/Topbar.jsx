"use client";
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from "motion/react"
import React, { useState, useRef, useEffect } from "react";
import { User, Edit, Lock, HelpCircle, ToggleRight } from 'lucide-react';

function Topbar() {
    const [openNotif, setOpenNotif] = useState(false);
    const [openAccount, setopenAccount] = useState(false);
    const notifRef = useRef(null);
    const accountRef = useRef(null);

    // Tutup dropdown kalau klik di luar area
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                notifRef.current &&
                !notifRef.current.contains(event.target) &&
                accountRef.current &&
                !accountRef.current.contains(event.target)
            ) {
                setOpenNotif(false);
                setopenAccount(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="top-bar-boxed top-bar-boxed--simple-menu h-[70px] md:h-[65px] z-[51] border-b border-white/[0.08] mt-12 md:mt-0 -mx-3 sm:-mx-8 md:-mx-0 px-3 md:border-b-0 relative md:fixed md:inset-x-0 md:top-0 sm:px-8 md:px-10 md:pt-10 md:bg-gradient-to-b md:from-slate-100 md:to-transparent dark:md:from-darkmode-700">
            <div className="h-full flex items-center">

                {/* Logo */}
                <Link href="#" className="logo -intro-x hidden md:flex xl:w-[180px] ">
                    <Image
                        alt="Midone - HTML Admin Template"
                        className="logo__image w-6"
                        src="/images/logo.svg"
                        width={24}
                        height={24}
                    />

                </Link>

                {/* Breadcrumb */}
                <nav aria-label="breadcrumb" className="-intro-x h-[45px] mr-auto">
                    <ol className="breadcrumb breadcrumb-light">
                        <li className="breadcrumb-item"><a href="#">Application</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                    </ol>
                </nav>

                {/* Search */}
                <div className="intro-x relative mr-3 sm:mr-6">
                    <div className="search hidden sm:block">
                        <input type="text" className="search__input form-control border-transparent" placeholder="Search..." />
                        <svg
                            fill="currentColor"
                            className="search__icon dark:text-slate-500"
                            height="512"
                            width="512"
                            viewBox="0 0 512 512"
                            xmlns="http://www.w3.org/2000/svg"

                        >
                            <path d="m504.68 469.32-143.68-143.68a200.79 200.79 0 0 0 42.58-123.85c0-111.27-90.52-201.79-201.79-201.79s-201.79 90.52-201.79 201.79 90.52 201.79 201.79 201.79a200.79 200.79 0 0 0 123.85-42.58l143.68 143.68a25 25 0 0 0 35.36-35.36zm-454.68-267.53c0-83.7 68.09-151.79 151.79-151.79s151.79 68.09 151.79 151.79-68.09 151.79-151.79 151.79-151.79-68.09-151.79-151.79z" />
                            <path d="m271 462h-150a25 25 0 0 0 0 50h150a25 25 0 0 0 0-50z" />
                        </svg>
                    </div>
                    <a className="notification notification--light sm:hidden" href="#">
                        <svg
                            fill="currentColor"
                            className="notification__icon dark:text-slate-500"
                            height="512"
                            width="512"
                            viewBox="0 0 512 512"
                            xmlns="http://www.w3.org/2000/svg"

                        >
                            <path d="m504.68 469.32-143.68-143.68a200.79 200.79 0 0 0 42.58-123.85c0-111.27-90.52-201.79-201.79-201.79s-201.79 90.52-201.79 201.79 90.52 201.79 201.79 201.79a200.79 200.79 0 0 0 123.85-42.58l143.68 143.68a25 25 0 0 0 35.36-35.36zm-454.68-267.53c0-83.7 68.09-151.79 151.79-151.79s151.79 68.09 151.79 151.79-68.09 151.79-151.79 151.79-151.79-68.09-151.79-151.79z" />
                            <path d="m271 462h-150a25 25 0 0 0 0 50h150a25 25 0 0 0 0-50z" />
                        </svg>

                    </a>
                    {/* Hapus search-result jika belum dinamis */}
                </div>

                {/* Notifications */}
                <div className="intro-x dropdown mr-4 sm:mr-6" ref={notifRef}>
                    <motion.button
                        className="dropdown-toggle notification notification--bullet cursor-pointer"
                        onClick={() => {
                            setOpenNotif((prev) => !prev);
                            setopenAccount(false); // supaya ga bentrok
                        }}
                        whileTap={{ y: 1 }}
                    >
                        <svg
                            className="notification__icon dark:text-slate-500"
                            fill="currentColor"
                            id="Layer_1"
                            height="512"
                            viewBox="0 0 512 512"
                            width="512"
                            xmlns="http://www.w3.org/2000/svg"
                            data-name="Layer 1">
                            <path d="m502.361 361.924-80.475-100.009v-96.03a165.886 165.886 0 0 0 -331.772 0v96.03l-80.475 100.008c-9.159 11.381-9.159 26.09 0 37.47 7.5 9.327 19.706 14.676 33.479 14.676h118.316a94.622 94.622 0 1 0 189.13 0h118.319c13.773 0 25.976-5.349 33.478-14.674 9.16-11.382 9.16-26.09 0-37.471zm-198.582 95.908a62.614 62.614 0 0 1 -110.306-43.763h125.057a62.646 62.646 0 0 1 -14.751 43.763zm165.1-75.763h-425.762a14.077 14.077 0 0 1 -7.273-1.668l82.735-102.818a15.994 15.994 0 0 0 3.535-10.03v-101.668c0-73.825 60.061-133.885 133.886-133.885s133.886 60.06 133.886 133.885v101.668a15.994 15.994 0 0 0 3.535 10.03l82.735 102.817a14.074 14.074 0 0 1 -7.273 1.669z" />
                        </svg>
                    </motion.button>
                    <AnimatePresence>
                        {openNotif && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                                className="notification-content pt-6 absolute right-0 z-50 " >
                                <div className="notification-content__box dropdown-content rounded-md">
                                    <div className="notification-content__title">Notifications</div>

                                    {/* Contoh Notification Item */}
                                    <div className="cursor-pointer relative flex items-center mt-5">
                                        <div className="w-12 h-12 flex-none image-fit mr-1 relative">
                                            <Image
                                                alt="Profile"
                                                src="/images/profile-4.jpg"
                                                className="rounded-full"
                                                width={48}
                                                height={48}
                                            />
                                            <div className="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white"></div>
                                        </div>
                                        <div className="ml-2 overflow-hidden">
                                            <div className="flex items-center">
                                                <a href="#" className="font-medium truncate mr-5">Angelina Jolie</a>
                                                <div className="text-xs text-slate-400 ml-auto whitespace-nowrap">05:09 AM</div>
                                            </div>
                                            <div className="w-full truncate text-slate-500 mt-0.5">
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>

                {/* Account Menu */}
                <div className="intro-x dropdown w-8 h-8" ref={accountRef}>
                    <motion.div
                        onClick={() => {
                            setopenAccount((prev) => !prev);
                            setOpenNotif(false); // supaya ga bentrok
                        }}
                        whileTap={{ y: 1 }}
                        className="dropdown-toggle w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in scale-110" >
                        <Image
                            alt="User Profile"
                            src="/images/profile-2.jpg"
                            width={32}
                            height={32}
                        />
                    </motion.div>
                    <AnimatePresence>
                        {openAccount && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                                className="w-56 absolute right-0 z-50 mt-5 rounded-md">
                                <ul className=" bg-primary/80 before:block before:absolute before:bg-black before:inset-0 before:rounded-md before:z-[-1] text-white p-2 rounded-md">
                                    <li className="p-2">
                                        <div className="font-medium">Angelina Jolie</div>
                                        <div className="text-xs text-white/60 mt-0.5 dark:text-slate-500">Software Engineer</div>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider border-white/[0.08]" />
                                    </li>
                                    <li>
                                        <Link href="#" className="flex items-center rounded-md p-2 hover:bg-white/5">
                                            <User className="w-4 h-4 mr-2" />Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <a href="#" className="flex items-center rounded-md p-2 hover:bg-white/5">
                                            <Edit className="w-4 h-4 mr-2" /> Add Account
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="flex items-center rounded-md p-2 hover:bg-white/5">
                                            <Lock className="w-4 h-4 mr-2" /> Reset Password
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="flex items-center rounded-md p-2 hover:bg-white/5">
                                            <HelpCircle className="w-4 h-4 mr-2" /> Help
                                        </a>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider border-white/[0.08]" />
                                    </li>
                                    <li>
                                        <a href="#" className="flex items-center rounded-md p-2 hover:bg-white/5">
                                            <ToggleRight className="w-4 h-4 mr-2" /> Logout
                                        </a>
                                    </li>
                                </ul>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>

            </div>
        </div>
    )
}

export default Topbar
