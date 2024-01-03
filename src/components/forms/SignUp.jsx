import {useState} from 'react';
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import "./Signup.css";


const SignUp = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name:"",
        email:"",
        password:""
    });
    const [loading, setLoading] = useState(false);
    const [nameValidity, setNameValidity] = useState(false);
    const [emailValidity, setEmailValidity] = useState(false);
    const [passwordValidity, setPasswordValidity] = useState(false);
    const handleInputChange = (event) => {
      setNameValidity(false);
      setEmailValidity(false);
      setPasswordValidity(false);
        const { name, value } = event.target;
        setUser({
          ...user,
          [name]: value,
        });
      };
      const onCreateNewUser = async event => {
        event.preventDefault();
        if(user.name.trim() === ""){
          setNameValidity(true);
          toast.error("Name Can Not Be Empty!")
          return;
        }
        if(user.email.trim() === ""){
          setEmailValidity(true);
          toast.error("Email Can't Be Empty!")
          return;
        }
        if(!user.email.trim().includes("@") || !user.email.trim().includes(".com") || !user.email.trim().length > 12){
          setEmailValidity(true);
          toast.error("Email is not Valid!")
          return;
        }
        if(user.password.trim() === ""){
          setPasswordValidity(true);
          toast.error("Password can not be empty!");
          return;
        }
        setLoading(true);
        const data = await fetch("https://week-5-task-backend.vercel.app/sign-up", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: user.email,
                name:user.name,
                password: user.password
              })
        });
        console.log(data.ok)
        if(!data.ok || data.status !== 201){
          console.log(data)
          setLoading(false);
          if(data.status === 422){
            toast.error("Invalid body sent...");
            return;
          }
          if(data.status === 409){
            toast.error("User already exists...");
            return;
          }
          
          return;
        }
        const response = await data.json();
          setLoading(false);
          toast.success(response.message);
          console.log(response)
          return navigate("/login");
      }
    return (
        <div className=''>
          {loading && <div className='flex justify-center items-center overlay h-screen w-screen opacity-55 bg-black absolute left-0 top-0 cursor-wait'>
          <div className="lds-ripple"><div></div><div></div></div>
          </div>}
        <h1 className='text-center py-5'>Sign Up</h1>
       <form className='max-w-[500px] flex gap-3 flex-col mx-auto' onSubmit={onCreateNewUser}>
            <input className={`outline-none border py-2 px-2 block w-full ${nameValidity && "border-red-500"}`} type="text" placeholder={`${!nameValidity ? "Enter name here..." : "Name is compulsory..."}`} onChange={handleInputChange}  name='name'/>
            <input className={`outline-none border py-2 px-2 block w-full ${emailValidity && "border-red-500"}`} type="text" placeholder={`${!emailValidity ? "Enter email here..." : "Email is compulsory..."}`} onChange={handleInputChange}  name='email'/>
            <input className={`outline-none border py-2 px-2 block w-full ${passwordValidity && "border-red-500"}`} type="password" placeholder={`${!passwordValidity ? "Enter password here..." : "Password is compulsory..."}`} onChange={handleInputChange}  name='password'/>
            <button  className='border w-full py-2 cursor-pointer hover:bg-slate-800 bg-black text-white flex justify-center items-center gap-4' type="submit">SIGN UP</button>
       </form>
    </div>
    );
}

export default SignUp;
