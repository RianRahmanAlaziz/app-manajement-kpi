import React, { useEffect, useState } from 'react'
import axiosInstance from '@/lib/axiosInstance';
import Select from "react-select";

function Adduser({ formData, setFormData, errors, setErrors }) {
    const [roles, setRoles] = useState([])
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
        const fetchRoles = async () => {
            try {
                const res = await axiosInstance.get(`/roles`);
                setRoles(res.data.data.data)
            } catch (error) {
                console.error("Gagal memuat role:", error)
            }
            finally {
                setLoading(false); // ⬅️ Set loading ke false setelah data selesai di-load
            }
        }
        fetchRoles()
    }, [])
    const options = roles.map((role) => ({
        value: role.name,
        label: role.name,
    }));



    return (
        <>
            <div className="col-span-6 sm:col-span-12">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
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
                <label htmlFor="email" className="form-label">Email</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="example@gmail.com"
                    required
                />
                {errors?.email && (
                    <small className="text-danger">{errors.email[0]}</small>
                )}
            </div>
            <div className="col-span-6 sm:col-span-12">
                <label htmlFor="roles" className="form-label">Role</label>
                <Select
                    id="roles"
                    name="roles"
                    options={options}
                    placeholder={loading ? "Memuat data role..." : "Pilih Role"}
                    value={options.find((opt) => opt.value === formData.roles) || null}
                    onChange={(selected) => handleChange({ target: { name: "roles", value: selected?.value } })}
                    isSearchable={false}
                    isLoading={loading}     // ⬅️ Aktifkan spinner bawaan react-select
                    isDisabled={loading}
                    className="form-control"
                    classNamePrefix="react-select"
                />
            </div>
            <div className="col-span-6 sm:col-span-12">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="********"
                    required
                />
            </div>
        </>
    )
}

export default Adduser;
