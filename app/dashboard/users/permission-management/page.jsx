'use client';
import axios from 'axios';
import { useState, useEffect } from 'react'
import { motion } from "framer-motion";
import DashboardPage from '../../page';
import Modal from '../../../../components/common/Modal';
import { CheckSquare, Trash2, ChevronLeft, ChevronsLeft, ChevronRight, ChevronsRight, UserPlus } from 'lucide-react'
import Inputrole from '../../../../components/pages/roles/Inputrole';
import { toast, ToastContainer } from 'react-toastify' // ✅ Tambahkan ini
import 'react-toastify/dist/ReactToastify.css' // ✅ Import CSS
import Modaldelete from '../../../../components/common/Modaldelete';
import InputPermissions from '../../../../components/pages/permission/InputPermissions';

function PermissionManagement() {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [permissions, setPermissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        name: "",
        guard_name: "",
    });
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0
    });

    const [modalData, setModalData] = useState({
        title: '',
        mode: 'add', // 'add' | 'edit'
        editId: null, // id Permissions kalau edit
    });

    const [modalDataDelete, setModalDataDelete] = useState({
        title: '',
    });

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const fetchPermissions = async (page = 1, search = '') => {
        try {
            const res = await axios.get(`http://127.0.0.1:8000/api/permissions?page=${page}&search=${search}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json"
                }
            });
            const paginated = res.data.data;
            setPermissions(paginated.data);
            setPagination({
                current_page: paginated.current_page,
                last_page: paginated.last_page,
                per_page: paginated.per_page,
                total: paginated.total
            });
        } catch (error) {
            console.error("Gagal mengambil data Permissions:", error);
            toast.error("Gagal mengambil data Permissions 😞");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (searchTerm.trim() !== '') setLoading(true);
        const timeout = setTimeout(() => {
            fetchPermissions(searchTerm);
        }, 500);
        return () => clearTimeout(timeout);
    }, [searchTerm]);

    // 🔹 navigasi pagination
    const handlePageChange = (page) => {
        if (page < 1 || page > pagination.last_page) return;
        setLoading(true);
        fetchPermissions(page, searchTerm);
    };

    // 🔹 Tambah atau edit Permissions
    const handleSavePermissions = async () => {
        const { mode, editId } = modalData;
        console.log('FINAL FORM DATA:', formData);

        try {
            const url =
                mode === 'edit'
                    ? `http://127.0.0.1:8000/api/permissions/${editId}`
                    : 'http://127.0.0.1:8000/api/permissions';

            const method = mode === 'edit' ? 'put' : 'post';

            await axios({
                method,
                url,
                data: formData,
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
            });

            await fetchPermissions();
            setIsOpen(false);
            setFormData({ name: '', guard_name: '' });
            // ✅ Toast notifikasi sukses
            if (mode === 'edit') {
                toast.info("Permissions berhasil diperbarui");
            } else {
                toast.success("Permissions berhasil ditambahkan");
            }
        } catch (error) {
            console.error(
                mode === 'edit' ? 'Gagal mengupdate Permissions:' : 'Gagal menambahkan Permissions:',
                error.response?.data || error.message
            );
            toast.error(mode === 'edit' ? "Gagal memperbarui Permissions ⚠️" : "Gagal menambahkan Permissions 🚫");
        }
    };

    // 🔹 Buka modal Add
    const openAddPermissionsModal = () => {
        setFormData({ name: '', guard_name: '' });
        setModalData({ title: 'Add New Permissions', mode: 'add', editId: null });
        setIsOpen(true);
    };
    // 🔹 Buka modal Edit
    const openEditPermissionsModal = (permissions) => {
        setFormData({
            name: permissions.name || '',
            guard_name: permissions.guard_name || '',
        });
        setModalData({ title: 'Edit Permissions', mode: 'edit', editId: permissions.id });
        setIsOpen(true);
    };

    const handleDeletePermissions = async () => {
        try {
            const res = await axios.delete(`http://127.0.0.1:8000/api/permissions/${modalDataDelete.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });

            console.log("Berhasil menghapus Permissions:", res.data);
            await fetchPermissions(); // refresh data tabel
            setIsOpenDelete(false); // tutup modal
            toast.success("Permissions berhasil dihapus 🗑️");
        } catch (error) {
            console.error("Gagal menghapus Permissions:", error.response?.data || error.message);
            toast.error("Gagal menghapus Permissions ❌");
        }
    };

    const openModalDelete = (permissions) => {
        setModalDataDelete({
            title: `Hapus user "${permissions.name}"?`,
            id: permissions.id,
        });
        setIsOpenDelete(true);
    };

    return (
        <DashboardPage>
            <h2 className="intro-y text-lg font-medium pt-24">
                Permission Management
            </h2>
            <div className="grid grid-cols-12 gap-6 mt-5">
                <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
                    <button
                        onClick={openAddPermissionsModal}
                        className="btn btn-secondary shadow-md mr-2">
                        <UserPlus className='pr-1.5' /> New Permissions
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
                                <th className="text-center whitespace-nowrap">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="4" className="text-center py-4">Loading...</td>
                                </tr>
                            ) : permissions.length > 0 ? (
                                [...permissions]
                                    .filter((permissions) =>
                                        permissions.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        permissions.guard_name.toLowerCase().includes(searchTerm.toLowerCase())
                                    )
                                    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
                                    .map((permissions, index) => (
                                        <motion.tr
                                            key={permissions.id}
                                            whileHover={{ scale: 1.02 }}>
                                            <td className="w-60">
                                                <div className="">
                                                    {permissions.name}
                                                </div>
                                            </td>
                                            <td>
                                                {permissions.guard_name}
                                            </td>
                                            <td className="table-report__action w-56">
                                                <div className="flex justify-center items-center">
                                                    <button
                                                        onClick={() => openEditPermissionsModal(permissions)}
                                                        className="flex items-center mr-3"
                                                    >
                                                        <CheckSquare className="w-4 h-4 mr-1" /> Edit
                                                    </button>
                                                    <button
                                                        onClick={() => openModalDelete(permissions)}
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
                onSave={handleSavePermissions}
            >
                <InputPermissions formData={formData} setFormData={setFormData} />
            </Modal>

            <Modaldelete
                isOpenDelete={isOpenDelete}
                onClose={() => setIsOpenDelete(false)}
                onDelete={handleDeletePermissions}
                title={modalDataDelete.title}
            >
                {modalDataDelete.content}
            </Modaldelete>
        </DashboardPage >
    )
}

export default PermissionManagement