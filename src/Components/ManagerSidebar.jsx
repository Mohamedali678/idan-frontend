import { FaUserPlus } from "react-icons/fa6";
import { FaUserTie } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { HiUsers } from "react-icons/hi";
import { LiaUserTieSolid } from "react-icons/lia";
import { LuLayoutDashboard } from "react-icons/lu";
import { TbUsersGroup } from "react-icons/tb";
import { LiaUserPlusSolid } from "react-icons/lia";
import { TbUserPlus } from "react-icons/tb";
import { FaBarsStaggered } from "react-icons/fa6";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { RiShutDownLine } from "react-icons/ri";
import { IoIosSearch } from "react-icons/io";
import { FiKey } from "react-icons/fi";


function ManagerSidebar ({setSearchByID}){
    // const [SearchInput, setSearchInput] = useState("")

    const navigate = useNavigate();
    const admin = localStorage.getItem('admin'); // admin is key in local storage NOte meelwalbana admin ka dhig 
    const LogOut = () => {
        localStorage.clear();
        navigate("/");
    }
    const [IsOpen , setIsOpen] = useState(false)
    const [IsProfileOpen , setIsProfileOpen] = useState(false)


    const HandleOpen = () => {
        setIsOpen(true)
    }
    const HandleClose = () => {
        setIsOpen(false)
    }

    return <div className="bg-[#008081] fixed h-[70px]  sm:h-screen  sm:block flex mb-[400px]  justify-between px-[px] sm:px-0 items-center  top-0  sm:pt-4  w-full sm:w-[16%]  ">
        {/* Mobile reposnive header  */}
        <div className="flex w-full justify-between px-[20px] items-center">
            <h1 className=" text-[25px] text-white sm:pb-5 sm:w-full font-semibold text-center font-Roboto"> iDan </h1> 
            <div className="flex  sm:hidden ">
                        <input onChange={(e) => setSearchByID(e.target.value)} type="text" placeholder="Search by ID" className="w-[180px] pl-8 border-[1px] h-[40px] text-black bg-lightBlue outline-none rounded-[10px] px-2" />
                        <IoIosSearch className="text-[22px] text-black ml-2 absolute mt-[10px]" />
                    </div>
            <div className="flex gap-3">
                {/* User Profile Controlling state */}
                <div className="flex items-center text-white gap-3 sm:hidden  ">
                    {
                        IsProfileOpen ? (
                            <FaUser onClick={() =>  setIsProfileOpen(false)} className="text-2xl  text-[#0e0e0e] hover:text-white "  />
                        ) : (
                            <FaUser onClick={() =>  setIsProfileOpen(true)}  className="text-2xl   text-[#0e0e0e] hover:text-white "  />
                        )
                    }
                </div>
                {/* Bars icon */}
                <div className="">
                    <FaBarsStaggered style={{display: IsOpen == true ? "none" : ""}} onClick={HandleOpen} className="sm:hidden text-[25px] hover:text-white" />
                    <FaBarsStaggered style={{display: IsOpen == true ? "block" : ""}} onClick={HandleClose} className="hidden text-[25px] hover:text-white" />
                </div>
            </div>
        </div>
        {/* User Profile Container  */}
        <div style={{display: IsProfileOpen ? "block" : "none"}} className="w-[200px]  sm:right-4 right-4   z-10  fixed top-16  h-[220px]  bg-white rounded-[10px]">
            <div className="w-full h-[50px]  rounded-t-[10px] bg-[#008081] shadow-b-md shadow-b-gray-200 pt-5 rounded-b-[20px]">
                <div className="w-[50px] ml-[36%]   py-[10px] px-[5px] h-[50px] shadow rounded-full bg-white">
                    <FaUser className="w-[30px] h-[30px] ml-1 text-[#008081]" />
                </div>
                <div className="px-[20px] mt-3">
                    <h1 className="text-[18px] text-center font-semibold font-Roboto"> {JSON.parse(admin).name.substring(0,15)+"..."}</h1> {/*name kan wuxuu ka imade broweser/localstorage dhaxdisa gaar ahaan markuu kuusoo qabto admin information meshas ka dhax doro name, id, iyo title ka aa ubahan thy*/}
                    <h1 className="text-[16px]  font-Roboto"> <span className="font-semibold">ID:</span> {JSON.parse(admin).id} </h1>
                    <h1 className="text-[16px]  font-Roboto"> <span className="font-semibold">Title:</span> {JSON.parse(admin).title} </h1>
                    <button onClick={LogOut} className="w-[100px] flex items-center gap-2 justify-center px-1  h-[35px] mt-3 text-white bg-[#008081] hover:bg-[#0e0e0e] rounded-[5px] ml-7"> Log Out <RiShutDownLine className="w-[20px] h-[20px] " /></button>
                </div>
            </div>
        </div>
        {/* Drop down side bar  */}
        <div style={{display: IsOpen == true ? "block" : ""}} className="sm:block w-full pb-4 bg-[#008081] rounded-b-[20px] absolute top-[68px] hidden items-center sm:mt-10 px-[px]">
          
            <Link to="/managerDashboard">
                <div className="flex gap-2 items-center w-[180px] hover:bg-[#0E0E0E] h-[40px] rounded-[10px] ">
                    <LuLayoutDashboard className="text-[28px] ml-5  text-white" />
                    <h1 className="text-white text-[18px]">Dashboard</h1>
                </div>
            </Link>
            <Link to="/totalAdmins">
                <div className="flex gap-2 items-center mt-5 w-[180px] hover:bg-[#0E0E0E] h-[40px] rounded-[10px] ">
                    <LiaUserTieSolid className="text-[28px] ml-5  text-white" />
                    <h1 className="text-white text-[18px]">Admins</h1>
                </div>
            </Link>
            <Link to="/totalWorkers">
                <div className="flex gap-2 items-center  mt-5 w-[180px] hover:bg-[#0E0E0E] h-[40px] rounded-[10px] ">
                    <TbUsersGroup className="text-[28px] ml-5  text-white" />
                    <h1 className="text-white text-[18px]">Employees</h1>
                </div>
            </Link>
            <Link to="/addAdmin">
                <div className="flex gap-2 items-center mt-5 w-[180px] hover:bg-[#0E0E0E] h-[40px] rounded-[10px] ">
                    <LiaUserPlusSolid className="text-[28px] ml-5  text-white" />
                    <h1 className="text-white text-[18px]">Add Admin</h1>
                </div>
            </Link>
            <Link to="/addWorker">
                <div className="flex gap-2 items-center mt-5 w-[180px] hover:bg-[#0E0E0E] h-[40px] rounded-[10px] ">
                    <TbUserPlus className="text-[28px] ml-5  text-white" />
                    <h1 className="text-white text-[18px]">Add Employee</h1>
                </div>
            </Link>
            <Link >
                <div className="flex gap-2 items-center mt-5 w-[200px] hover:bg-[#0E0E0E] h-[40px] rounded-[10px] ">
                <FiKey className="text-[28px] ml-5  text-white" />
                <h1 className="text-white text-[18px]">Reset Passwords </h1>
                </div>
            </Link>
        
           
        </div>
    </div>
}
export default ManagerSidebar