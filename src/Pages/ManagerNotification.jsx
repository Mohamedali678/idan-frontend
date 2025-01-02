import ManagerHeader from "../Components/ManagerHeader"
import ManagerSidebar from "../Components/ManagerSidebar"
// import OverView from "../Components/Overview"
// import { HiUsers } from "react-icons/hi";
// import { FaUsers } from "react-icons/fa6";
// import { ImSpinner3 } from "react-icons/im";
// import { FaCheckDouble } from "react-icons/fa";
// import { FaUserSlash } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdOutlineMessage } from "react-icons/md";
import { FaDeleteLeft } from "react-icons/fa6";
import axios from "axios"
import { useState, useEffect } from "react";


function ManagerNotificationPage (){
    const [Notifications, setNotifications] = useState([])
    const HandleGetNotification = () => {
        axios.get("https://idan-backend.onrender.com/requests/read").then((response) => {
            setNotifications(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }


    const HandleDeleteNotification = (_id) => {
        axios.delete(`https://idan-backend.onrender.com/requests/delete/${_id}`).then(() => {
            alert("Notification deleted successfully")
        }).catch((error) => {
            console.log(error)
            alert("Error deleting notification")
        })
    }
    useEffect (() => {
        HandleGetNotification()
    })
    return <div className=" w-full h-screen">
        {/* <ManagerHeader /> */}
        <ManagerSidebar />

        <div className="pl-[20%] w-full pt-5 h-screen">
            <div className="justify-between w-full flex items-center">
                <h1 className="text-2xl font-semibold text-[#017779]"> Notifications </h1>
                <Link to="/managerDashboard"><FaDeleteLeft className="text-[30px] ml-[-100px] text-[#0E0E0E] " /></Link>
            </div>
                {/* <h1 className="text-2xl font-semibold text-[#6A6458]"> Notifications </h1>
                <Link to="/managerDashboard"><FaDeleteLeft className="text-[35px] text-[#6A6458] hover:text-[#211F1E] right-14 top-24 absolute " /></Link> */}
                  {/* Message 1 */}
                    {
                        Notifications.map((QuickMessage) =>{
                            return <div className=" w-[95%] flex px-[10px] items-center gap-2 h-[50px] rounded-lg bg-[#BEDDDF] mt-3">
                            <FaUserCircle className="text-4xl text-[#211F1E]" />
                            <div className="leading-[20px]">
                                <h1 className="text-[18px] font-semibold ml-2 text-[#211F1E]"> {QuickMessage.fullName} </h1>
                                <p className="text-[14px] ml-2"> {QuickMessage.reason}</p>
                            </div>
                            <div className="flex gap-2 items-center text-sky-900  absolute right-20">
                                <MdDelete onClick={() => HandleDeleteNotification(QuickMessage._id)} className="text-[30px] text-[#211F1E] hover:text-[#6A6458]" />
                                <Link to={`/managerMessageView/${QuickMessage._id}`}><MdOutlineMessage className="text-[28px]  hover:text-[#211F1E] text-[#211F1E]" /></Link>
                            </div>
                        </div>
                        })
                    }
    </div>
    </div>
}
export default ManagerNotificationPage