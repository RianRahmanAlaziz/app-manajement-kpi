import Select from "react-select";

function InputDepartement({ formData, setFormData, errors, setErrors }) {
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
                <label htmlFor="n_departement" className="form-label">Name</label>
                <input
                    id="n_departement"
                    type="text"
                    name="n_departement"
                    value={formData.n_departement || ''}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Name"
                    required
                />
                {errors?.name && (
                    <small className="text-danger">{errors.name[0]}</small>
                )}
            </div>


        </>
    )
}

export default InputDepartement