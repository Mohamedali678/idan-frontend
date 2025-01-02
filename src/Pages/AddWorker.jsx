import { HiOutlineBackspace } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import {toast, Toaster} from "react-hot-toast"
import ManagerSidebar from "../Components/ManagerSidebar";
function AddWorker (){
    const navigate = useNavigate();
    const [Name, setName] = useState("")
    const [ID, setID] = useState("")
    const [Title, setTitle] = useState("")
    const [Email, setEmail] = useState("")
    const [PhoneNumber, setPhoneNumber] = useState("")
    const [Password, setPassword] = useState("")

    const HandleAddWorker = (e) => {
        e.preventDefault()
        axios.post("http://localhost:7000/worker/create", {
            "name": Name,
            "id" : ID,
            "title" : Title,
            "email" : Email,
            "telephone" : PhoneNumber,
            "password" : Password
        }).then(() => {
            toast.success("Worker has been added successfully")
            setTimeout(() => {
                navigate("/totalWorkers")
            },2000)
        }).catch((error) => {
            console.log(error)
        })
    }
    return <div>
        <ManagerSidebar />
     <div className="bg-[#dadada] w-full h-screen py-5">
        <div className="w-[350px] ml-5 sm:ml-[35%] mt-24 sm:mt-6  shadow-lg  h-[500px] rounded-[8px] bg-[#f1f1f1] ">
            <form className="pt-4 ">
            <div className="flex justify-between px-[50px] items-center ">
                    <h1 className=" text-center text-[#008081] ml-14  font-Roboto text-[25px]"> Add Worker </h1>
                    <Link to="/workerDashboard"><HiOutlineBackspace className=" text-[25px]  text-[#008081] hover:text-[#0e0e0e] " /></Link>
                </div>
                <div className="px-6 mt-3">
                    <label className="text-deepBlue ">Name</label>
                    <input value={Name} onChange={(event) => setName(event.target.value)} type="text" placeholder="Enter name" className="w-[300px] border-2 border-[#008081] h-[40px] text-deepBlue bg-lightBlue outline-none rounded-[10px] px-2" />
                    <div>
                        <div className="flex mt-1 justify-between ">
                            <label className="text-deepBlue  ml-1">ID</label>
                            <label className="text-deepBlue  mr-[110px]">Title</label>
                        </div>
                        <input value={ID} onChange={(event) => setID(event.target.value)} type="text" placeholder="Enter ID" className="w-[140px] h-[40px] border-2 border-[#008081] text-deepBlue bg-lightBlue outline-none rounded-[10px] px-2 " />
                        <input value={Title} onChange={(event) => setTitle(event.target.value)} type="text" placeholder="Enter Title" className="w-[140px] border-2 border-[#008081] h-[40px] mb-2 text-deepBlue bg-lightBlue outline-none rounded-[10px] px-2 ml-5 " />
                    </div>
                    <label className="text-deepBlue  ">Email</label>
                    <input value={Email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="Enter email" className="w-[300px] border-2 border-[#008081] mb-2 h-[40px] text-deepBlue bg-lightBlue outline-none rounded-[10px] px-2" />
                    <label className="text-deepBlue  ">Phone Number</label>
                    <input value={PhoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} type="tell" placeholder="Enter phone number" className="w-[300px] border-2 border-[#008081] h-[40px] mb-2 text-deepBlue bg-lightBlue outline-none rounded-[10px] px-2" />
                    <label className="text-deepBlue  ">Password</label>
                    <input value={Password} onChange={(event) => setPassword(event.target.value)} type="tel" placeholder="Enter password" className="w-[300px] h-[40px] border-2 border-[#008081] text-deepBlue bg-lightBlue outline-none rounded-[10px] px-2" />
                    <button onClick={HandleAddWorker} className="w-[300px] h-[40px] text-white  bg-[#008081] hover:bg-[#0e0e0e] rounded-[10px] mt-5" placeholder="Enter Permission Reason"> Submit</button>
                </div>

            </form>
        </div>
    </div>
    <Toaster />
    </div>
}
export default AddWorker