import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Adduser({ formData, setFormData }) {
    const [roles, setRoles] = useState([])

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const token = localStorage.getItem("token")
                const res = await axios.get("http://127.0.0.1:8000/api/roles", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                })
                setRoles(res.data.data)
            } catch (error) {
                console.error("Gagal memuat role:", error)
            }
        }
        fetchRoles()
    }, [])
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
                />
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
            </div>
            <div className="col-span-6 sm:col-span-12">
                <label htmlFor="roles" className="form-label">Role</label>
                <select
                    id="roles"
                    name="roles"
                    value={formData.roles || ""}
                    onChange={handleChange}
                    className="form-select"
                    required
                >
                    <option value="">Pilih Role</option>
                    {roles.map(roles => (
                        <option key={roles.id} value={roles.name}>
                            {roles.name}
                        </option>
                    ))}
                </select>
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
