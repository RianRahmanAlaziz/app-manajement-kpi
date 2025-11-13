'use client';
import { useState, useEffect } from 'react';
import axiosInstance from '@/lib/axiosInstance';
import { toast } from 'react-toastify';

export default function useRole() {
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

    const fetchroles = async (page = 1, search = '') => {
        try {
            const res = await axiosInstance.get(`/roles?page=${page}&search=${search}`);
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
            const url = mode === 'edit' ? `/roles/${editId}` : '/roles';
            const method = mode === 'edit' ? 'put' : 'post';
            await axiosInstance({ method, url, data: formData });

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
            const res = await axiosInstance.delete(`/roles/${modalDataDelete.id}`);
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
    return {
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
    };
}
