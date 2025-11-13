'use client';
import { useState, useEffect } from 'react';
import axiosInstance from '@/lib/axiosInstance';
import { toast } from 'react-toastify';

export default function useUser() {

    const [isOpen, setIsOpen] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [users, setUsers] = useState([]);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0
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

    const fetchUsers = async (page = 1, search = '') => {
        try {
            const res = await axiosInstance.get(`/users?page=${page}&search=${search}`);
            const paginated = res.data.data;
            setUsers(paginated.data);
            setPagination({
                current_page: paginated.current_page,
                last_page: paginated.last_page,
                per_page: paginated.per_page,
                total: paginated.total
            });
        } catch (error) {
            console.error("Gagal mengambil data user:", error);
            toast.error("Gagal mengambil data user 😞");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (searchTerm.trim() !== '') setLoading(true);
        const timeout = setTimeout(() => {
            fetchUsers(searchTerm);
        }, 500);
        return () => clearTimeout(timeout);
    }, [searchTerm]);

    // 🔹 navigasi pagination
    const handlePageChange = (page) => {
        if (page < 1 || page > pagination.last_page) return;
        setLoading(true);
        fetchUsers(page, searchTerm);
    };

    // 🔹 Tambah atau edit user
    const handleSaveUser = async () => {
        const { mode, editId } = modalData;
        console.log('FINAL FORM DATA:', formData);

        try {
            const url = mode === 'edit' ? `/users/${editId}` : '/auth/register';
            const method = mode === 'edit' ? 'put' : 'post';
            await axiosInstance({ method, url, data: formData });

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
        setModalData({ title: 'Add New User', mode: 'add', editId: null });
        setIsOpen(true);
    };
    // 🔹 Buka modal Edit
    const openEditUserModal = (user) => {
        setFormData({
            name: user.name || '',
            email: user.email || '',
            password: '',
            roles: Array.isArray(user.roles) && user.roles.length > 0
                ? user.roles[0].name
                : '', // ambil role pertama
        });
        setModalData({ title: 'Edit User', mode: 'edit', editId: user.id });
        setIsOpen(true);
    };

    const handleDeleteUser = async () => {
        try {
            const res = await axiosInstance.delete(`/users/${modalDataDelete.id}`);

            console.log("Berhasil menghapus user:", res.data);
            await fetchUsers(); // refresh data tabel
            setIsOpenDelete(false); // tutup modal
            toast.success("User berhasil dihapus 🗑️");
        } catch (error) {
            console.error("Gagal menghapus user:", error.response?.data || error.message);
            toast.error("Gagal menghapus user ❌");
        }
    };

    const openModalDelete = (user) => {
        setModalDataDelete({
            title: `Hapus user "${user.name}"?`,
            id: user.id,
        });
        setIsOpenDelete(true);
    };
    return {
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
    };
}
