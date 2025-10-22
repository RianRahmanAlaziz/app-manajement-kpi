'use client';
import React from 'react'
import { useEffect, useState } from 'react'
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Tippy from '@tippyjs/react'; // ✅ dari React
import { roundArrow } from 'tippy.js'; // ✅ dari core Tippy.js
import 'tippy.js/dist/tippy.css';         // Tooltip default style
import 'tippy.js/dist/svg-arrow.css';
import { ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';

function Sidelink({ icon, title, href = '/', children, cls = '' }) {
    const pathname = usePathname(); // ⬅️ Ambil route saat ini
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false)

    const hasChildren = !!children;


    const isChildActive = hasChildren &&
        React.Children.toArray(children).some(child =>
            React.isValidElement(child) &&
            typeof child.props.href === 'string' &&
            pathname.startsWith(child.props.href)
        );

    const isDirectActive = href && pathname === href;

    // ✅ Fix utama: parent aktif jika anak aktif atau exact match,
    // tapi ❌ TIDAK aktif hanya karena `startsWith` doang (menghindari /dashboard aktif saat /dashboard/users)
    const isActive = isDirectActive || isChildActive;


    useEffect(() => {
        if (isActive && hasChildren) {
            setIsOpen(true); // auto buka menu
        }
    }, [isActive, hasChildren]);


    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768) // Bisa ganti breakpoint sesuai kebutuhan
        };
        checkMobile();
        window.addEventListener('resize', checkMobile)

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const baseClass = isMobile ? 'menu' : 'side-menu'

    const fullClass = `${baseClass} ${cls} ${isActive ? 'side-menu--active' : ''}`.trim();


    const handleClick = (e) => {
        if (hasChildren) {
            e.preventDefault(); // jangan redirect jika punya child
            setIsOpen(!isOpen); // toggle
        }
    };

    const isCollapsed = !isMobile &&
        typeof window !== 'undefined' &&
        (window.innerWidth <= 1260 || document.querySelector('.side-nav')?.classList.contains('side-nav--simple'));

    return (
        <li>
            <Tippy
                content={title}
                arrow={roundArrow}
                placement="right"
                animation="shift-away"
                disabled={!isCollapsed}
                delay={[0, 100]}
            >
                <Link
                    href={hasChildren ? '#' : href}
                    onClick={hasChildren ? handleClick : undefined}
                    className={fullClass}
                >
                    <div className={`${baseClass}__icon`}>{icon}</div>
                    <motion.div className={`${baseClass}__title`} layout>
                        {title}
                        {hasChildren && (
                            <ChevronDown
                                className={`${baseClass}__sub-icon transition-transform ${isOpen ? 'rotate-180' : ''
                                    }`}
                            />
                        )}
                    </motion.div>
                </Link>
            </Tippy>

            {/* Submenu */}
            {hasChildren && (
                <AnimatePresence initial={false}>
                    {isOpen && (
                        <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className={`overflow-hidden ${baseClass}__sub-open mb-3`}
                        >
                            {children}
                        </motion.ul>
                    )}
                </AnimatePresence>
            )}
        </li>
    );
}

export default Sidelink;
