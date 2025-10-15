import React from 'react'

function InputPermissions({ formData, setFormData }) {
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
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
            </div>
            <div className="col-span-6 sm:col-span-12">
                <label htmlFor="guard_name" className="form-label">guard_name</label>

                <select
                    id="guard_name"
                    name="guard_name"
                    value={formData.guard_name || ""}
                    onChange={handleChange}
                    className="form-select"
                    required
                >
                    <option value="">-- Pilih Guard --</option>
                    <option value="web">Web</option>
                    <option value="api">Api</option>
                </select>
            </div>

        </>
    )
}

export default InputPermissions