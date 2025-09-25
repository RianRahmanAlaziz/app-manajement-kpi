'use client';
import { useEffect, useState } from 'react'
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Tippy from '@tippyjs/react'; // ✅ dari React
import { roundArrow } from 'tippy.js'; // ✅ dari core Tippy.js
import 'tippy.js/dist/tippy.css';         // Tooltip default style
import 'tippy.js/dist/svg-arrow.css';
import { ChevronDown } from 'lucide-react'

function Sidelink({ icon, title, href = '/', children, cls = '' }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768) // Bisa ganti breakpoint sesuai kebutuhan
        };
        checkMobile();
        window.addEventListener('resize', checkMobile)

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const baseClass = isMobile ? 'menu' : 'side-menu'
    const fullClass = `${baseClass} ${cls}`.trim()

    const hasChildren = !!children;

    const handleClick = (e) => {
        if (hasChildren) {
            e.preventDefault(); // jangan redirect jika punya child
            setIsOpen(!isOpen); // toggle
        }
    };

    const isCollapsed = !isMobile &&
        typeof window !== 'undefined' &&
        (window.innerWidth <= 1260 || document.querySelector('.side-nav')?.classList.contains('side-nav--simple'));

    const Content = (
        <div className={fullClass}>
            <div className={`${baseClass}__icon`}>{icon}</div>
            <motion.div className={`${baseClass}__title`} layout>
                {title}
                {hasChildren && (
                    <ChevronDown className={`${baseClass}__sub-icon ${isOpen ? 'transform rotate-179' : ''}`} />
                )}
            </motion.div>
        </div>
    );

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
                {/* Link / Button tergantung apakah punya children */}
                {hasChildren ? (
                    isMobile ? (
                        <button onClick={handleClick} className="w-full text-left">
                            {Content}
                        </button>
                    ) : (
                        <button onClick={handleClick} className="w-full text-left">
                            {Content}
                        </button>
                    )
                ) : (
                    <Link href={href} className={fullClass}>
                        <div className={`${baseClass}__icon`}>{icon}</div>
                        <motion.div className={`${baseClass}__title`} layout>
                            {title}
                        </motion.div>
                    </Link>
                )}
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
                            className={`overflow-hidden ${baseClass}__sub-open`}
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
