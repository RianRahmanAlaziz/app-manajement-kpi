import React, { useState } from 'react';
import Select from "react-select";

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

        </>
    )
}

export default Inputrole