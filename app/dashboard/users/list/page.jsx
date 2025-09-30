'use client';
import DashboardPage from '../../page'
import Image from 'next/image'
import Tippy from '@tippyjs/react'; // ✅ dari React
import { CheckSquare, Trash2, ChevronLeft, ChevronsLeft, ChevronRight, ChevronsRight, UserPlus } from 'lucide-react'
import { useState } from 'react'
import Modal from '../../../../components/common/Modal';
import { motion } from "framer-motion";
import Adduser from '../../../../components/pages/users/Adduser';
import Modaldelete from '../../../../components/common/Modaldelete';

function PageUsers() {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);

    const [modalData, setModalData] = useState({
        title: '',
        content: null,
    });
    const [modalDataDelete, setModalDataDelete] = useState({
        title: '',
    });
    const openModal = (title, content) => {
        setModalData({ title, content });
        setIsOpen(true);
    };
    const openModalDelete = (title) => {
        setModalDataDelete({ title });
        setIsOpenDelete(true);
    };

    // 👉 Handler Submit Add Product
    const handleAddProduct = (data) => {
        setProducts([...products, data]);
        setIsOpen(false); // close modal
    };
    return (
        <DashboardPage>
            <h2 className="intro-y text-lg font-medium pt-24">
                Users List
            </h2>
            <div className="grid grid-cols-12 gap-6 mt-5">
                <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
                    <button
                        onClick={() =>
                            openModal("Add Product", <Adduser onSubmit={handleAddProduct} />)
                        }
                        className="btn btn-secondary shadow-md mr-2">
                        <UserPlus className='pr-1.5' /> New Users
                    </button>

                    <div className="hidden md:block mx-auto text-slate-500"></div>
                    <div className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
                        <div className="w-56 relative text-slate-500">
                            <input type="text" className="form-control w-56 box pr-10" placeholder="Search..." />
                            <i className="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0" data-lucide="search"></i>
                        </div>
                    </div>
                </div>

                <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
                    <table className="table table-report -mt-2">
                        <thead>
                            <tr>
                                <th className="whitespace-nowrap">IMAGES</th>
                                <th className="whitespace-nowrap"> NAME</th>
                                <th className="text-center whitespace-nowrap">STATUS</th>
                                <th className="text-center whitespace-nowrap">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            <motion.tr
                                whileHover={{ scale: 1.03 }}
                            >
                                <td className="w-40">
                                    <div className="flex">
                                        <Tippy
                                            animation="shift-away"
                                            content="Uploaded at 1 September 2021"
                                            delay={[0, 100]}
                                        >
                                            <div className="w-10 h-10 image-fit zoom-in">
                                                <Image
                                                    alt="Midone - HTML Admin Template"
                                                    width={32}
                                                    height={32}
                                                    className=" rounded-full"
                                                    src="/images/preview-8.jpg" title="Uploaded at 1 September 2021" />
                                            </div>
                                        </Tippy>
                                    </div>
                                </td>
                                <td>
                                    <a href="" className="font-medium whitespace-nowrap">Samsung Q90 QLED TV</a>
                                    <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">Electronic</div>
                                </td>
                                <td className="w-40 ">
                                    <div className="flex items-center justify-center text-danger">
                                        <CheckSquare className="w-4 h-4 mr-2" /> Inactive
                                    </div>
                                </td>
                                <td className="table-report__action w-56">
                                    <div className="flex justify-center items-center">
                                        <button
                                            onClick={() =>
                                                openModal("Edit Product", <Adduser onSubmit={handleAddProduct} />)
                                            }
                                            className="flex items-center mr-3" >
                                            <CheckSquare className="w-4 h-4 mr-1" />
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                openModalDelete("asd")
                                            }
                                            className="flex items-center text-danger"
                                        >
                                            <Trash2 className="w-4 h-4 mr-1" /> Delete </button>
                                    </div>
                                </td>
                            </motion.tr>

                        </tbody>
                    </table>
                </div>

                <div className="intro-y col-span-12 flex justify-center items-center mt-5">
                    <nav className="w-auto">
                        <ul className="pagination">
                            <li className="page-item">
                                <a className="page-link" href="#">
                                    <ChevronsLeft className="w-4 h-4" />
                                </a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#">
                                    <ChevronLeft className="w-4 h-4" />
                                </a>
                            </li>
                            <li className="page-item"> <a className="page-link" href="#">...</a> </li>
                            <li className="page-item"> <a className="page-link" href="#">1</a> </li>
                            <li className="page-item active"> <a className="page-link" href="#">2</a> </li>
                            <li className="page-item"> <a className="page-link" href="#">3</a> </li>
                            <li className="page-item"> <a className="page-link" href="#">...</a> </li>
                            <li className="page-item">
                                <a className="page-link" href="#"> <ChevronRight className="w-4 h-4" /> </a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#"> <ChevronsRight className="w-4 h-4" /> </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title={modalData.title}
            >
                {modalData.content}
            </Modal>
            <Modaldelete
                isOpenDelete={isOpenDelete}
                onClose={() => setIsOpenDelete(false)}
                title={modalDataDelete.title}
            >
                {modalDataDelete.content}
            </Modaldelete>
        </DashboardPage>
    )
}

export default PageUsers