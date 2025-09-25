import React from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

function Modal({ isOpen, onClose, title, children }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted || !isOpen) return null;

    return createPortal(

        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[9999] pt-32 flex items-start justify-center bg-black/50">
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="bg-white rounded-lg shadow-lg p-6 w-5xl">
                    <h3 className="text-lg font-bold">{title}</h3>
                    <div className="my-5 grid grid-cols-12 gap-4 gap-y-3">
                        {children}
                    </div>
                    <div className="flex justify-end">
                        <button
                            className="btn-dark w-20 mr-3 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                            onClick={onClose}
                        >
                            Close
                        </button>
                        <button
                            className="btn btn-outline-dark w-20 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                        >
                            Save
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>,

        document.getElementById("modal-root")
    );
}

export default Modal