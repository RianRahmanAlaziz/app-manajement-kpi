'use client';
import { useState, useEffect } from 'react';
import axiosInstance from '@/lib/axiosInstance';
import { toast } from 'react-toastify';

export default function useDepartement() {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [departement, setDepartement] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        n_departement: "",
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

    const fetchDepartement = async (page = 1, search = '') => {
        try {
            const res = await axiosInstance.get(`/departement?page=${page}&search=${search}`);
            const paginated = res.data.data;
            setDepartement(paginated.data);
            setPagination({
                current_page: paginated.current_page,
                last_page: paginated.last_page,
                per_page: paginated.per_page,
                total: paginated.total
            });
        } catch (error) {
            console.error("Gagal mengambil data Departement:", error);
            toast.error("Gagal mengambil data Departement 😞");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (searchTerm.trim() !== '') setLoading(true);
        const timeout = setTimeout(() => {
            fetchDepartement(searchTerm);
        }, 500);
        return () => clearTimeout(timeout);
    }, [searchTerm]);

    // 🔹 navigasi pagination
    const handlePageChange = (page) => {
        if (page < 1 || page > pagination.last_page) return;
        setLoading(true);
        fetchDepartement(page, searchTerm);
    };
    // 🔹 Tambah atau edit Departement
    const handleSaveDepartement = async () => {
        const { mode, editId } = modalData;
        console.log('FINAL FORM DATA:', formData);

        try {
            const url = mode === 'edit' ? `/departement/${editId}` : '/departement';
            const method = mode === 'edit' ? 'put' : 'post';
            await axiosInstance({ method, url, data: formData });

            await fetchDepartement();
            setIsOpen(false);
            setFormData({ n_departement: '' });
            setErrors({});
            // ✅ Toast notifikasi sukses
            if (mode === 'edit') {
                toast.info("Departement berhasil diperbarui");
            } else {
                toast.success("Departement berhasil ditambahkan");
            }
        } catch (error) {
            console.error("❌ Error response:", error.response?.data);

            if (error.response?.status === 422) {
                // ✅ Ambil pesan error validasi dari Laravel
                setErrors(error.response.data.errors || {});
            } else {
                toast.error(mode === 'edit' ? "Gagal memperbarui Departement ⚠️" : "Gagal menambahkan Departement 🚫");
            }
        }
    };

    // 🔹 Buka modal Add
    const openAddDepartementModal = () => {
        setFormData({ n_departement: '' });
        setErrors({});
        setModalData({ title: 'Add New Departement', mode: 'add', editId: null });
        setIsOpen(true);
    };

    // 🔹 Buka modal Edit
    const openEditDepartementModal = (departement) => {
        setFormData({
            n_departement: departement.n_departement || ''
        });
        setErrors({});
        setModalData({ title: 'Edit Departement', mode: 'edit', editId: departement.id });
        setIsOpen(true);
    };

    const handleDeleteDepartement = async () => {
        try {
            const res = await axiosInstance.delete(`/departement/${modalDataDelete.id}`);
            console.log("Berhasil menghapus Departement:", res.data);
            await fetchDepartement(); // refresh data tabel
            setIsOpenDelete(false); // tutup modal
            toast.success("Departement berhasil dihapus 🗑️");
        } catch (error) {
            setIsOpenDelete(false); // tutup modal
            console.error("Gagal menghapus Departement:", error.response?.data || error.message);
            // Ambil pesan error dari controller Laravel
            const errorMessage =
                error.response?.data?.message ||
                "Terjadi kesalahan saat menghapus Departement ❌";

            // Tampilkan di toast
            toast.error(errorMessage);

            // Jika mau, kamu juga bisa tampilkan pesan detail di console untuk debugging:
            if (error.response?.data?.error) {
                console.error("Detail error:", error.response.data.error);
            }
        }
    };

    const openModalDelete = (departement) => {
        setModalDataDelete({
            title: `Hapus user "${departement.name}"?`,
            id: departement.id,
        });
        setIsOpenDelete(true);
    };
    return {
        isOpen,
        isOpenDelete,
        departement,
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
        handleSaveDepartement,
        openAddDepartementModal,
        openEditDepartementModal,
        openModalDelete,
        handleDeleteDepartement,
    };
}
