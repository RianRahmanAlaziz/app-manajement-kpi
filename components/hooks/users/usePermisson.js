'use client';
import { useState, useEffect } from 'react';
import axiosInstance from '@/lib/axiosInstance';
import { toast } from 'react-toastify';

export default function usePermisson() {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [permissions, setPermissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [errors, setErrors] = useState({});
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



    const fetchPermissions = async (page = 1, search = '') => {
        try {
            const res = await axiosInstance.get(`/permissions?page=${page}&search=${search}`);
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
        try {
            const url = mode === 'edit' ? `/permissions/${editId}` : '/permissions';
            const method = mode === 'edit' ? 'put' : 'post';

            await axiosInstance({ method, url, data: formData });

            await fetchPermissions();
            setIsOpen(false);
            setFormData({ name: '', guard_name: '' });
            setErrors({});
            // ✅ Toast notifikasi sukses
            if (mode === 'edit') {
                toast.info("Permissions berhasil diperbarui");
            } else {
                toast.success("Permissions berhasil ditambahkan");
            }
        } catch (error) {
            console.error("❌ Error response:", error.response?.data);

            if (error.response?.status === 422) {
                // ✅ Ambil pesan error validasi dari Laravel
                setErrors(error.response.data.errors || {});
            } else {
                toast.error(mode === 'edit' ? "Gagal memperbarui Permissions ⚠️" : "Gagal menambahkan Permissions 🚫");
            }
        }
    };

    // 🔹 Buka modal Add
    const openAddPermissionsModal = () => {
        setFormData({ name: '', guard_name: '' });
        setErrors({});
        setModalData({ title: 'Add New Permissions', mode: 'add', editId: null });
        setIsOpen(true);
    };
    // 🔹 Buka modal Edit
    const openEditPermissionsModal = (permissions) => {
        setFormData({
            name: permissions.name || '',
            guard_name: permissions.guard_name || '',
        });
        setErrors({});
        setModalData({ title: 'Edit Permissions', mode: 'edit', editId: permissions.id });
        setIsOpen(true);
    };

    const handleDeletePermissions = async () => {
        try {
            const res = await axiosInstance.delete(`/permissions/${modalDataDelete.id}`);
            console.log("Berhasil menghapus Permissions:", res.data);
            await fetchPermissions(); // refresh data tabel
            setIsOpenDelete(false); // tutup modal
            toast.success("Permissions berhasil dihapus 🗑️");
        } catch (error) {
            setIsOpenDelete(false); // tutup modal
            console.error("Gagal menghapus Permissions:", error.response?.data || error.message);
            // Ambil pesan error dari controller Laravel
            const errorMessage =
                error.response?.data?.message ||
                "Terjadi kesalahan saat menghapus Permissions ❌";

            // Tampilkan di toast
            toast.error(errorMessage);

            // Jika mau, kamu juga bisa tampilkan pesan detail di console untuk debugging:
            if (error.response?.data?.error) {
                console.error("Detail error:", error.response.data.error);
            }
        }
    };

    const openModalDelete = (permissions) => {
        setModalDataDelete({
            title: `Hapus user "${permissions.name}"?`,
            id: permissions.id,
        });
        setIsOpenDelete(true);
    };

    return {
        isOpen,
        isOpenDelete,
        permissions,
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
        handleSavePermissions,
        openAddPermissionsModal,
        openEditPermissionsModal,
        openModalDelete,
        handleDeletePermissions,
    };
}
