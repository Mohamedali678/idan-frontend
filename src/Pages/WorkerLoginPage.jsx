import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import {toast, Toaster} from "react-hot-toast"
function LoginPage (){
    const [ID, setID] = useState("")
    const [Password, setPassword] = useState("")

    const navigate = useNavigate()

    const HandleWorker = (e) => {
        e.preventDefault()
        axios.post("https://idan-backend.onrender.com/worker/login", {
            "id" : ID,
            "password" : Password
        }).then((response) => {
            console.log(response.data)
            if (response.data.error){
                toast.error("Incorrect ID or Password")
            }
            else if (response.data.empty){
                toast.error("ID and Password are required")
            }
            else {
                toast.success("Login Successfully!! Wlecome to your account")
                setTimeout(() => {
                    navigate("/workerDashboard")
                },2000)
                localStorage.setItem("worker", JSON.stringify(response.data.worker))
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    return <div className="w-full fixed h-screen bg-[#BEDDDF]">
    {/* <div className="w-full h-[80px] bg-[#0E0E0E]">
        <h1 className="text-center text-3xl text-white font-semibold pt-5"> iDan</h1>
    </div> */}
 <div className="w-full  h-screen flex my-40 sm:my-[110px]  justify-center ">
    <div className="bg-white pt-[15px] mt-4 shadow-lg px-4 items-center  w-[350px] h-[350px] rounded-[5px]">
        <h1 className="  text-xl font-semibold pt-6 text-center  text-[#008081]  "> iDan worker login</h1>
        {/* <p className="  text-gray-600 text-[14px] pr-[20px]"> Log in with your <span className="font-semibold text-black">Employee ID and password </span> to proceed.</p> */}
        <form className="mt-4">
            {/* <label className=" text-sm"> Worker ID </label> */}
            <input value={ID} onChange={(event) => setID(event.target.value)} className="w-[310px]  h-[45px]  p-2 focus:border-blue-500 focus:outline-none transition duration-200  mb-3 border-[#008081] rounded-md border  " type="text" placeholder="ID" />
            {/* <label className=" text-sm"> Worker Password </label> */}
            <input value={Password} onChange={(event) => setPassword(event.target.value)} className="w-[310px] p-2 mt-3  focus:border-blue-500 focus:outline-none transition duration-200 h-[45px] outline-none rounded-md border border-[#008081] " type="password" placeholder="Password" />
            <button onClick={HandleWorker} className="w-[310px] h-[45px] mt-5 text-white  hover:bg-[#0E0E0E] hover:text-white  bg-[#008081] rounded-[5px]"> Submit </button>
            <Link to="forgetUser">
            {/* <h2 className="text-right text-sm mt-1 text-slate-500 hover:text-[#0e0e0e] cursor-pointer "> Forgot Password?</h2> */}
            </Link>            
            <Link to="/adminLogin"><h1 className="text-center mt-3 hover:text-[#008081] cursor-pointer hover:underline"> Access Admin Login </h1></Link>
        </form>
    </div>
</div>
<Toaster />
</div>
}
export default LoginPage