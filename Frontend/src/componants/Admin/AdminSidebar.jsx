import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBoxOpen, FaClipboardList, FaSignOutAlt, FaStore, FaUser } from "react-icons/fa";

const AdminSidebar = () => {
    const navigate = useNavigate()
    const handleLogout = () => {
        navigate("/")
    }
  return (
    <div className="p-6">
      <div className="mb-6">
        <Link to={"/admin"} className="text-2xl font-medium">
          Rabbit
        </Link>
      </div>
      <h2 className="text-xl font-medium mb-6 text-center">Admin Dashbord</h2>

      <nav>
        <NavLink
          to="/admin/user"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 px-4 rounded flex itmes-center space-x-2"
              : "text-gray-300 hover:bg-gray-700 hover:text-white flex itmes-center space-x-2 py-3 px-4"
          }
        >
          <FaUser />
          <span>Users</span>
        </NavLink>
        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 px-4 rounded flex itmes-center space-x-2"
              : "text-gray-300 hover:bg-gray-700 hover:text-white flex itmes-center space-x-2 py-3 px-4"
          }
        >
          <FaBoxOpen />
          <span>Products</span>
        </NavLink>
        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 px-4 rounded flex itmes-center space-x-2"
              : "text-gray-300 hover:bg-gray-700 hover:text-white flex itmes-center space-x-2 py-3 px-4"
          }
        >
          <FaClipboardList />
          <span>Orders</span>
        </NavLink>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 px-4 rounded flex itmes-center space-x-2"
              : "text-gray-300 hover:bg-gray-700 hover:text-white flex itmes-center space-x-2 py-3 px-4"
          }
        >
          <FaStore />
          <span>Shop</span>
        </NavLink>
      </nav>
      <div className="mt-6">
        <button onClick={handleLogout} className="w-full bg-red-500 hover:bg-red-500 text-white py-2 px-4 rounded flex items-center justify-center space-x-2">
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
