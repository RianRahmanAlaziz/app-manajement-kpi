'use client';
import { useState, useEffect } from 'react';
import axiosInstance from '@/lib/axiosInstance';
import { toast } from 'react-toastify';

export default function useJabatan() {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [jabatan, setJabatan] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        n_jabatan: "",
        departement_id: "",
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
        editId: null, // id jabatan kalau edit
    });

    const [modalDataDelete, setModalDataDelete] = useState({
        title: '',
    });

    const fetchJabatan = async (page = 1, search = '') => {
        try {
            const res = await axiosInstance.get(`/jabatan?page=${page}&search=${search}`);
            const paginated = res.data.data;
            setJabatan(paginated.data);
            setPagination({
                current_page: paginated.current_page,
                last_page: paginated.last_page,
                per_page: paginated.per_page,
                total: paginated.total
            });
        } catch (error) {
            console.error("Gagal mengambil data Jabatan:", error);
            toast.error("Gagal mengambil data Jabatan 😞");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (searchTerm.trim() !== '') setLoading(true);
        const timeout = setTimeout(() => {
            fetchJabatan(searchTerm);
        }, 500);
        return () => clearTimeout(timeout);
    }, [searchTerm]);

    // 🔹 navigasi pagination
    const handlePageChange = (page) => {
        if (page < 1 || page > pagination.last_page) return;
        setLoading(true);
        fetchJabatan(page, searchTerm);
    };
    // 🔹 Tambah atau edit Jabatan
    const handleSaveJabatan = async () => {
        const { mode, editId } = modalData;
        console.log('FINAL FORM DATA:', formData);

        try {
            const url = mode === 'edit' ? `/jabatan/${editId}` : '/jabatan';
            const method = mode === 'edit' ? 'put' : 'post';
            await axiosInstance({ method, url, data: formData });

            await fetchJabatan();
            setIsOpen(false);
            setFormData({ name: '', departement_id: '' });
            setErrors({});
            // ✅ Toast notifikasi sukses
            if (mode === 'edit') {
                toast.info("Jabatan berhasil diperbarui");
            } else {
                toast.success("Jabatan berhasil ditambahkan");
            }
        } catch (error) {
            console.error("❌ Error response:", error.response?.data);

            if (error.response?.status === 422) {
                // ✅ Ambil pesan error validasi dari Laravel
                setErrors(error.response.data.errors || {});
            } else {
                toast.error(mode === 'edit' ? "Gagal memperbarui Jabatan ⚠️" : "Gagal menambahkan Jabatan 🚫");
            }
        }
    };

    // 🔹 Buka modal Add
    const openAddJabatanModal = () => {
        setFormData({ n_jabatan: '' });
        setErrors({});
        setModalData({ title: 'Add New Jabatan', mode: 'add', editId: null });
        setIsOpen(true);
    };

    // 🔹 Buka modal Edit
    const openEditJabatanModal = (jabatan) => {
        setFormData({
            n_jabatan: jabatan.n_jabatan || '',
            departement_id: jabatan?.departement?.id || '',
        });
        setErrors({});
        setModalData({ title: 'Edit Jabatan', mode: 'edit', editId: jabatan.id });
        setIsOpen(true);
    };

    const handleDeleteJabatan = async () => {
        try {
            const res = await axiosInstance.delete(`/jabatan/${modalDataDelete.id}`);
            console.log("Berhasil menghapus Jabatan:", res.data);
            await fetchJabatan(); // refresh data tabel
            setIsOpenDelete(false); // tutup modal
            toast.success("Jabatan berhasil dihapus 🗑️");
        } catch (error) {
            setIsOpenDelete(false); // tutup modal
            console.error("Gagal menghapus Jabatan:", error.response?.data || error.message);
            // Ambil pesan error dari controller Laravel
            const errorMessage =
                error.response?.data?.message ||
                "Terjadi kesalahan saat menghapus Jabatan ❌";

            // Tampilkan di toast
            toast.error(errorMessage);

            // Jika mau, kamu juga bisa tampilkan pesan detail di console untuk debugging:
            if (error.response?.data?.error) {
                console.error("Detail error:", error.response.data.error);
            }
        }
    };

    const openModalDelete = (jabatan) => {
        setModalDataDelete({
            title: `Hapus user "${jabatan.name}"?`,
            id: jabatan.id,
        });
        setIsOpenDelete(true);
    };
    return {
        isOpen,
        isOpenDelete,
        jabatan,
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
        handleSaveJabatan,
        openAddJabatanModal,
        openEditJabatanModal,
        openModalDelete,
        handleDeleteJabatan,
    };
}
