import { HiOutlineBackspace } from "react-icons/hi2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {toast, Toaster} from "react-hot-toast";
function WorkerUpdate (){
    const params = useParams()
    const navigate = useNavigate();
    const [ID, setID] = useState("")
    const [Name, setName] = useState("")
    const [Title, setTitle] = useState("")
    const [Email, setEmail] = useState("")
    const [PhoneNumber, setPhoneNumber] = useState("")
    const [Password, setPassword] = useState("")
     const HandleGetSingleWorker = () => {
        axios.get(`https://idan-backend.onrender.com/SingleWorker/${params._id}`).then((response) => {
            setName(response.data.name)
            setID(response.data.id)
            setTitle(response.data.title)
            setEmail(response.data.email)
            setPhoneNumber(response.data.telephone)
            setPassword(response.data.password);
        }).catch((error) => {
            console.log(error);
        })
     }
     
     const HandleUpdateWorker = (e) => {
        e.preventDefault();
        axios.put(`https://idan-backend.onrender.com/worker/update/${params._id}`, {
            "name" : Name,
            "id" : ID,
            "title" : Title,
            "email" : Email,
            "telephone" : PhoneNumber,
            "password" : Password
        }).then(() => {
            toast.success("Worker has been updated successfully")
            setTimeout(() => {
                navigate("/totalWorkers")
            },2000)
        }).catch((error) => {
            console.log(error);
        })
     }
     useEffect(() => {
        HandleGetSingleWorker()
     }, [])
    return <div className="bg-[#dadada] w-full h-screen py-5">
        
        <div className="w-[350px] ml-5 sm:ml-[35%] mt-20 sm:mt-6  shadow-lg  h-[500px] rounded-[20px] bg-[#f1f1f1] ">
            <form className="pt-4 ">
                <div className="flex items-center justify-between px-[20px] ">
                    <h1 className=" text-center text-[#008081] ml-20  font-Roboto text-[25px]"> Update Worker </h1>
                    <Link to="/totalWorkers"><HiOutlineBackspace className=" text-[28px]  text-[#2a7777] hover:text-[#0e0e0e]" /></Link>
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
                        <input value={Title} onChange={(event) => setTitle(event.target.value)} type="text" placeholder="Enter Title" className="w-[140px] border-2 border-[#008081] h-[40px] mb-1 text-deepBlue bg-lightBlue outline-none rounded-[10px] px-2 ml-5 " />
                    </div>
                    <label className="text-deepBlue  ">Email</label>
                    <input value={Email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="Enter email" className="w-[300px] mb-1 h-[40px] border-2 border-[#008081] text-deepBlue bg-lightBlue outline-none rounded-[10px] px-2" />
                    <label className="text-deepBlue  ">Phone Number</label>
                    <input value={PhoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} type="tell" placeholder="Enter phone number" className="w-[300px] border-2 border-[#008081] h-[40px] mb-1 text-deepBlue bg-lightBlue outline-none rounded-[10px] px-2" />
                    <label className="text-deepBlue  ">Password</label>
                    <input value={Password} onChange={(event) => setPassword(event.target.value)} type="text" placeholder="Enter password" className="w-[300px] h-[40px] border-2 border-[#008081] text-deepBlue bg-lightBlue outline-none rounded-[10px] px-2" />
                    <button onClick={HandleUpdateWorker} className="w-[300px] h-[40px] text-white m bg-[#008081] hover:bg-[#0e0e0e] rounded-[10px] mt-5" placeholder="Enter Permission Reason"> Update </button>
                </div>

            </form>
        </div>
        <Toaster />
    </div>
}
export default WorkerUpdate