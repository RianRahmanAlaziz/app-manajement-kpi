import React from 'react'
import { useState } from 'react'

function Adduser({ onSubmit }) {
    const [form, setForm] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    };
    return (
        <>
            <div className="col-span-6 sm:col-span-12">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="example@gmail.com"
                    required
                />
            </div>
            <div className="col-span-6 sm:col-span-12">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                    id="password"
                    type="text"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="form-control"
                    required
                />
            </div>
        </>
    )
}

export default Adduser