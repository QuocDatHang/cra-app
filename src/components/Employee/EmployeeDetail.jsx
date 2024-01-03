import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const API_URL = 'https://65829b9202f747c83679b1ac.mockapi.io/employees'

export default function EmployeeDetail() {
    const { id } = useParams()
    const [employee, setEmployee] = useState()
    useEffect(() => {
        const getEmployeeById = async () => {
            const res = await axios.get(`${API_URL}/${id}`);
            const result = await res.data;
            setEmployee(result)
        }
        getEmployeeById();
    }, [])
    return (
        <div className='container border mt-2 p-4'>
            <div className='d-flex flex-column gap-2'>
                <h4>Employee Detail</h4>
                <div>Employee Code: <span className='fw-bold ms-3'>{employee?.code}</span></div>
                <div>Name: <span className='fw-bold ms-3'>{employee?.name}</span></div>
                <div>Salary: <span className='fw-bold ms-3'>{employee?.salary}</span></div>
                <div>Age: <span className='fw-bold ms-3'>{employee?.age}</span></div>
                <div>Branch: <span className='fw-bold ms-3'>{employee?.branch}</span></div>
                <Link to='/'>Back to list</Link>
            </div>

        </div>
    )
}
