'use client';
import { useEffect } from 'react'
import { motion } from "framer-motion";
import Modal from '../../../../components/common/Modal';
import { CheckSquare, Trash2, ChevronLeft, ChevronsLeft, ChevronRight, ChevronsRight, UserPlus, LoaderCircle } from 'lucide-react'
import Inputrole from '../../../../components/pages/users/Inputrole';
import Modaldelete from '../../../../components/common/Modaldelete';
import useRole from '../../../../components/hooks/users/useRole';

function RoleManagement() {
    const {
        isOpen,
        isOpenDelete,
        roles,
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
        handleSaveRoles,
        openAddRoleModal,
        openEditRoleModal,
        openModalDelete,
        handleDeleteRoles,
    } = useRole();

    useEffect(() => {
        document.title = "Dashboard | Role Management";
    }, []);

    return (
        <>
            <h2 className="intro-y text-lg font-medium pt-24">
                Role Management
            </h2>
            <div className="grid grid-cols-12 gap-6 mt-5">
                <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
                    <button
                        onClick={openAddRoleModal}
                        className="btn btn-secondary shadow-md mr-2">
                        <UserPlus className='pr-1.5' /> New Role
                    </button>

                    <div className="hidden md:block mx-auto text-slate-500"></div>
                    <div className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
                        <div className="w-56 relative text-slate-500">
                            <input
                                type="text"
                                className="form-control w-56 box pr-10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search..." />
                            <i className="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0" data-lucide="search"></i>
                        </div>
                    </div>
                </div>

                <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
                    <table className="table table-report -mt-2">
                        <thead>
                            <tr>
                                <th className="whitespace-nowrap">NAME</th>
                                <th className="whitespace-nowrap">GUARD NAME</th>
                                <th className="whitespace-nowrap">PERMISSION</th>
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
                            ) : roles.length > 0 ? (
                                [...roles]
                                    .filter((roles) =>
                                        roles.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        roles.guard_name.toLowerCase().includes(searchTerm.toLowerCase())
                                    )
                                    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
                                    .map((roles, index) => (
                                        <motion.tr
                                            key={roles.id}
                                            whileHover={{ scale: 1.02 }}>
                                            <td className="w-60">
                                                <div className="">
                                                    {roles.name}
                                                </div>
                                            </td>
                                            <td>
                                                {roles.guard_name}
                                            </td>
                                            <td>
                                                {roles.permissions && roles.permissions.length > 0
                                                    ? roles.permissions.map((p) => p.name).join(', ')
                                                    : 'No permission'}
                                            </td>
                                            <td className="table-report__action w-56">
                                                <div className="flex justify-center items-center">
                                                    <button
                                                        onClick={() => openEditRoleModal(roles)}
                                                        className="flex items-center mr-3"
                                                    >
                                                        <CheckSquare className="w-4 h-4 mr-1" /> Edit
                                                    </button>
                                                    <button
                                                        onClick={() => openModalDelete(roles)}
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
                                    <td colSpan="4" className="text-center py-4">Tidak ada Data</td>
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
                onSave={handleSaveRoles}
            >
                <Inputrole formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} />
            </Modal>

            <Modaldelete
                isOpenDelete={isOpenDelete}
                onClose={() => setIsOpenDelete(false)}
                onDelete={handleDeleteRoles}
                title={modalDataDelete.title}
            >
                {modalDataDelete.content}
            </Modaldelete>
        </>
    )
}

export default RoleManagement