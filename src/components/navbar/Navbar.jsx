import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../../context/context";
import "./Navbar.css";
import toast from "react-hot-toast";
import { FaHamburger, FaOpencart } from "react-icons/fa";
import { GiCrossMark } from "react-icons/gi";

const Navbar = (props) => {
  const auth = useContext(AuthContext);
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const [close, setClose] = useState(true);
 
  const onSearchProduct = ()=> {
    if(searchKeyWord.trim() === ""){
      return toast.error("Please enter something...");
    }
    props.onSearch({
      type:"search",
      searchKeyWord
    });
  };
  const clearSearch = () => {
    props.onSearch({
      type:"clear",
      searchKeyWord
    });
    setSearchKeyWord("")
  };
  const onCloseModal = () => {
    setClose(true);
  };
  const onOpenModal = () => {
    setClose(false);
    document.body.style.overflow = "hidden";
  };
  const onChangeHandler = (e)=> {
    if(e.target.value.trim() === ""){
     props.onSearch({
        type:"clear",
        searchKeyWord: ""
      });
    }
    setSearchKeyWord(e.target.value);
  };
  return (
    <AnimatePresence>
    <div className="grid bg-white lg:border-2 lg:rounded-full sm:px-5 my-2 shadow w-full grid-cols-8 lg:grid-cols-3 gap-y-5 justify-between py-3">
      <motion.div  initial={{ scale:1, y:-100}} animate={{y:0}} transition={{type: "spring", delay:0.1}} className="hidden lg:flex col-span-1 justify-center sm:justify-start items-center">
      <FaOpencart />
      </motion.div>
      <motion.div  initial={{ scale:1, y:-100}} animate={{y:0}} transition={{type: "spring", delay:0.1}} className="flex lg:hidden justify-center order-last items-center text-2xl col-span-1" onClick={onOpenModal}>
      <FaHamburger />
      </motion.div>
      <motion.div initial={{ scale:1, y:-100}} animate={{y:0}} transition={{type: "spring", delay:0.2}} className="lg:col-span-1 mx-auto w-full flex justify-between items-center col-span-7">
      <div className="relative border rounded-full h-full w-full overflow-hidden flex justify-between items-center">
      {searchKeyWord.length > 0 && <i onClick={clearSearch} className="fa fa-times-circle absolute right-[36%] sm:right-[23%] lg:right-[30%] text-red-500 cursor-pointer top=[50%]" aria-hidden="true"></i>}
        <input
          className="rounded-l-full text-sm sm:text-base lg:text-lg block w-full outline-none py-3 px-2"
          type="text"
          placeholder="Enter keywords to search...."
          value={searchKeyWord}
          onChange={onChangeHandler}
        />
        <button className="block bg-black text-white h-full w-[150px] border border-black font-medium cursor-pointer" onClick={onSearchProduct}>
          Enter
        </button>
      </div>
      </motion.div>
      <motion.ul className="hidden lg:flex justify-end items-center gap-2 col-span-1">
        <motion.li initial={{ scale:1, y:-100}} animate={{y:0}} transition={{type: "spring", delay:0.3}} className="text-black rounded px-3 py-1"><Link to={`/`}>Home</Link></motion.li>
        {auth.isLoggedIn && <motion.li initial={{ scale:1, y:-100}} animate={{y:0}} transition={{type: "spring", delay:0.3}} className="text-black rounded px-3 py-1"><Link to={`/add`}>Add</Link></motion.li>}
        {!auth.isLoggedIn && <motion.li initial={{ scale:1, y:-100}} animate={{y:0}} transition={{type: "spring", delay:0.3}} className="text-black rounded px-3 py-1"><Link to={`/login`}>Login</Link></motion.li>}
       {!auth.isLoggedIn && <motion.li initial={{ scale:1, y:-100}} animate={{y:0}} transition={{type: "spring", delay:0.3}} className="text-black rounded px-3 py-1"><Link to={`/signup`}>Signup</Link></motion.li>}
        {auth.isLoggedIn && <motion.li initial={{ scale:1, y:-100}} animate={{y:0}} transition={{type: "spring", delay:0.3}} className="text-black rounded px-3 py-1"><i onClick={auth.logout} className="mx-2 fa-solid fa-right-from-bracket cursor-pointer"></i></motion.li>}
      </motion.ul>
    </div>
    <div className={`flex justify-center items-center overlay h-screen w-screen opacity-55 bg-black lg:hidden z-10 absolute ${close && "hidden"} left-0 top-0 cursor-wait`}></div>
    <motion.div className={`${close && "hidden"} lg:hidden h-screen z-20 border rounded-lg absolute top-0 right-0 w-[75%] bg-white opacity-100`} initial={{ scale:0, x:100}} animate={{scale:1,x:0}} transition={{type: "spring", delay:0.3}}>
    <motion.ul className="lg:flex justify-end items-center gap-2 col-span-1">
        <motion.li initial={{ scale:1, y:-100}} animate={{y:0}} transition={{type: "spring", delay:0.3}} className="text-black rounded px-3 border border-b py-3 w-full flex justify-end" onClick={onCloseModal}><GiCrossMark /></motion.li>
        <motion.li initial={{ scale:1, y:-100}} animate={{y:0}} transition={{type: "spring", delay:0.3}} className="text-black rounded px-3 border border-b py-3"><Link to={`/`}>Home</Link></motion.li>
        {auth.isLoggedIn && <motion.li initial={{ scale:1, y:-100}} animate={{y:0}} transition={{type: "spring", delay:0.3}} className="text-black rounded px-3 border border-b py-3"><Link to={`/add`}>Add</Link></motion.li>}
        {!auth.isLoggedIn && <motion.li initial={{ scale:1, y:-100}} animate={{y:0}} transition={{type: "spring", delay:0.3}} className="text-black rounded px-3 border border-b py-3"><Link to={`/login`}>Login</Link></motion.li>}
       {!auth.isLoggedIn && <motion.li initial={{ scale:1, y:-100}} animate={{y:0}} transition={{type: "spring", delay:0.3}} className="text-black rounded px-3 border border-b py-3"><Link to={`/signup`}>Signup</Link></motion.li>}
        {auth.isLoggedIn && <motion.li initial={{ scale:1, y:-100}} animate={{y:0}} transition={{type: "spring", delay:0.3}} className="text-black rounded px-3 border border-b py-3"><i onClick={auth.logout} className="mx-2 fa-solid fa-right-from-bracket"></i></motion.li>}
      </motion.ul>
      </motion.div>
  

    </AnimatePresence>
  );
};

export default Navbar;
