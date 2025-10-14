'use client';
import axios from 'axios';
import { useState, useEffect } from 'react'
import { motion } from "framer-motion";
import DashboardPage from '../../page';
import Modal from '../../../../components/common/Modal';
import { CheckSquare, Trash2, ChevronLeft, ChevronsLeft, ChevronRight, ChevronsRight, UserPlus } from 'lucide-react'
import Inputrole from '../../../../components/pages/roles/Inputrole';

function RoleManagement() {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [roles, setroles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        guard_name: "",
    });

    const [modalData, setModalData] = useState({
        title: '',
        mode: 'add', // 'add' | 'edit'
        editId: null, // id user kalau edit
    });

    const [modalDataDelete, setModalDataDelete] = useState({
        title: '',
    });

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const fetchroles = async () => {
        try {
            const res = await axios.get("http://127.0.0.1:8000/api/roles", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json"
                }
            });
            setroles(res.data.data);
        } catch (error) {
            console.error("Gagal mengambil data user:", error);
            toast.error("Gagal mengambil data user 😞");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchroles();
    }, []);

    // 🔹 Tambah atau edit user
    const handleSaveUser = async () => {
        const { mode, editId } = modalData;
        console.log('FINAL FORM DATA:', formData);

        try {
            const url =
                mode === 'edit'
                    ? `http://127.0.0.1:8000/api/users/${editId}`
                    : 'http://127.0.0.1:8000/api/auth/register';

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

            await fetchUsers();
            setIsOpen(false);
            setFormData({ name: '', email: '', password: '' });
            // ✅ Toast notifikasi sukses
            if (mode === 'edit') {
                toast.info("User berhasil diperbarui");
            } else {
                toast.success("User berhasil ditambahkan");
            }
        } catch (error) {
            console.error(
                mode === 'edit' ? 'Gagal mengupdate user:' : 'Gagal menambahkan user:',
                error.response?.data || error.message
            );
            toast.error(mode === 'edit' ? "Gagal memperbarui user ⚠️" : "Gagal menambahkan user 🚫");
        }
    };

    // 🔹 Buka modal Add
    const openAddUserModal = () => {
        setFormData({ name: '', email: '', password: '' });
        setModalData({ title: 'Add New Role', mode: 'add', editId: null });
        setIsOpen(true);
    };

    return (
        <DashboardPage>
            <h2 className="intro-y text-lg font-medium pt-24">
                Role Management
            </h2>
            <div className="grid grid-cols-12 gap-6 mt-5">
                <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
                    <button
                        onClick={openAddUserModal}
                        className="btn btn-secondary shadow-md mr-2">
                        <UserPlus className='pr-1.5' /> New Role
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
                                <th className="whitespace-nowrap"> NAME</th>
                                <th className="text-center whitespace-nowrap">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="4" className="text-center py-4">Loading...</td>
                                </tr>
                            ) : roles.length > 0 ? (
                                [...roles]
                                    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at)) // ⬅️ urutkan dari yang TERLAMA
                                    .map((roles, index) => (
                                        <motion.tr key={roles.id} whileHover={{ scale: 1.02 }}>

                                            <td>
                                                <span className="font-medium whitespace-nowrap">{roles.name}</span>
                                                <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">{roles.guard_name}</div>
                                            </td>
                                            <td className="table-report__action w-56">
                                                <div className="flex justify-center items-center">
                                                    <button

                                                        className="flex items-center mr-3"
                                                    >
                                                        <CheckSquare className="w-4 h-4 mr-1" /> Edit
                                                    </button>
                                                    <button

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

            {/* 🔹 Modal Add/Edit */}
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title={modalData.title}
                onSave={handleSaveUser}
            >
                <Inputrole formData={formData} setFormData={setFormData} />
            </Modal>

            {/* <Modaldelete
                isOpenDelete={isOpenDelete}
                onClose={() => setIsOpenDelete(false)}
                onDelete={handleDeleteUser}
                title={modalDataDelete.title}
            >
                {modalDataDelete.content}
            </Modaldelete> */}
        </DashboardPage >
    )
}

export default RoleManagement