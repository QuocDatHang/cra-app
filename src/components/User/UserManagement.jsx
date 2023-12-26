import React, { useEffect, useState } from "react";
import AddUser from "./AddUser";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import axios from "axios";

export default function UserManagement() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [isDeleted, setIsDeleted] = useState({})
    const [userId, setUserId] = useState()
    const [isEdit, setIsEdit] = useState(false)
    const [addUser, setAddUser] = useState(false)

    useEffect(() => {
        setLoading(true);
        const fetchAllUsers = async () => {
            const res = await axios.get('https://65829b9202f747c83679b1ac.mockapi.io/users');
            setUsers(res.data);
            setLoading(false);
        }
        fetchAllUsers();
    }, [isDeleted])


    const handleEdit = (id) => {
        setUserId(id)
        setIsEdit(true)
        setAddUser(true)
    }

    const handleDelete = (id) => {
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
                const res = await axios.delete(`https://65829b9202f747c83679b1ac.mockapi.io/users/${id}`);
                console.log(res);
                if (res.statusText == 'OK') {
                    setIsDeleted(res.data)
                    Swal.fire({
                        title: "Deleted!",
                        text: "User has been deleted.",
                        icon: "success"
                    });
                }
                else {
                    Swal.fire({
                        title: "Fail!",
                        text: "Delete error!",
                        icon: "error"
                    });
                }
            }
        })
    }

    return (
        <>
            <h3 style={{ textAlign: "center", marginBottom: '20px' }}>User Management</h3>
            <div className="container d-flex justify-content-center row">
                <section className="col-4">
                    <img style={{ width: "20rem" }} src="https://data.vieclamhanoi.vn/static-bucket/2022/11/14/CodeGym-3-02-copy.jpg" alt="" />

                    <div className="my-2">
                        <label>Gender:</label>
                        <select defaultValue='All' className="form-control" readOnly>
                            <option value="All">All</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>

                    <div id="sortAge">
                        <label>Age:</label>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="sortAge" defaultChecked readOnly/>
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
                    <button className="btn btn-primary mb-2" onClick={() => {
                        setUserId()
                        setAddUser(true)
                        setIsEdit(false)
                    }
                    }>Add User</button>
                    {
                        addUser ? (<AddUser users={users} setUsers={setUsers} setLoading={setLoading} userId={userId}
                            setUserId={setUserId} isEdit={isEdit} setIsEdit={setIsEdit} setAddUser={setAddUser} />) : ''
                    }
                    {
                        loading ? (<div class="text-center">
                            <div class="spinner-border text-warning" />
                        </div>) :
                            (
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
                                                        <button className="btn btn-warning me-2" onClick={() => handleEdit(user.id)}>Edit</button>
                                                        <button className="btn btn-danger" onClick={() => handleDelete(user.id)}>Delete</button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            )}
                </section>
            </div>
        </>
    )
}