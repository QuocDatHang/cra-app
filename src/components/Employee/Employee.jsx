import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2';
import * as yup from "yup"


const schema = yup.object({
    code: yup.string()
        .max(5, "Code must be less than 5 characters")
        .matches(/^[a-zA-Z0-9]+$/, "Code must not contain special characters")
        .required("Code must not be empty"),
    name: yup.string().matches(/^[a-zA-Z\s]+$/, "Name must only contain letters").required("Name must not be empty"),
    branch: yup.string().required("Branch must not be empty"),
    salary: yup.number().min(0, 'Salary must bigger than 0').required("Salary must not be empty").typeError("Please enter a number"),
    age: yup.number().min(18, 'Age must bigger than 18').max(120, 'Age must smaller than 120')
})

const API_URL = 'https://65829b9202f747c83679b1ac.mockapi.io/employees'

export default function Employee() {
    const [employees, setEmployees] = useState([])
    const [isEdit, setIsEdit] = useState(false)
    const [isAdd, setIsAdd] = useState(false)
    const [employeeId, setEmployeeId] = useState()
    const [disableBtn, setDisableBtn] = useState(false)
    let navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        resolver: yupResolver(schema)
    })

    useEffect(() => {
        const fetchAllEmployees = async () => {
            const res = await axios.get(API_URL);
            let sortByBranch = [...res.data].sort((a, b) => a.branch > b.branch ? 1 : -1,);
            setEmployees(sortByBranch);
        }
        fetchAllEmployees();
    }, [])

    const handleAddEmployee = (data) => {
        setDisableBtn(true)
        fetch(API_URL, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                toast.success('Create employee successful!')
                fetch(API_URL)
                    .then((res) => res.json())
                    .then((result) => {
                        let sortByBranch = [...result].sort((a, b) => a.branch > b.branch ? 1 : -1,);
                        setEmployees(sortByBranch);
                    })
                setIsAdd(false)
                reset();
                setDisableBtn(false)
            }).catch(err => toast.error('Create fail'))
    }

    const handleDelete = (id) => {
        setDisableBtn(true)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axios.delete(`${API_URL}/${id}`);
                if (res.statusText == 'OK') {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Employee has been deleted.",
                        icon: "success"
                    });
                    setEmployees(employees.filter(e => e.id !== id))
                    setDisableBtn(false)
                }
                else {
                    Swal.fire({
                        title: "Fail!",
                        text: "Delete error!",
                        icon: "error"
                    });
                    setDisableBtn(false)
                }
            }
        })
    }

    const handleEdit = (id) => {
        setIsEdit(true)
        setEmployeeId(id)
        setIsAdd(true)
        const getEmployeeById = async () => {
            const res = await axios.get(`${API_URL}/${id}`);
            const result = await res.data;
            setValue("code", result.code)
            setValue("name", result.name)
            setValue("age", result.age)
            setValue("salary", result.salary)
            setValue("branch", result.branch)
        }
        getEmployeeById();
    }

    const handleConfirmEdit = (data) => {
        setDisableBtn(true)
        fetch(`${API_URL}/${employeeId}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                toast.success('Update employee successful!')
                fetch(API_URL)
                    .then((res) => res.json())
                    .then((result) => {
                        let sortByBranch = [...result].sort((a, b) => a.branch > b.branch ? 1 : -1,);
                        setEmployees(sortByBranch);
                    })
                reset();
                setIsAdd(false)
                setEmployeeId();
                setDisableBtn(false)
            }).catch(err => {
                toast.error('Update fail')
                setDisableBtn(false)
            })
    }

    const sendDataDetail = (id) => {
        navigate(`/detail/${id}`)
    }

    const handleSort = (e) => {
        const selectedOption = e.target.value;
        let sortedEmployees = [];

        if (selectedOption === 'asc') {
            sortedEmployees = [...employees].sort((a, b) => a.age - b.age);
        } else if (selectedOption === 'desc') {
            sortedEmployees = [...employees].sort((a, b) => b.age - a.age);
        }
        else {
            sortedEmployees = [...employees]
        }
        setEmployees(sortedEmployees);
    }

    return (
        <div className='container border rounded vh-100 mt-2'>
            <h3>Employee Management</h3>
            <div className="d-flex justify-content-between">
                <button className='btn btn-success' onClick={() => {
                    setIsAdd(true)
                    setIsEdit(false)
                    setEmployeeId()
                }}>Add New</button>
                <select className='form-control w-25' onChange={handleSort}>
                    <option value="" selected>Sort by age</option>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>

            {
                isAdd ? (
                    <form className='border border-primary rounded py-2 px-4 my-2' onSubmit={handleSubmit(isEdit ? handleConfirmEdit : handleAddEmployee)}>
                        <h4>{isEdit ? 'Edit Employee' : 'Add Employee'}</h4>
                        <div className="row mb-2">
                            <div className="col-6">
                                <label>Employee Code</label>
                                <input type="text" className={`form-control ${errors?.code?.message ? "is-invalid" : ""}`}
                                    {...register('code')} />
                                <span className="text-danger">{errors?.code?.message}</span>
                            </div>
                            <div className="col-6">
                                <label>Name</label>
                                <input type="text" className={`form-control ${errors?.name?.message ? "is-invalid" : ""}`}
                                    {...register('name')} />
                                <span className="text-danger">{errors?.name?.message}</span>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-6">
                                <label>Age</label>
                                <input type="number" className={`form-control ${errors?.age?.message ? "is-invalid" : ""}`}
                                    {...register('age')} />
                                <span className="text-danger">{errors?.age?.message}</span>
                            </div>
                            <div className="col-6">
                                <label>Salary</label>
                                <input type="number" className={`form-control ${errors?.salary?.message ? "is-invalid" : ""}`}
                                    {...register('salary')} />
                                <span className="text-danger">{errors?.salary?.message}</span>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-6">
                                <label>Branch</label>
                                <select className={`form-control ${errors?.branch?.message ? "is-invalid" : ""}`}
                                    {...register('branch')}>
                                    <option value="" selected>Please choose</option>
                                    <option value="IT">IT</option>
                                    <option value="HR">HR</option>
                                    <option value="RnD">RnD</option>
                                </select>
                                <span className="text-danger">{errors?.branch?.message}</span>
                            </div>
                        </div>
                        {
                            isEdit ? (
                                <>
                                    <button className='btn btn-warning my-2' disabled={disableBtn}>Update</button>
                                    <button type='button' className='btn btn-dark m-2' onClick={() => {
                                        setIsEdit(false)
                                        reset()
                                        setIsAdd(false)
                                    }}>Cancel</button>
                                </>
                            ) : (
                                <>
                                    <button className='btn btn-success my-2' disabled={disableBtn}>Save</button>
                                    <button type='button' className='btn btn-dark m-2' onClick={() => {
                                        setIsAdd(false)
                                        reset()
                                        setEmployeeId(0)
                                    }
                                    }>Cancel</button>
                                </>
                            )
                        }
                    </form>) : ''
            }

            <table className="table">
                <thead>
                    <tr>
                        <th>Employee Code</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Salary</th>
                        <th>Branch</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map(employee => (
                            <tr key={employee.id}>
                                <td>{employee.code}</td>
                                <td>
                                    <button type="button" className="btn btn-link" onClick={() => sendDataDetail(employee.id)}>{employee.name}</button>
                                </td>
                                <td>{employee.age}</td>
                                <td>{employee.salary}</td>
                                <td>{employee.branch}</td>
                                <td>
                                    <button className="btn btn-warning me-2" onClick={() => handleEdit(employee.id)}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(employee.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
