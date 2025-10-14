'use client';
import DashboardPage from '../../page'
import Image from 'next/image'
import Tippy from '@tippyjs/react'; // ✅ dari React
import { CheckSquare, Trash2, ChevronLeft, ChevronsLeft, ChevronRight, ChevronsRight, UserPlus } from 'lucide-react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import Modal from '../../../../components/common/Modal';
import { motion } from "framer-motion";
import Adduser from '../../../../components/pages/users/Adduser';
import Modaldelete from '../../../../components/common/Modaldelete';

function PageUsers() {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });


    // modalData: hanya metadata (jangan simpan JSX di sini)
    const [modalData, setModalData] = useState({
        title: '',
        mode: 'add', // 'add' | 'edit'
        editId: null, // id user kalau edit
    });

    const [modalDataDelete, setModalDataDelete] = useState({
        title: '',
    });

    // ✅ ambil token dari localStorage (disimpan saat login)
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    // ✅ ambil data user dari API Laravel
    const fetchUsers = async () => {
        try {
            const res = await axios.get("http://127.0.0.1:8000/api/users", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json"
                }
            });
            setUsers(res.data.data);
        } catch (error) {
            console.error("Gagal mengambil data user:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
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
        } catch (error) {
            console.error(
                mode === 'edit' ? 'Gagal mengupdate user:' : 'Gagal menambahkan user:',
                error.response?.data || error.message
            );
        }
    };

    // 🔹 Buka modal Add
    const openAddUserModal = () => {
        setFormData({ name: '', email: '', password: '' });
        setModalData({ title: 'Add New User', mode: 'add', editId: null });
        setIsOpen(true);
    };
    // 🔹 Buka modal Edit
    const openEditUserModal = (user) => {
        setFormData({ name: user.name || '', email: user.email || '', password: '' });
        setModalData({ title: 'Edit User', mode: 'edit', editId: user.id });
        setIsOpen(true);
    };

    const handleDeleteUser = async () => {
        try {
            const res = await axios.delete(`http://127.0.0.1:8000/api/users/${modalDataDelete.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });

            console.log("Berhasil menghapus user:", res.data);
            await fetchUsers(); // refresh data tabel
            setIsOpenDelete(false); // tutup modal
        } catch (error) {
            console.error("Gagal menghapus user:", error.response?.data || error.message);
        }
    };

    const openModalDelete = (user) => {
        setModalDataDelete({
            title: `Hapus user "${user.name}"?`,
            id: user.id,
        });
        setIsOpenDelete(true);
    };

    return (
        <DashboardPage>
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
                                <th className="text-center whitespace-nowrap">ROLE</th>
                                <th className="text-center whitespace-nowrap">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="4" className="text-center py-4">Loading...</td>
                                </tr>
                            ) : users.length > 0 ? (
                                users.map((user, index) => (
                                    <motion.tr key={user.id} whileHover={{ scale: 1.03 }}>
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
                                            <div className="flex items-center justify-center text-success">
                                                <CheckSquare className="w-4 h-4 mr-2" /> Active
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
                <Adduser formData={formData} setFormData={setFormData} />
            </Modal>

            <Modaldelete
                isOpenDelete={isOpenDelete}
                onClose={() => setIsOpenDelete(false)}
                onDelete={handleDeleteUser}
                title={modalDataDelete.title}
            >
                {modalDataDelete.content}
            </Modaldelete>
        </DashboardPage>
    )
}

export default PageUsers