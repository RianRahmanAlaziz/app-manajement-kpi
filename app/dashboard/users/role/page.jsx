'use client';
import axios from 'axios';
import { useState, useEffect } from 'react'
import { motion } from "framer-motion";
import DashboardPage from '../../page';
import Modal from '../../../../components/common/Modal';
import { CheckSquare, Trash2, ChevronLeft, ChevronsLeft, ChevronRight, ChevronsRight, UserPlus, LoaderCircle } from 'lucide-react'
import Inputrole from '../../../../components/pages/users/Inputrole';
import { toast, ToastContainer } from 'react-toastify' // ✅ Tambahkan ini
import 'react-toastify/dist/ReactToastify.css' // ✅ Import CSS
import Modaldelete from '../../../../components/common/Modaldelete';

function RoleManagement() {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [roles, setroles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        name: "",
        guard_name: "",
    });
    const [errors, setErrors] = useState({});
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0
    });

    const [modalData, setModalData] = useState({
        title: '',
        mode: 'add', // 'add' | 'edit'
        editId: null, // id role kalau edit
    });

    const [modalDataDelete, setModalDataDelete] = useState({
        title: '',
    });

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const fetchroles = async (page = 1, search = '') => {
        try {
            const res = await axios.get(`http://127.0.0.1:8000/api/roles?page=${page}&search=${search}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json"
                }
            });
            const paginated = res.data.data;
            setroles(paginated.data);
            setPagination({
                current_page: paginated.current_page,
                last_page: paginated.last_page,
                per_page: paginated.per_page,
                total: paginated.total
            });
        } catch (error) {
            console.error("Gagal mengambil data role:", error);
            toast.error("Gagal mengambil data role 😞");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (searchTerm.trim() !== '') setLoading(true);
        const timeout = setTimeout(() => {
            fetchroles(searchTerm);
        }, 500);
        return () => clearTimeout(timeout);
    }, [searchTerm]);

    // 🔹 navigasi pagination
    const handlePageChange = (page) => {
        if (page < 1 || page > pagination.last_page) return;
        setLoading(true);
        fetchUsers(page, searchTerm);
    };

    // 🔹 Tambah atau edit role
    const handleSaveRoles = async () => {
        const { mode, editId } = modalData;
        console.log('FINAL FORM DATA:', formData);
        try {
            const url =
                mode === 'edit'
                    ? `http://127.0.0.1:8000/api/roles/${editId}`
                    : 'http://127.0.0.1:8000/api/roles';

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

            await fetchroles();
            setIsOpen(false);
            setFormData({ name: '', guard_name: '' });
            setErrors({});
            // ✅ Toast notifikasi sukses
            if (mode === 'edit') {
                toast.info("Role berhasil diperbarui");
            } else {
                toast.success("Role berhasil ditambahkan");
            }
        } catch (error) {
            console.error("❌ Error response:", error.response?.data);

            if (error.response?.status === 422) {
                // ✅ Ambil pesan error validasi dari Laravel
                setErrors(error.response.data.errors || {});
            } else {
                toast.error(mode === 'edit' ? "Gagal memperbarui role ⚠️" : "Gagal menambahkan role 🚫");
            }

        }
    };

    // 🔹 Buka modal Add
    const openAddRoleModal = () => {
        setFormData({ name: '', guard_name: '' });
        setErrors({}); // ✅ reset error
        setModalData({ title: 'Add New Role', mode: 'add', editId: null });
        setIsOpen(true);
    };
    // 🔹 Buka modal Edit
    const openEditRoleModal = (roles) => {
        setFormData({
            name: roles.name || '',
            guard_name: roles.guard_name || '',
            permissions: Array.isArray(roles.permissions) && roles.permissions.length > 0
                ? roles.permissions[0].name
                : '', // ambil role pertama
        });
        setErrors({}); // ✅ reset error
        setModalData({ title: 'Edit Role', mode: 'edit', editId: roles.id });
        setIsOpen(true);
    };

    const handleDeleteRoles = async () => {
        try {
            const res = await axios.delete(`http://127.0.0.1:8000/api/roles/${modalDataDelete.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });

            console.log("Berhasil menghapus Role:", res.data);
            await fetchroles(); // refresh data tabel
            setIsOpenDelete(false); // tutup modal
            toast.success("Role berhasil dihapus 🗑️");
        } catch (error) {
            setIsOpenDelete(false);
            console.error("Gagal menghapus Role:", error.response?.data || error.message);
            // Ambil pesan error dari controller Laravel
            const errorMessage =
                error.response?.data?.message ||
                "Terjadi kesalahan saat menghapus Role ❌";

            // Tampilkan di toast
            toast.error(errorMessage);

            // Jika mau, kamu juga bisa tampilkan pesan detail di console untuk debugging:
            if (error.response?.data?.error) {
                console.error("Detail error:", error.response.data.error);
            }
        }
    };

    const openModalDelete = (roles) => {
        setModalDataDelete({
            title: `Hapus user "${roles.name}"?`,
            id: roles.id,
        });
        setIsOpenDelete(true);
    };

    return (
        <DashboardPage>
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
        </DashboardPage >
    )
}

export default RoleManagement