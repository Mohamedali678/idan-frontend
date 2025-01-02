import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ManagerSidebar from "../Components/ManagerSidebar"
import { FaRegCircleUser } from "react-icons/fa6";
import {toast, Toaster} from 'react-hot-toast'


function ManagerMessageView (){
    const params = useParams()
    const navigate = useNavigate()
    const [getMessage, setGetMessage] = useState({})
    const [comment, setComment] = useState("")
   
    // to store the status (pending, accpeted and rejected)
    // const [statusUpdate, setStatusUpdate] = useState("")
    const HandleGetMessage = () => {
        axios.get(`https://idan-backend.onrender.com/request/${params.id}`).then((response) => {
            // console.log(response.data)
            setGetMessage(response.data)
            calculateDuration(response.data.startDate, response.data.endDate); // Calculate duration when data is fetched

        }).catch((error) => {
            console.log(error)
        })
    }

    // Function oo update gareenaayo xaalada qofka
    const HandleUpdateStatus = (ID, statusUpdate) => {
        // console.log(ID, statusUpdate)
        axios.put(`https://idan-backend.onrender.com/update/status/${ID}`, {
            "status": statusUpdate, 
         
        }).then((res) => {
            if(res.data.message){
                if (statusUpdate === "Approved"){
                    toast.success("Request has been Approved successfully")
                } else if (statusUpdate === "Rejected"){
                    toast.success("Request has been rejected successfully")
                }
                setTimeout(() => {
                    navigate("/managerDashboard")
                },2000)

                console.log(res.data)
            }
        }).catch((error) => {
            console.log(error)
            toast.error("Error updating status, please try again later.");
        })

    }
     
    // Function to calculate duration (in days)
    const calculateDuration = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const duration = Math.floor((end - start) / (1000 * 3600 * 24)); // Difference in days
        setGetMessage(prevState => ({ ...prevState, duration })); // Update the duration in state
    };


    useEffect (() => {
        HandleGetMessage()
    },[])


    return  <div className="bg-[#DADADA] absolute w-full h-screen">
        <ManagerSidebar />
    <div className=" ">
        <div className="sm:w-[450px] w-[365px] ml-3  px-[30px] sm:px-[50px] bg-[#F2F2F2] rounded-lg pt-[20px] mt-24 sm:mt-3 sm:ml-[35%] h-[550px]  shadow-[#6A6458]">
            <h1 className="text-center text-[#3b3832] font-semibold text-[20px]"> More Details </h1>
            <div className="mt-4 gap-5">
                <div className="flex gap-2 items-center ">
                    <FaRegCircleUser className=" w-8 h-6" />
                    <h1 className=" font-semibold text-lg "> {getMessage.fullName} </h1>
                </div>
                <div className="flex mt-6 gap-10">
                    <ul className="font-semibold leading-[40px]">
                        {/* <li>Name</li> */}
                        {/* <li>ID</li> */}
                        <li>Title</li>
                        <li>Destination </li>
                        <li>Start Date</li>
                        <li>End Date</li>
                        <li>Duration </li>
                    </ul>
                    <ul className="leading-[40px] ml-[-30px] ">
                        {/* <li> : </li> */}
                        {/* <li> : </li> */}
                        <li> : </li>
                        <li> : </li>
                        <li> : </li>
                        <li> : </li>
                        <li> : </li>
                    </ul>
                    <ul className=" leading-[40px] ml-10">
                        {/* <li>{getMessage.fullName}</li> */}
                        {/* <li>{getMessage.ID}</li> */}
                        <li>{getMessage.title}</li>
                        <li>{getMessage.destination} </li>
                        <li>{new Date(getMessage.startDate).toLocaleDateString('en-SO')}</li>
                        <li>{new Date(getMessage.endDate).toLocaleDateString('en-SO')}</li>
                        <li>{getMessage.duration} days </li>
                    </ul> 
                </div>
                <div className=" ">
                    <h1 className="mt-1 mb-2 font-semibold"> Permission Reason : </h1>
                    <textarea value={getMessage.reason} className="sm:w-[360px] w-[300px]  border-black ml-[-5px] h-[75px] outline-none  px-[6px] " placeholder="Enter your reason"></textarea>
                    {/* <h1 className="mt-1 font-semibold"> Manager Comment : </h1>
                    <textarea value={comment} onChange={(event) => setComment(event.target.value)} className="w-[360px]  border-black ml-[-5px] h-[75px] outline-none  px-[6px] " placeholder="Enter your reason"></textarea> */}
                    <div className="flex mt-10 gap-28">
                        <button value="Approved" onClick={ (event) => HandleUpdateStatus(getMessage._id, event.target.value) }  className="mt-1 w-[120px] h-[35px] rounded-[8px] bg-[#3b3832] hover:bg-[#6A6458] text-white"> Approved </button>
                        <button value="Rejected" onClick={ (event) => HandleUpdateStatus(getMessage._id, event.target.value)}  className="mt-1 w-[120px] h-[35px] rounded-[8px] hover:bg-[#eb3333] bg-[#FC6161] text-white"> Rejected </button>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
    <Toaster />
    </div>
}
export default ManagerMessageView