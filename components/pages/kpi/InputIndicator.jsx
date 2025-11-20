import React, { useEffect, useState } from 'react'
import axiosInstance from '@/lib/axiosInstance';
import Select from "react-select";

function InputIndicator({ formData, setFormData, errors, setErrors }) {
    const [category, setCategory] = useState([])
    const [loading, setLoading] = useState(true)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        if (errors && errors[e.target.name]) {
            setErrors({
                ...errors,
                [e.target.name]: undefined,
            });
        }
    };

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const res = await axiosInstance.get(`/kpi-category`);

                setCategory(res.data.data.data)
            } catch (error) {
                console.error("Gagal memuat Category:", error)
            }
            finally {
                setLoading(false); // ⬅️ Set loading ke false setelah data selesai di-load
            }
        }
        fetchCategory()
    }, [])

    const CategoryOptions = category.map((dept) => ({
        value: dept.id,
        label: dept.name,
    }));
    return (
        <>
            <div className="col-span-6 sm:col-span-12">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name || ''}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Name"
                    required
                    autoFocus
                />
                {errors?.name && (
                    <small className="text-danger">{errors.name[0]}</small>
                )}
            </div>
            <div className="col-span-6 sm:col-span-12">
                <label htmlFor="kpicategory_id" className="form-label">Category</label>
                <Select
                    id="kpicategory_id"
                    name="kpicategory_id"
                    options={CategoryOptions}
                    placeholder={loading ? "Memuat data Category..." : "Pilih Category"}
                    value={CategoryOptions.find((opt) => opt.value === formData.kpicategory_id) || null}
                    onChange={(selected) => handleChange({ target: { name: "kpicategory_id", value: selected?.value } })}
                    isSearchable={false}
                    isLoading={loading}     // ⬅️ Aktifkan spinner bawaan react-select
                    isDisabled={loading}
                    autoFocus
                    className="form-control"
                    classNamePrefix="react-select"
                />
            </div>
            <div className="col-span-12">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                    name="description"
                    id="description"
                    onChange={handleChange}
                    className="form-control"
                    required
                    value={formData.description || ''}
                />
                {errors?.description && (
                    <small className="text-danger">{errors.description[0]}</small>
                )}
            </div>

        </>
    )
}

export default InputIndicator