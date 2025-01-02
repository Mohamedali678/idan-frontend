import { Link } from "react-router-dom";
import { TiBackspaceOutline } from "react-icons/ti";

import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WorkerSideBar from "./WorkerSideBar";
import {toast, Toaster} from "react-hot-toast";
function WorkerForm() {
    const [StartDate, setStartDate] = useState("");
    const [EndDate, setEndDate] = useState("");
    const [Duration, setDuration] = useState(0);
    const [Destination, setDestination] = useState("");
    const [PermissionReason, setPermissionReason] = useState("");
    const navigate = useNavigate();

    const worker = localStorage.getItem('worker'); // worker is key in local storage

    const HandlePostRequest = (e) => {
        e.preventDefault();
        axios.post("https://idan-backend.onrender.com/new/request", {
            "fullName": JSON.parse(worker).name,
            "ID": JSON.parse(worker).id,
            "title": JSON.parse(worker).title,
            "startDate": StartDate,
            "endDate": EndDate,
            "duration": Duration,
            "destination": Destination,
            "reason": PermissionReason
        }).then((response) => {
            if(response.data.error){
                // alert("Error");
                setTimeout(() => {
                    toast.error("Error in sending request")
                },2000)
            }
            else {
                // alert("Request has been sent successfully");
                toast.success("Request sent successfully");
                setTimeout(() => {
                    navigate("/workerDashboard");
                },2000)
                calculateDuration(response.data.startDate, response.data.endDate); // Calculate duration when data is fetched
            }
        }).catch((error) => {
            // alert("Error in sending request");
            console.log(error);
        });
    };
    const calculateDuration = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const duration = Math.floor((end - start) / (1000 * 3600 * 24)); // Difference in days
        setGetMessage(prevState => ({ ...prevState, duration })); // Update the duration in state
    };

    // Automatically calculate duration when StartDate or EndDate changes
    useEffect(() => {
        if (StartDate && EndDate) {
            const start = new Date(StartDate);
            const end = new Date(EndDate);
            const duration = Math.floor((end - start) / (1000 * 3600 * 24)); // Difference in days
            setDuration(duration); // Set the calculated duration
        } else {
            setDuration(0); // Reset duration if dates are missing
        }
    }, [StartDate, EndDate]); 
    return <div>
        <WorkerSideBar />
        <div className="bg-[#D9D9D9] w-full h-screen py-12">
            <div className="w-[370px] px-2 ml-2 sm:mt-0 mt-20 sm:ml-[38%] shadow-lg h-[480px] rounded-[8px] bg-white ">
                <form className="pt-4">
                    <div className="flex">
                        <Link to="/workerDashboard">
                            <TiBackspaceOutline className="absolute text-[25px] mt-2 text-[#008081] hover:text-[#1a4343] ml-[310px]" />
                        </Link>
                        <h1 className="text-center text-[#008081] ml-[80px]  font-Roboto text-[25px]">
                            Apply Permission
                        </h1>
                    </div>
                    <div className="px-[25px] ">
                        <div>
                            <div className="flex mt-3 justify-between">
                                <label className="text-deepBlue  ">Start Date</label>
                                <label className="text-deepBlue  mr-[80px]">End Date</label>
                            </div>
                            <input value={StartDate} onChange={(event) => setStartDate(event.target.value)} type="date" className="w-[140px] h-[40px] text-gray-400   border-2 border-[#008081] bg-lightBlue outline-none rounded-[5px] px-2" />
                            <input value={EndDate} onChange={(event) => setEndDate(event.target.value)} type="date" className="w-[140px] h-[40px] text-gray-400 border-2 border-[#008081] bg-lightBlue outline-none rounded-[5px] px-2 ml-5 mb-1" />
                        </div>
                        <div className="mt-3">
                            <div className="flex mt-1 justify-between">
                                <label className="text-deepBlue  ml-1">Duration</label>
                                <label className="text-deepBlue  mr-[62px]">Destination</label>
                            </div>
                            <input value={Duration + " days"} readOnly type="text" placeholder="Duration of trip" className="w-[140px] h-[40px] text-deepBlue bg-lightBlue border-2 border-[#008081] outline-none rounded-[5px] px-2" />
                            <input value={Destination} onChange={(event) => setDestination(event.target.value)} type="text" placeholder="Trip Destination" className="w-[140px] border-2 border-[#008081] h-[40px] text-deepBlue bg-lightBlue outline-none rounded-[5px] px-2 ml-5 mb-1" />
                        </div>
                        <div className="mt-3">
                            <label className="text-deepBlue  ">Permission Reason</label>
                            <textarea value={PermissionReason} onChange={(event) => setPermissionReason(event.target.value)} className="w-[300px] h-[140px] text-deepBlue border-2 border-[#008081] bg-lightBlue outline-none rounded-[5px] px-2 mt-1 py-1"></textarea>
                            <button onClick={HandlePostRequest} className="w-[300px] h-[40px] text-white bg-[#008081] hover:bg-[#0E0E0E] rounded-[5px] mt-5">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <Toaster />
    </div>
}

export default WorkerForm;
