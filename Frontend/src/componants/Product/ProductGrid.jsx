import React from 'react'
import { Link } from "react-router-dom";

const ProductGrid = ({products,loading,error,className}) => {
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error... {error}</p>
  return (
    <div className='grid grid-cols-2 lg:grid-cols-4'>
        {
          products.map((prod,index) =>(
            <Link className='block' key={index} to={`/product/${prod._id} `}>
              <div className={`bg-white p-4 rounded-lg `}>
                <div className='w-full h-44 md:h-96 mb-4'>
                  <img src={prod.images[0].url} alt={prod.images[0].altText}
                  className={`w-full h-full object-cover rounded-lg ${className}`}
                  />
                </div>
                <h2  className='text-sm font-semibold mb-2'>{prod.name}</h2>
                <p className='text-gray-500 font-medium text-sm tracking-tighter'>$ {prod.price}</p>
              </div>
            </Link>
          ))
        }
    </div>
  )
}

export default ProductGrid