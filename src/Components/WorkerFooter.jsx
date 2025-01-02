import { RiUserLine } from "react-icons/ri";
import { RiUserFill } from "react-icons/ri";
// import { FiUserPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { RiShutDownLine } from "react-icons/ri";
import { LuLayoutDashboard } from "react-icons/lu";
import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import { LuMessageSquarePlus } from "react-icons/lu";
import { FaUser } from "react-icons/fa6";
function WorkerFooter(){
    const navigate = useNavigate();  // useNavigate hook to navigate to other pages
        const [IsUserOpen, setIsUserOpen] = useState(false)
    const HandleOpen = () => {
        setIsUserOpen(true)
    }
    const HandleClose = () => {
        setIsUserOpen(false)
    }
    const worker = localStorage.getItem('worker'); // worker is key in local storage
    const LogOut = () => {
        localStorage.clear();
        navigate("/");
    }
    return <div className=" ">
    <div className="bg-[#008081] sm:hidden flex h-[55px] justify-around items-center gap-10 pt-2 w-full absolute bottom-0">
        <Link to="/workerDashboard">
            <div className="">
                <LuLayoutDashboard className="sm:text-[28px] text-[30px] hover:text-black ml-5  text-white" />
            </div>
        </Link>
        <Link to="/workerForm">
            <div className="">
                <LuMessageSquarePlus className="sm:text-[27px] text-[30px] sm:hover:text-white hover:text-black ml-5  text-white" />
            </div>
        </Link>
        <div className="">
            <div className="" onClick={() => setIsUserOpen(!IsUserOpen)}>
                {IsUserOpen ? (
            <RiUserFill className="sm:text-[28px] text-[30px] hover:text-black   sm:ml-4 text-white" />
                ) : (
            <RiUserLine className="sm:text-[28px] text-[30px] hover:text-black   sm:ml-4 text-white" />
                )}
            </div>
            {/* <h1 className="text-white hidden sm:flex text-[18px]">Profile</h1> */}
        </div>
    </div>
    <div style={{display: IsUserOpen ? "block" : "none"}} className="w-[200px]  shadow-md  sm:right-4 right-4 fixed sm:top-12 top-20  h-[240px]  bg-white rounded-[10px]">
        <div className="w-full h-[50px]  rounded-t-[10px] bg-[#008081] shadow-b-md shadow-b-gray-200 pt-5 rounded-b-[20px]">
            <div className="w-[50px] ml-[36%]   py-[10px] px-[5px] h-[50px] shadow rounded-full bg-white">
                <FaUser className="w-[30px] h-[30px] ml-1 text-[#008081]" />
            </div>
            <div className="px-[20px] mt-3">
                <h1 className="text-[18px] text-center font-semibold font-Roboto"> {JSON.parse(worker).name} </h1>
                <h1 className="text-[16px]  font-Roboto"> <span className="font-semibold">ID:</span> {JSON.parse(worker).id} </h1>
                <h1 className="text-[16px]  font-Roboto"> <span className="font-semibold">Title:</span> {JSON.parse(worker).title} </h1>
                <button onClick={LogOut} className="w-[100px] flex items-center gap-2 justify-center px-1  h-[35px] mt-3 text-white bg-[#008081] hover:bg-[#0E0E0E] rounded-[5px] ml-7"> Log Out <RiShutDownLine className="w-[20px] h-[20px] " /></button>
            </div>
        </div>
    </div>
    </div>
}
export default WorkerFooter