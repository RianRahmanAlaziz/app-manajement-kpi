import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Select from "react-select";

function InputJabatan({ formData, setFormData, errors, setErrors }) {
    const [departement, setDepartement] = useState([])
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
        const fetchDepartement = async () => {
            try {
                const token = localStorage.getItem("token")
                const res = await axios.get("http://127.0.0.1:8000/api/departement", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                })
                setDepartement(res.data.data.data)
            } catch (error) {
                console.error("Gagal memuat Departement:", error)
            }
            finally {
                setLoading(false); // ⬅️ Set loading ke false setelah data selesai di-load
            }
        }
        fetchDepartement()
    }, [])

    const DepartementOptions = departement.map((dept) => ({
        value: dept.id,
        label: dept.n_departement,
    }));


    return (
        <>
            <div className="col-span-6 sm:col-span-12">
                <label htmlFor="n_jabatan" className="form-label">Name</label>
                <input
                    id="n_jabatan"
                    type="text"
                    name="n_jabatan"
                    value={formData.n_jabatan || ''}
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
                <label htmlFor="departement_id" className="form-label">Departement</label>
                <Select
                    id="departement_id"
                    name="departement_id"
                    options={DepartementOptions}
                    placeholder={loading ? "Memuat data Departement..." : "Pilih Departement"}
                    value={DepartementOptions.find((opt) => opt.value === formData.departement_id) || null}
                    onChange={(selected) => handleChange({ target: { name: "departement_id", value: selected?.value } })}
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

export default InputJabatan