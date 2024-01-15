import React, { useState , useContext} from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import useProductStore from "../zustand-store/store";
import {useNavigate, Link} from "react-router-dom";
import { AuthContext } from '../../context/context';
import "./Products.css";
import { ImSpinner9 } from "react-icons/im";

const Product = ({ prod, ondelete }) => {
  const auth = useContext(AuthContext);
  const [deleting, setDeleting] = useState(false);
  const editProd = {
    id: prod._id,
    title: prod.title,
    price: prod.price,
    image: prod.image,
  };
  const deleteProd = async () => {
    if(auth.isLoggedIn){
      setDeleting(true)
      const response = await fetch(`https://week-5-task-backend.vercel.app/product/${prod._id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + auth.token
        },
      });
      await response.json();
      ondelete();
    }else{
      toast.error("You are not authenticated! Please sign in first")
    }
  };
  return (
    <div className="max-w-[270px] bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700">
  
        <img className=" block w-[270px] h-[250px]" src={prod.image} alt="" />
   
    <div className="p-5">
        
            <h5 className="mb-2 tracking-tight text-gray-900 ">{prod.title}</h5>
        
        <p className="mb-3 font-normal text-[#DB4444]">{prod.price} $</p>
        <div className="w-full flex justify-center items-center">
          <button className="border flex justify-center items-center bg-black py-2 text-white gap-3 w-full" onClick={deleteProd}>{deleting ? "Deleting" : "Delete"}
          {deleting && <span className="animate-spin"><ImSpinner9 /></span>}</button>
          
          {auth.isLoggedIn && <button className="border bg-black py-2 text-white block w-full"><Link to={`edit`} state={editProd}>Edit </Link> </button>}
          </div>
      </div>
    </div>

  );
};

export default Product;
