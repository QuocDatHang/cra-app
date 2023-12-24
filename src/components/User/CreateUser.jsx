import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { ThemeContext } from '../Context/ThemeContext'

const schema = yup.object({
    fullName: yup.string().required("Full name must not be empty"),
    password: yup.string().test('password', 'Must be more than 3 characters', val => val.length > 3),
    confirmPassword: yup.string().oneOf([yup.ref('password')], "Confirm Password is not correct"),
    gender: yup.string().required('Please choose gender')
}).required()

export default function CreateUser() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    });
    const handleCreateUser = (data) => {
        console.log(data);
    }
    const [showPassword, setShowPassword] = useState(false)

    const { theme, handleChangeTheme } = useContext(ThemeContext)

    return (
        <div className={`container w-25 ${theme} `}>
            <form onSubmit={handleSubmit(handleCreateUser)}>
                <h3>Login Form</h3>
                <div className="form-group mb-2">
                    <label>Full Name</label>
                    <input type="text" className={`form-control ${errors?.fullName?.message ? "is-invalid" : ""}`}
                        {...register("fullName")} />
                    <span className='invalid-feedback'>{errors?.fullName?.message}</span>
                </div>
                <div className="form-group mb-2">
                    <label>Password</label>
                    <input type="password" className={`form-control ${errors?.password?.message ? "is-invalid" : ""}`}
                        {...register("password")} />
                    <span className='invalid-feedback'>{errors?.password?.message}</span>
                </div>
                <div className="form-group mb-2">
                    <label>Confirm Password</label>
                    <input type={showPassword ? 'text' : 'password'} className={`form-control ${errors?.confirmPassword?.message ? "is-invalid" : ""}`}
                        {...register("confirmPassword")} />
                    <a href='#' className='text-warning' onClick={() => setShowPassword(!showPassword)}>Show Password</a>
                    <span className='invalid-feedback'>{errors?.confirmPassword?.message}</span>
                </div>
                <div className="form-group mb-2">
                    <label>Gender</label>
                    <select className={`form-control ${errors?.gender?.message ? "is-invalid" : ""}`} name="gender"
                        {...register("gender")} >
                        <option value="" hidden>Please choose</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    <span className='invalid-feedback'>{errors?.gender?.message}</span>
                </div>
                <button className='btn btn-info my-2'>Login</button>
                <button type='button' className='btn btn-dark m-2' onClick={() => reset()}>Cancel</button>
                <button type='button' className='btn btn-danger' onClick={handleChangeTheme} >Change Theme</button>
            </form>
        </div>
    )
}
