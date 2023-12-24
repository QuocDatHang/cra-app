import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup"


const schema = yup.object({
    fullName: yup.string().required("Full name must not be empty"),
    gender: yup.string().required("Gender must not be empty"),
    address: yup.string().required("Full name must not be empty"),
    age: yup.number().required("Age must not be empty").typeError("Please enter a number")
})
export default function AddUser() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    })

    const handleAddUser = (data) => {
        fetch('https://65829b9202f747c83679b1ac.mockapi.io/users', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(res => {
            if (res.ok) {
                alert('Create user success')
            }
            else {
                alert('Create user fail')
            }
        })
    }
    return (
        <>
            <form onSubmit={handleSubmit(handleAddUser)}>
                <div className="row mb-2">
                    <div className="col-6">
                        <label>Full Name</label>
                        <input type="text" className="form-control" {...register('fullName')} />
                        <span className="text-danger">{errors?.fullName?.message}</span>
                    </div>
                    <div className="col-6">
                        <label>Gender:</label>
                        <select className="form-control" {...register('gender')}>
                            <option value="" selected>Please choose</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        <span className="text-danger">{errors?.gender?.message}</span>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-6">
                        <label>Address</label>
                        <input type="text" className="form-control" {...register('address')} />
                        <span className="text-danger">{errors?.address?.message}</span>
                    </div>
                    <div className="col-6">
                        <label>Age</label>
                        <input type="number" className="form-control" {...register('age')} />
                        <span className="text-danger">{errors?.age?.message}</span>
                    </div>
                </div>
                <button className='btn btn-success my-2'>Login</button>
                <button type='button' className='btn btn-dark m-2' onClick={() => reset()}>Cancel</button>
            </form>
        </>
    )
}