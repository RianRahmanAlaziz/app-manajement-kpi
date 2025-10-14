import React from 'react'

function Inputrole({ formData, setFormData }) {

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

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
                <label htmlFor="guard_name" className="form-label">guard_name</label>
                <input
                    id="guard_name"
                    type="text"
                    name="guard_name"
                    value={formData.guard_name}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="guard_name"
                    required
                />
            </div>

        </>
    )
}

export default Inputrole