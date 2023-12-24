import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddUser from "./AddUser";

export default function UserManagement() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true);
        fetch('https://65829b9202f747c83679b1ac.mockapi.io/users')
            .then((res) => {res.json()})
            .then((result) => {
                setUsers(result);
                setLoading(false);
            })
    }, [])

    return (
        <>
            <h3 style={{ textAlign: "center", marginBottom: '20px' }}>User Management</h3>
            <div className="container d-flex justify-content-center row">
                <section className="col-4">
                    <img style={{ width: "20rem" }} src="https://data.vieclamhanoi.vn/static-bucket/2022/11/14/CodeGym-3-02-copy.jpg" alt="" />

                    <div className="my-2">
                        <label>Gender:</label>
                        <select name="" id="" className="form-control">
                            <option value="" disabled selected>Please choose</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>

                    <div id="sortAge">
                        <label>Age:</label>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="sortAge" checked />
                            <label className="form-check-label">
                                10-30
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="sortAge" />
                            <label className="form-check-label">
                                30-50
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="sortAge" />
                            <label className="form-check-label">
                                50-70
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="sortAge" />
                            <label className="form-check-label">
                                70-100
                            </label>
                        </div>
                    </div>

                </section>

                <section className="col-8">
                    <input className="form-control w-50 mb-5" type="search" placeholder="Search" aria-label="Search" />
                    <button to='/createUser' className="btn btn-primary mb-2">Add User</button>
                    <AddUser />
                    {
                        loading ? (<p>Loading....</p>) : (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Full Name</th>
                                        <th>Gender</th>
                                        <th>Address</th>
                                        <th>Age</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users.map(user => (
                                            <tr key={user.id}>
                                                <td>{user.id}</td>
                                                <td>{user.fullName}</td>
                                                <td>{user.gender}</td>
                                                <td>{user.address}</td>
                                                <td>{user.age}</td>
                                                <td>
                                                    <button className="btn btn-warning me-2">Edit</button>
                                                    <button className="btn btn-danger">Delete</button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        )
                    }
                </section>
            </div>
        </>
    )
}