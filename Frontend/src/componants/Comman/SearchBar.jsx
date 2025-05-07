import React, { useRef, useState } from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { fetchProductByFilter, setFilter } from "../../redux/slices/productSlice";
import { useNavigate } from "react-router-dom";


const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const [inputvalue, setInputValue] = useState("");
  const formRef = useRef(null);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleOnClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    dispatch(fetchProductByFilter({search : inputvalue}))
    dispatch(setFilter({search : inputvalue}))
    navigate(`collections/all?search=${inputvalue}`)
    setIsOpen(!isOpen)
  }
  return (
    <div className={`flex items-center justify-center w-full transition-all duration-300 ${isOpen ? "absolute top-0 left-0 w-full bg-white h-24 z-50": "w-auto"}`}>
      {isOpen ? (
        <form className="relative flex items-center justify-center w-full" onSubmit={handleSubmit}>
          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="Search"
              value={inputvalue}
              onChange={(e) => setInputValue(e.target.value)}
              className="bg-gray-100 px-4 py-2 pl-2 pr-12 rounded-lg focus:outline-none w-full placeholder:text-gray-700"
            />
            {/* Search Icon */}
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
            >
              <HiMagnifyingGlass className="h-6 w-6" />
            </button>
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={handleOnClick}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
          >
            <HiMiniXMark className="" />
          </button>
        </form>
      ) : (
        <button onClick={handleOnClick}>
          <HiMagnifyingGlass className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
