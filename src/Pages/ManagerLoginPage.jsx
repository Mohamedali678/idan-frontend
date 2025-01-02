import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {toast, Toaster} from "react-hot-toast"

function ManagerLoginPage (){
    const [ID, setID] = useState("")
    const [Password, setPassword] = useState("")
    
    const navigate = useNavigate()
    const HandleAdmin = (e) => {
        e.preventDefault();
        axios.post("https://idan-backend.onrender.com/admin/login",{
            "id": ID,
            "password": Password
        }).then((response) => {
            if (response.data.error) {
                toast.error("Incorrect ID or Password");
            }
            else if (response.data.empty) {
                toast.error("ID and Password are required");
            }
            else {
                toast.success("Login Successfully!! Welcome to your account");
                setTimeout(() => {
                    navigate("/managerDashboard");
                }, 2000);
                localStorage.setItem("admin", JSON.stringify(response.data.admin)); // Store admin in local storage
            }
        }).catch((error) => {
            console.log(error);
            toast.error("Error in Login");
        });        
    }

    return <div className="w-full h-screen bg-[#BEDDDF] fixed">
        {/* <div className="w-full h-[80px] bg-[#6A6458]">
            <h1 className="text-center text-3xl text-white font-semibold pt-5"> iDan</h1>
        </div> */}
     <div className="w-full h-screen flex  my-40 sm:my-20  justify-center ">
     <div className="bg-white pt-[15px] shadow-lg px-4 w-[350px] h-[350px] rounded-[5px]">
        <h1 className="  text-[30px] text-center font-semibold text-[#0E0E0E]  "> Sign in </h1>
        <form className="mt-4">
            <input value={ID} placeholder="ID" onChange={(event) => setID(event.target.value)} className="w-[310px]  h-[45px]  p-2 focus:border-blue-500 focus:outline-none transition duration-200  mb-3 border-[#008081] rounded-md border  " type="text" />
            <input placeholder="Password" value={Password} onChange={(event) => setPassword(event.target.value)} className="w-[310px] mt-4  h-[45px]  p-2 focus:border-blue-500 focus:outline-none transition duration-200  mb-3 border-[#008081] rounded-md border  " type="password" />
            <button onClick={HandleAdmin} className="w-[310px] h-[45px] mt-7 text-white  hover:bg-[#0E0E0E] hover:text-white  bg-[#008081] rounded-[5px]"> Submit </button>
        </form>
    </div>
    </div>
    <Toaster />
    </div>
}
export default ManagerLoginPage