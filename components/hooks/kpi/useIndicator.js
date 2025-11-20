'use client';
import { useState, useEffect } from 'react';
import axiosInstance from '@/lib/axiosInstance';
import { toast } from 'react-toastify';

export default function useIndicator() {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [indicator, setIndicator] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({ kpicategory_id: '', name: '', description: '', unit: '' });
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0,
    });

    const [modalData, setModalData] = useState({ title: '', mode: 'add', editId: null });
    const [modalDataDelete, setModalDataDelete] = useState({ title: '', id: null });

    const fetchIndicator = async (page = 1, search = '') => {
        try {
            const res = await axiosInstance.get(`/kpi-indicator?page=${page}&search=${search}`);
            const paginated = res.data.data;
            setIndicator(paginated.data);
            setPagination({
                current_page: paginated.current_page,
                last_page: paginated.last_page,
                per_page: paginated.per_page,
                total: paginated.total,
            });
        } catch (error) {
            console.error('Gagal mengambil data Indicator:', error);
            toast.error('Gagal mengambil data Indocator');
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        if (searchTerm.trim() !== '') setLoading(true);
        const timeout = setTimeout(() => {
            fetchIndicator(1, searchTerm);
        }, 500);
        return () => clearTimeout(timeout);
    }, [searchTerm]);

    const handlePageChange = (page) => {
        if (page < 1 || page > pagination.last_page) return;
        setLoading(true);
        fetchIndicator(page, searchTerm);
    };

    const handleSaveIndicator = async () => {
        const { mode, editId } = modalData;
        try {
            const url = mode === 'edit' ? `/kpi-indicator/${editId}` : '/kpi-indicator';
            const method = mode === 'edit' ? 'put' : 'post';

            await axiosInstance({ method, url, data: formData });
            await fetchIndicator();
            setIsOpen(false);
            setFormData({ kpicategory_id: '', name: '', description: '', unit: '' });
            setErrors({});

            toast.success(
                mode === 'edit'
                    ? 'Indicator berhasil diperbarui ✅'
                    : 'Indicator berhasil ditambahkan ✅'
            );
        } catch (error) {
            console.error('❌ Error response:', error.response?.data);
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors || {});
            } else {
                toast.error('Gagal menyimpan data Indicator ⚠️');
            }
        }
    }

    // 🔹 Modal Add
    const openAddIndicatorModal = () => {
        setFormData({ kpicategory_id: '', name: '', description: '', unit: '' });
        setErrors({});
        setModalData({ title: 'Add New Indicator', mode: 'add', editId: null });
        setIsOpen(true);
    };

    // 🔹 Modal Edit
    const openEditIndicatorModal = (indicator) => {
        setFormData({
            kpicategory_id: indicator?.KpiCategories?.id || '',
            name: indicator.name || '',
            description: indicator.description || '',
            unit: indicator.unit || '',
        });
        setErrors({});
        setModalData({ title: 'Edit Indicator', mode: 'edit', editId: indicator.id });
        setIsOpen(true);
    };

    const openModalDelete = (indicator) => {
        setModalDataDelete({ title: `Hapus Indicator "${indicator.name}"?`, id: indicator.id });
        setIsOpenDelete(true);
    };

    const handleDeleteIndicator = async () => {
        try {
            await axiosInstance.delete(`/kpi-indicator/${modalDataDelete.id}`);
            await fetchIndicator();
            setIsOpenDelete(false);
            toast.success('Indicator berhasil dihapus 🗑️');
        } catch (error) {
            setIsOpenDelete(false);
            console.error('Gagal menghapus Indicator:', error.response?.data);
            toast.error(
                error.response?.data?.message || 'Terjadi kesalahan saat menghapus Indicator'
            );
        }
    };

    return {
        isOpen,
        isOpenDelete,
        indicator,
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
        handleSaveIndicator,
        openAddIndicatorModal,
        openEditIndicatorModal,
        openModalDelete,
        handleDeleteIndicator,
    };
}
