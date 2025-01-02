import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineBackspace } from "react-icons/hi2";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {toast, Toaster} from "react-hot-toast";




function WorkerDetail (){
    const params = useParams();
    const navigate = useNavigate();
    const [SingleWorker, setSingleWorker] = useState({})
    const HandleGetSingleWorker = (_id) => {
        axios.get(`https://idan-backend.onrender.com/SingleWorker/${params._id}`).then((response) => {
            setSingleWorker(response.data)
        }).catch((error) => {
            console.error(error)
        })
    }

    const HandleDeleteWorker = (_id) =>{
        axios.delete(`https://idan-backend.onrender.com/worker/delete/${params._id}`).then(() => {
         toast.success("Worker has been deleted successfully")
         setTimeout(() => {
            navigate("/totalWorkers")
        },2000)
        }).catch((error) => {
            console.log(error)
        })
    }
    useEffect (() => {
        HandleGetSingleWorker()
    })
    return <div className="bg-[#DADADA] w-full h-screen py-5">
        <div className="w-[350px] ml-5 sm:ml-[35%] mt-20 sm:mt-6  shadow-lg  h-[500px] rounded-[20px] bg-[#f1f1f1] ">
            <form className="pt-4 ">
                <div className="flex justify-between px-[20px] ">
                    <h1 className=" text-center text-[#008081] ml-20  font-Roboto text-[25px]"> Worker Details </h1>
                    <Link to="/totalWorkers"><HiOutlineBackspace className=" text-[28px]  text-[#2a7777] hover:text-[#0e0e0e]" /></Link>
                </div>
                <div className="px-6 mt-3">
                    <label className="text-deepBlue ">Name</label>
                    <input type="text" value={SingleWorker.name} className="w-[300px] h-[40px] border-2 border-[#008081] text-deepBlue bg-lightBlue outline-none rounded-[10px] px-2" />
                    <div>
                        <div className="flex mt-1 justify-between ">
                            <label className="text-deepBlue  ml-1">ID</label>
                            <label className="text-deepBlue  mr-[110px]">Title</label>
                        </div>
                        <input value={SingleWorker.id} type="text"  className="w-[140px] h-[40px] border-2 border-[#008081] text-deepBlue bg-lightBlue outline-none rounded-[10px] px-2 " />
                        <input value={SingleWorker.title} type="text" className="w-[140px] h-[40px] border-2 border-[#008081] mb-2 text-deepBlue bg-lightBlue outline-none rounded-[10px] px-2 ml-5 " />
                    </div>
                    <label className="text-deepBlue  ">Email</label>
                    <input value={SingleWorker.email} type="email"  className="w-[300px] mb-2 h-[40px] border-2 border-[#008081] text-deepBlue bg-lightBlue outline-none rounded-[10px] px-2" />
                    <label className="text-deepBlue  ">Phone Number</label>
                    <input  value={SingleWorker.telephone} type="tell" className="w-[300px] h-[40px] mb-2 border-2 border-[#008081] text-deepBlue bg-lightBlue outline-none rounded-[10px] px-2" />
                    <label className="text-deepBlue  ">Password</label>
                    <input value={SingleWorker.password} type="text" className="w-[300px] h-[40px] border-2 border-[#008081] text-deepBlue bg-lightBlue outline-none rounded-[10px] px-2" />
                    <div className="flex justify-between items-center mt-5 px-[30px]">
                        <Link to={`/workerUpdate/${SingleWorker._id}`}><FiEdit className=" text-[33px] mt-2 text-[#008081] hover:text-[#0e0e0e]" /></Link>
                        <MdOutlineDeleteOutline onClick={() => HandleDeleteWorker(SingleWorker._id)} className=" text-[40px] mt-2 text-[#008081] hover:text-[#0e0e0e]" />
                    </div>
                </div>

            </form>
        </div>
        <Toaster />
    </div>
}
export default WorkerDetail