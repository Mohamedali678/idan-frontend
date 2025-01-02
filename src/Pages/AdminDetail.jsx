import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineBackspace } from "react-icons/hi2";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {toast, Toaster} from "react-hot-toast"




function AdminDetail (){
    const params = useParams();
    const navigate = useNavigate();
    const [SingleAdmin, setSingleAdmin] = useState({})
    const HandleSingleAdmin = (id) => {
        axios.get(`http://localhost:7000/Admin/SingleAdmin/${params._id}`).then((response) => {
            setSingleAdmin(response.data)
        }).catch((error) => {
            console.error(error)
        })
    }

    const HandleDeleteAdmin = (_id) =>{
        axios.delete(`http://localhost:7000/admin/delete/${params._id}`).then(() => {
         toast.success("Admin has been deleted successfully")
         setTimeout(() => {
             navigate("/totalAdmins")
         },2000)
        }).catch((error) => {
            console.log(error)
        })
    }
    useEffect (() => {
        HandleSingleAdmin()
    })
    return <div className="bg-[#DADADA] w-full h-screen py-5">
        <div className="w-[350px] ml-5 sm:ml-[35%] mt-20 sm:mt-6  shadow-lg  h-[500px] rounded-[20px] bg-white ">
            <form className="pt-4 ">
                <div className="flex items-center justify-between px-[20px] ">
                    <h1 className=" text-center text-[#008081] ml-20  font-Roboto text-[25px]"> Admin Details </h1>
                    <Link to="/totalAdmins"><HiOutlineBackspace className=" text-[28px]  text-[#2a7777] hover:text-[#0e0e0e]" /></Link>
                </div>
                <div className="px-6 mt-3">
                    <label className="text-deepBlue ">Name</label>
                    <input type="text" value={SingleAdmin.name} className="w-[300px] h-[40px] text-deepBlue border-2 border-[#008081] bg-lightBlue outline-none rounded-[10px] px-2" />
                    <div>
                        <div className="flex mt-1 justify-between ">
                            <label className="text-deepBlue  ml-1">ID</label>
                            <label className="text-deepBlue  mr-[110px]">Title</label>
                        </div>
                        <input value={SingleAdmin.id} type="text"  className="w-[140px] h-[40px] border-2 border-[#008081] text-deepBlue bg-lightBlue outline-none rounded-[10px] px-2 " />
                        <input value={SingleAdmin.title} type="text" className="w-[140px] h-[40px] mb-2 border-2 border-[#008081] text-deepBlue bg-lightBlue outline-none rounded-[10px] px-2 ml-5 " />
                    </div>
                    <label className="text-deepBlue  ">Email</label>
                    <input value={SingleAdmin.email} type="email"  className="w-[300px] mb-2 h-[40px] border-2 border-[#008081] text-deepBlue bg-lightBlue outline-none rounded-[10px] px-2" />
                    <label className="text-deepBlue  ">Phone Number</label>
                    <input  value={SingleAdmin.telephone} type="tell" className="w-[300px] h-[40px] mb-2 border-2 border-[#008081] text-deepBlue bg-lightBlue outline-none rounded-[10px] px-2" />
                    <label className="text-deepBlue  ">Password</label>
                    <input value={SingleAdmin.password} type="text" className="w-[300px] h-[40px] text-deepBlue border-2 border-[#008081] bg-lightBlue outline-none rounded-[10px] px-2" />
                    <div className="flex justify-between mt-5 px-[30px]">
                        <Link to={`/adminUpdate/${SingleAdmin._id}`}><FiEdit className=" text-[37px] mt-2 text-[#008081] hover:text-[#0e0e0e]" /></Link>
                        <MdOutlineDeleteOutline onClick={() => HandleDeleteAdmin(SingleAdmin._id)} className=" text-[40px] mt-2 text-[#008081] hover:text-[#0e0e0e]" />
                    </div>
                </div>

            </form>
        </div>
        <Toaster />
    </div>
}
export default AdminDetail