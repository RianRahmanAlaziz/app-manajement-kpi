'use client';
import Image from 'next/image'
import Tippy from '@tippyjs/react'; // ✅ dari React
import { CheckSquare, Trash2, ChevronLeft, ChevronsLeft, ChevronRight, ChevronsRight, UserPlus, LoaderCircle } from 'lucide-react'
import { useEffect } from 'react'
import Modal from '../../../../components/common/Modal';
import { motion } from "framer-motion";
import Adduser from '../../../../components/pages/users/Adduser';
import Modaldelete from '../../../../components/common/Modaldelete';
import 'react-toastify/dist/ReactToastify.css' // ✅ Import CSS
import useUser from '../../../../components/hooks/users/useUser';

function PageUsers() {
    const {
        isOpen,
        isOpenDelete,
        users,
        loading,
        searchTerm,
        setSearchTerm,
        pagination,
        modalData,
        modalDataDelete,
        formData,
        setFormData,
        errors,
        setErrors,
        setIsOpen,
        setIsOpenDelete,
        handlePageChange,
        handleSaveUser,
        openAddUserModal,
        openEditUserModal,
        openModalDelete,
        handleDeleteUser,
    } = useUser();

    useEffect(() => {
        document.title = "Dashboard | Users Management";
    }, []);


    return (
        <>
            <h2 className="intro-y text-lg font-medium pt-24">
                Users List
            </h2>
            <div className="grid grid-cols-12 gap-6 mt-5">
                <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
                    <button
                        onClick={openAddUserModal}
                        className="btn btn-secondary shadow-md mr-2">
                        <UserPlus className='pr-1.5' /> New Users
                    </button>

                    <div className="hidden md:block mx-auto text-slate-500"></div>
                    <div className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
                        <div className="w-56 relative text-slate-500">
                            <input
                                type="text"
                                className="form-control w-56 box pr-10"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
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
                                <th className="text-center whitespace-nowrap">ROLE</th>
                                <th className="text-center whitespace-nowrap">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="4" className="py-6">
                                        <div className="flex justify-center items-center">
                                            <LoaderCircle className="w-6 h-6 animate-spin text-gray-500" />
                                        </div>
                                    </td>
                                </tr>
                            ) : users.length > 0 ? (
                                [...users]
                                    .filter((user) =>
                                        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        user.email.toLowerCase().includes(searchTerm.toLowerCase())
                                    )
                                    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
                                    .map((user, index) => (
                                        <motion.tr key={user.id} whileHover={{ scale: 1.02 }}>
                                            <td className="w-40">
                                                <div className="flex">
                                                    <Tippy
                                                        animation="shift-away"
                                                        content={`Uploaded at ${new Date(user.created_at).toLocaleDateString('id-ID', {
                                                            day: 'numeric',
                                                            month: 'long',
                                                            year: 'numeric',
                                                        })}`}
                                                        delay={[0, 100]}
                                                    >
                                                        <Image
                                                            alt={user.name}
                                                            width={40}
                                                            height={40}
                                                            className="rounded-full"
                                                            src="/images/preview-8.jpg"
                                                        />
                                                    </Tippy>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="font-medium whitespace-nowrap">{user.name}</span>
                                                <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">{user.email}</div>
                                            </td>
                                            <td className="w-40">
                                                <div className="flex items-center justify-center ">
                                                    {user.role_names?.join(', ') || 'No role'}
                                                </div>
                                            </td>
                                            <td className="table-report__action w-56">
                                                <div className="flex justify-center items-center">
                                                    <button
                                                        onClick={() => openEditUserModal(user)}
                                                        className="flex items-center mr-3"
                                                    >
                                                        <CheckSquare className="w-4 h-4 mr-1" /> Edit
                                                    </button>
                                                    <button
                                                        onClick={() => openModalDelete(user)}
                                                        className="flex items-center text-danger"
                                                    >
                                                        <Trash2 className="w-4 h-4 mr-1" /> Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-4">Tidak ada data user</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="intro-y col-span-12 flex justify-center items-center mt-5">
                    <nav className="w-auto">
                        <ul className="pagination">
                            <li className="page-item">
                                <button className="page-link" onClick={() => handlePageChange(1)} disabled={pagination.current_page === 1}>
                                    <ChevronsLeft className="w-4 h-4" />
                                </button>

                            </li>
                            <li className="page-item">
                                <button className="page-link" onClick={() => handlePageChange(pagination.current_page - 1)} disabled={pagination.current_page === 1}>
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                            </li>

                            {[...Array(pagination.last_page)].map((_, i) => (
                                <li key={i} className={`page-item ${pagination.current_page === i + 1 ? 'active' : ''}`}>
                                    <button className="page-link" onClick={() => handlePageChange(i + 1)}>
                                        {i + 1}
                                    </button>
                                </li>
                            ))}

                            <li className="page-item">
                                <button className="page-link" onClick={() => handlePageChange(pagination.current_page + 1)} disabled={pagination.current_page === pagination.last_page}>
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </li>
                            <li className="page-item">
                                <button className="page-link" onClick={() => handlePageChange(pagination.last_page)} disabled={pagination.current_page === pagination.last_page}>
                                    <ChevronsRight className="w-4 h-4" />
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            {/* 🔹 Modal Add/Edit */}
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title={modalData.title}
                onSave={handleSaveUser}
            >
                <Adduser formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} />
            </Modal>

            <Modaldelete
                isOpenDelete={isOpenDelete}
                onClose={() => setIsOpenDelete(false)}
                onDelete={handleDeleteUser}
                title={modalDataDelete.title}
            >
                {modalDataDelete.content}
            </Modaldelete>
        </>
    )
}

export default PageUsers