import React from 'react'
import Employee from './Employee'
import EmployeeDetail from './EmployeeDetail'
import { Route, Routes } from 'react-router-dom'

export default function () {
    return (
        <>
            <Routes>
                <Route path='/' element={<Employee />} />
                <Route path='/detail/:id' element={<EmployeeDetail />} />
                <Route path='*' element={<h3>Page Not found</h3>}></Route>
            </Routes>
        </>
    )
}
