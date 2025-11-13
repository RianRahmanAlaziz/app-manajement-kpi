'use client';
import { useState, useEffect } from 'react';
import axiosInstance from '@/lib/axiosInstance';
import { toast } from 'react-toastify';

export default function useCategory() {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({ name: '', description: '' });
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0,
    });

    const [modalData, setModalData] = useState({ title: '', mode: 'add', editId: null });
    const [modalDataDelete, setModalDataDelete] = useState({ title: '', id: null });

    // 🔹 Ambil data Category
    const fetchCategory = async (page = 1, search = '') => {
        try {
            const res = await axiosInstance.get(`/kpi-category?page=${page}&search=${search}`);
            const paginated = res.data.data;

            setCategory(paginated.data);
            setPagination({
                current_page: paginated.current_page,
                last_page: paginated.last_page,
                per_page: paginated.per_page,
                total: paginated.total,
            });
        } catch (error) {
            console.error('Gagal mengambil data Category:', error);
            toast.error('Gagal mengambil data Category 😞');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (searchTerm.trim() !== '') setLoading(true);
        const timeout = setTimeout(() => {
            fetchCategory(1, searchTerm);
        }, 500);
        return () => clearTimeout(timeout);
    }, [searchTerm]);

    // 🔹 Pagination
    const handlePageChange = (page) => {
        if (page < 1 || page > pagination.last_page) return;
        setLoading(true);
        fetchCategory(page, searchTerm);
    };

    // 🔹 Simpan (Tambah/Edit)
    const handleSaveCategory = async () => {
        const { mode, editId } = modalData;
        try {
            const url = mode === 'edit' ? `/kpi-category/${editId}` : '/kpi-category';
            const method = mode === 'edit' ? 'put' : 'post';

            await axiosInstance({ method, url, data: formData });

            await fetchCategory();
            setIsOpen(false);
            setFormData({ name: '', description: '' });
            setErrors({});

            toast.success(
                mode === 'edit'
                    ? 'Category berhasil diperbarui ✅'
                    : 'Category berhasil ditambahkan ✅'
            );
        } catch (error) {
            console.error('❌ Error response:', error.response?.data);
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors || {});
            } else {
                toast.error('Gagal menyimpan data Category ⚠️');
            }
        }
    };

    // 🔹 Modal Add
    const openAddCategoryModal = () => {
        setFormData({ name: '', description: '' });
        setErrors({});
        setModalData({ title: 'Add New Category', mode: 'add', editId: null });
        setIsOpen(true);
    };

    // 🔹 Modal Edit
    const openEditCategoryModal = (category) => {
        setFormData({
            name: category.name || '',
            description: category.description || '',
        });
        setErrors({});
        setModalData({ title: 'Edit Category', mode: 'edit', editId: category.id });
        setIsOpen(true);
    };

    // 🔹 Modal Delete
    const openModalDelete = (category) => {
        setModalDataDelete({ title: `Hapus category "${category.name}"?`, id: category.id });
        setIsOpenDelete(true);
    };

    // 🔹 Hapus Data
    const handleDeleteCategory = async () => {
        try {
            await axiosInstance.delete(`/kpi-category/${modalDataDelete.id}`);
            await fetchCategory();
            setIsOpenDelete(false);
            toast.success('Category berhasil dihapus 🗑️');
        } catch (error) {
            setIsOpenDelete(false);
            console.error('Gagal menghapus Category:', error.response?.data);
            toast.error(
                error.response?.data?.message || 'Terjadi kesalahan saat menghapus Category'
            );
        }
    };

    return {
        isOpen,
        isOpenDelete,
        category,
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
        handleSaveCategory,
        openAddCategoryModal,
        openEditCategoryModal,
        openModalDelete,
        handleDeleteCategory,
    };
}
