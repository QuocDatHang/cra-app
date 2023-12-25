import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup"


const schema = yup.object({
    fullName: yup.string().required("Full name must not be empty"),
    gender: yup.string().required("Gender must not be empty"),
    address: yup.string().required("Full name must not be empty"),
    age: yup.number().required("Age must not be empty").typeError("Please enter a number")
})
export default function AddUser({ setUsers, setLoading, userId, setUserId, isEdit, setIsEdit, setAddUser }) {
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        resolver: yupResolver(schema)
    })
    // const [userEditId, setUserEditId] = useState()

    // if (userId != userEditId) {
    //     setUserEditId(userId)
    // }

    useEffect(() => {
        setLoading(true);
        console.log(userId);
        fetch(`https://65829b9202f747c83679b1ac.mockapi.io/users/${userId}`)
            .then((res) => res.json())
            .then((result) => {
                setValue("fullName", result.fullName)
                setValue("gender", result.gender)
                setValue("address", result.address)
                setValue("age", result.age)

                setLoading(false)
            })
    }, [userId])

    const handleAddUser = (data) => {
        console.log(data);
        fetch('https://65829b9202f747c83679b1ac.mockapi.io/users', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(res => {
            if (res.ok) {
                toast.success('Create user successful!')
                setLoading(true);
                reset();
                setAddUser(false)
                fetch('https://65829b9202f747c83679b1ac.mockapi.io/users')
                    .then((res) => res.json())
                    .then((result) => {
                        setUsers(result);
                        setLoading(false);
                    })
            }
            else {
                toast.error('Create user fail')
            }
        })
    }

    const handleConfirmEdit = ()
    return (
        <>
            <form onSubmit={handleSubmit(handleAddUser)}>
                <div className="row mb-2">
                    <div className="col-6">
                        <label>Full Name</label>
                        <input type="text" className={`form-control ${errors?.fullName?.message ? "is-invalid" : ""}`}
                            {...register('fullName')} />
                        <span className="text-danger">{errors?.fullName?.message}</span>
                    </div>
                    <div className="col-6">
                        <label>Gender:</label>
                        <select className={`form-control ${errors?.gender?.message ? "is-invalid" : ""}`}
                            {...register('gender')}>
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
                        <input type="text" className={`form-control ${errors?.address?.message ? "is-invalid" : ""}`}
                            {...register('address')} />
                        <span className="text-danger">{errors?.address?.message}</span>
                    </div>
                    <div className="col-6">
                        <label>Age</label>
                        <input type="number" className={`form-control ${errors?.age?.message ? "is-invalid" : ""}`}
                            {...register('age')} />
                        <span className="text-danger">{errors?.age?.message}</span>
                    </div>
                </div>
                {
                    isEdit ? (
                        <>
                            <button className='btn btn-warning my-2' onClick={handleConfirmEdit}>Edit</button>
                            <button type='button' className='btn btn-dark m-2' onClick={() => {
                                setIsEdit(false)
                                reset()
                                setUserId(0)
                            }
                            }>Cancel</button>
                        </>
                    ) : (
                        <>
                            <button className='btn btn-success my-2'>Add</button>
                            <button type='button' className='btn btn-dark m-2' onClick={() => {
                                setAddUser(false)
                                reset()
                            }
                            }>Cancel</button>
                        </>
                    )
                }
            </form>
        </>
    )
}