import React, { useState } from 'react';

function Inputrole({ formData, setFormData, errors, setErrors }) {


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
                {errors?.guard_name && (
                    <small className="text-danger">{errors.guard_name[0]}</small>
                )}
            </div>

        </>
    )
}

export default Inputrole