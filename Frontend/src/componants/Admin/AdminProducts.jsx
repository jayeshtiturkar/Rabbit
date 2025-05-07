import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteProduct, getAllProducts } from "../../redux/slices/adminProductSlice";

const ProductData = [
  {
    _id: 123466,
    productname: "Cargo Pant",
    productsku: "BWW-005-VS4",
    price: "29.99",
  },
  {
    _id: 987456,
    productname: "Cargo Shirt",
    productsku: "BW-005",
    price: "19.99",
  },
  {
    _id: 254876,
    productname: "Cargo Jacket",
    productsku: "BW-THR-005",
    price: "59.95",
  },
];

const AdminProducts = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { products, error, loading } = useSelector((state) => state.adminProduct)
  
  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch]);

  const handleProductEdit = (productid) => {
    navigate(`edit/${productid}`)
  };

  const handleProductDelete = (productid) => {
    if (window.confirm("Are You Sure to Delete the Product ?")) {
      console.log("Your Product Id : ", productid);
      dispatch(deleteProduct({id : productid}))
    }
  };


  return (
    <div className="m-4 p-4">
      <div className="flex justify-between">
      <h1 className="text-2xl font-semibold">Product Management</h1>
      <Link to={"/admin/new-product"} className="font-semibold bg-green-500 text-white rounded-lg m-2 p-2">Add Product</Link>
      {/* <h1 className="font-semibold bg-green-500 text-white rounded-lg m-2 p-2">Add Product</h1> */}
      </div>
      {/* Product Details Table */}
      <div className="">
        <div className="overflow-x-auto">
          <table className="w-full rounded-lg overflow-hidden my-4 shadow-md">
            <thead className="">
              <tr className="bg-gray-200 text-sm">
                <td className="py-1 px-2 font-semibold">Name</td>
                <td className="py-1 px-2 font-semibold">Price</td>
                <td className="py-1 px-2 font-semibold">SKU</td>
                <td className="py-1 px-2 font-semibold">Actions</td>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(products) ? (
                products.map((product, index) => (
                  <tr key={product._id} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-semibold text-sm mb-3">
                      {product.name}
                    </td>
                    <td className="p-2 text-sm">${product.price}</td>
                    <td className="p-2 text-sm">{product.sku}</td>

                    <td className="p-2 text-sm">
                      <button
                        onClick={() => handleProductEdit(product._id)}
                        className="bg-yellow-500 text-white py-1 px-2 rounded-md text-xs mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleProductDelete(product._id)}
                        className="bg-red-500 text-white py-1 px-2 rounded-md text-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-500">
                    No prod Found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
