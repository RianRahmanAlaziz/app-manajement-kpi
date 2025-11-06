import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Select from "react-select";

function Inputrole({ formData, setFormData, errors, setErrors }) {
    const [permissions, setPermissions] = useState([])
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
        const fetchPermissions = async () => {
            try {
                const token = localStorage.getItem("token")
                const res = await axios.get("http://127.0.0.1:8000/api/permissions", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                })
                setPermissions(res.data.data.data)
            } catch (error) {
                console.error("Gagal memuat Permissions:", error)
            }
            finally {
                setLoading(false); // ⬅️ Set loading ke false setelah data selesai di-load
            }
        }
        fetchPermissions()
    }, [])

    const Permissionsoptions = permissions.map((permission) => ({
        value: permission.name,
        label: permission.name,
    }));

    const guardOptions = [
        { value: "web", label: "Web" },
        { value: "api", label: "Api" },
    ];
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
                />
                {errors?.name && (
                    <small className="text-danger">{errors.name[0]}</small>
                )}
            </div>
            <div className="col-span-6 sm:col-span-12">
                <label htmlFor="guard_name" className="form-label">guard_name</label>

                <Select
                    id="guard_name"
                    name="guard_name"
                    placeholder="-- Pilih Guard --"
                    options={guardOptions}
                    value={guardOptions.find((option) => option.value === formData.guard_name) || null}
                    onChange={(selected) => handleChange({ target: { name: "guard_name", value: selected?.value } })}
                    className="form-control"
                    classNamePrefix="react-select"
                    isSearchable={false}
                />
                {errors?.guard_name && (
                    <small className="text-danger">{errors.guard_name[0]}</small>
                )}
            </div>
            <div className="col-span-6 sm:col-span-12">
                <label htmlFor="permissions" className="form-label">Permissions</label>
                <Select
                    id="permissions"
                    name="permissions"
                    options={Permissionsoptions}
                    placeholder={loading ? "Memuat data Permissions..." : "Pilih Permissions"}
                    value={Permissionsoptions.find((opt) => opt.value === formData.permissions) || null}
                    onChange={(selected) => handleChange({ target: { name: "permissions", value: selected?.value } })}
                    isSearchable={false}
                    isLoading={loading}     // ⬅️ Aktifkan spinner bawaan react-select
                    isDisabled={loading}
                    className="form-control"
                    classNamePrefix="react-select"
                />
            </div>

        </>
    )
}

export default Inputrole