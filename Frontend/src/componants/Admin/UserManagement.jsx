import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser, deleteUser, fetchAllUser, updateUser } from "../../redux/slices/adminSlice";

const UserManagement = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { users,error,loading } = useSelector((state) => state.admin)
    const haldleAddUser = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const role = e.target.role.value;

        dispatch(createUser({ name, email, password, role }))

    };
    const handleDeleteUser = (id) => {
        dispatch(deleteUser(id))
        dispatch(fetchAllUser()); // this will refetch the updated list
    }

    useEffect(() => {
        dispatch(fetchAllUser())
    }, [dispatch]);

    const handleUpdateUserRole = (userId,email, role) => {
        dispatch(updateUser({id:userId,email,role}))
    }

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error...{error}</p>
    return (
        <div className="m-4 p-4">
            <h1 className="text-2xl font-semibold">User Management</h1>
            <div className="my-8 mx-4">
                <h4 className="text-lg text-gray-900 font-semibold mb-4">
                    Add New User
                </h4>
                <form onSubmit={haldleAddUser}>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="">Name</label>
                        <input
                            required
                            type="text"
                            name="name"
                            className="border border-gray-300 rounded-md p-1"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="">Email</label>
                        <input
                            required
                            type="email"
                            name="email"
                            className="border border-gray-300 rounded-md p-1"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="">Password</label>
                        <input
                            required
                            type="text"
                            name="password"
                            className="border border-gray-300 rounded-md p-1"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="">Role</label>
                        <select
                            name="role"
                            id=""
                            className="border border-gray-300 rounded-md p-1"
                        >
                            <option value="customer">Customer</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="bg-green-500 text-white py-1 px-2 rounded-md hover:bg-green-600"
                    >
                        Add User
                    </button>
                </form>
            </div>

            {/* UserDetails Table */}
            <div className="ml-4">
                <h1 className="text-xl font-semibold">All Users</h1>
                <div className="overflow-x-auto">
                    <table className="w-full rounded-lg overflow-hidden my-4">
                        <thead className="">
                            <tr className="bg-gray-200 text-sm">
                                <td className="py-1 px-2 font-semibold">Name</td>
                                <td className="py-1 px-2 font-semibold">Email</td>
                                <td className="py-1 px-2 font-semibold">Role</td>
                                <td className="py-1 px-2 font-semibold">Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {users &&
                                users.map((user, index) => (
                                    <tr key={index} className="border-b mb-2 hover:bg-gray-50">
                                        <td className="py-2 px-2 font-semibold text-sm ">
                                            {user.name}
                                        </td>
                                        <td className="py-1 px-2 text-sm">{user.email}</td>
                                        <td className="py-1 px-2 text-sm">
                                            <select
                                                value={user.role}
                                                name="role"
                                                id=""
                                                onChange={(e) => handleUpdateUserRole(user._id,user.email, e.target.value)}
                                                className="border border-gray-300 rounded-md p-1"
                                            >
                                                <option value="customer">Customer</option>
                                                <option value="admin">Admin</option>
                                            </select></td>
                                        <td className="py-1 px-2 text-sm">
                                            <button onClick={() => handleDeleteUser(user._id)} className="bg-red-500 text-white py-1 px-2 rounded-md">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;
