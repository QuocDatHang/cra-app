import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const schema = yup.object({
    fullName: yup.string().required(),
    password: yup.string().required()
}).required()

export default function CreateUser() {
    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(schema)
    });
    const handleCreateUser = (data) => {
        console.log(data);
    }

    return (
        <div className='container w-25 bg-success '>
            <form onSubmit={handleSubmit(handleCreateUser)}>
                <h3>Login Form</h3>
                <div className="form-group mb-2">
                    <label>Full Name</label>
                    <input type="text" className='form-control' {...register("fullName")} />
                    <span>{errors?.fullName?.message}</span>
                </div>
                <div className="form-group mb-2">
                    <label>Password</label>
                    <input type="text" className='form-control' {...register("password")} />
                </div>
                <button className='btn btn-dark my-2'>Login</button>
            </form>
        </div>
    )
}
