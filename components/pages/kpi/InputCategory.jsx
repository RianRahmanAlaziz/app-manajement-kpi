import React from 'react'

function InputCategory({ formData, setFormData, errors, setErrors }) {
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
            <div className="col-span-12">
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
            <div className="col-span-12">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                    name="description"
                    id="description"
                    onChange={handleChange}
                    className="form-control"
                    required
                >
                    {formData.description || ''}
                </textarea>

                {errors?.description && (
                    <small className="text-danger">{errors.description[0]}</small>
                )}
            </div>

        </>
    )
}

export default InputCategory