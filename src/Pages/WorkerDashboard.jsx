import { Link } from "react-router-dom";
import axios from "axios";
import { ImSpinner3 } from "react-icons/im";
import { FaCheckDouble } from "react-icons/fa";
import { FaUserSlash } from "react-icons/fa6";
import { useEffect, useState } from "react";
import WorkerOverView from "../Components/WorkerOverView";
import WorkerSideBar from "../Components/WorkerSideBar";
import WorkerFooter from "../Components/WorkerFooter";
import { HashLoader } from "react-spinners";

function WorkerDashboard() {
    const [requests, setRequests] = useState([]);
    const [approvedCount, setApprovedCount] = useState(0); // State for approved requests count
    const [pendingCount, setPendingCount] = useState(0);   // State for pending requests count
    const [rejectedCount, setRejectedCount] = useState(0); // State for rejected requests count
    const [Loading, setLoading] = useState(false);
    const id = localStorage.getItem("worker");

    const HandleGetResult = () => {
        // setLoading(true);
        axios.get(`https://idan-backend.onrender.com/request/SingleRead/${JSON.parse(id).id}`)
            .then((response) => {
                setRequests(response.data);
                // Filter approved, pending, and rejected requests and count them
                const approvedRequests = response.data.filter(request => request.status === "Approved");
                const pendingRequests = response.data.filter(request => request.status === "pending"); 
                const rejectedRequests = response.data.filter(request => request.status === "Rejected");

                setApprovedCount(approvedRequests.length); // Set count for approved requests
                setPendingCount(pendingRequests.length);   // Set count for pending requests
                setRejectedCount(rejectedRequests.length); // Set count for rejected requests
                setLoading(true)
            })

            .catch((error) => {
                console.log(error);
                alert("Error in getting requests");
            })
    };

    // setTimeout(() => {


    //     HandleGetResult()
    // }, 9000)

    useEffect(() => {
        HandleGetResult();
    });

    

    return (
        <div className=" flex h-screen">
            {/* Sidebar */}
            <div className="sm:w-[250px]  sm:fixed">
                <WorkerSideBar />
            </div>

            {/* Main content */}
            <div className=" sm:ml-[230px] mb-20  overflow-y-auto">
                <div className="pt-10 px-4 mt-12 sm:mt-0">
                    <h1 className="text-[25px] font-semibold">Request Status Insights</h1>
                    <div className="pt-4 sm:flex grid-cols-[160px_160px] gap-6 grid sm:gap-24">
                        <Link to="/workerPendingRequests">
                            <WorkerOverView icon={ImSpinner3} IconColor="text-black" Users="Pending Requests" Count={pendingCount} />
                        </Link>
                        <Link to="/workerAcceptedRequests">
                            <WorkerOverView icon={FaCheckDouble} IconColor="text-black" Users="Approved Requests" Count={approvedCount} /> 
                        </Link>
                        <Link to="/workerRejectedRequests">
                            <WorkerOverView icon={FaUserSlash} IconColor="text-black" Users="Rejected Requests" Count={rejectedCount} />
                        </Link>
                    </div>
                </div>

                <div className="px-4 mt-10">
                    <h1 className="text-[23px] font-semibold">Previous Requests</h1>
                    {
                        Loading == false ? (
                        <HashLoader className=" sm:ml-[450px] sm:mt-[100px] mt-[60px] ml-[150px] " color="#008081" size={50} loading={Loading} /> 
                        ) : requests.length > 0 ? (
                        <div className="mt-4 overflow-x-auto">
                            <table className="shadow-md rounded-lg w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-[#008081] text-white text-[14px] font-semibold">
                                        <td className="p-4 text-center text-sm rounded-tl-lg">No.</td>
                                        <td className="p-4 text-center">Start Date</td>
                                        <td className="p-4 text-center">End Date</td>
                                        <td className="p-4 text-center">Status</td>
                                        <td className="p-4 text-center">Destination</td>
                                        <td className="p-4 text-center rounded-tr-lg">Action</td>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {requests.map((RequestMessage, index) => (
                                        <tr key={index} className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} border-b border-gray-300 hover:bg-gray-100`}>
                                            <td className="p-4 text-center">{index + 1}</td>
                                            <td className="p-4 text-center">{new Date(RequestMessage.startDate).toLocaleDateString('en-SO')}</td>
                                            <td className="p-4 text-center">{new Date(RequestMessage.endDate).toLocaleDateString('en-SO')}</td>
                                            <td className="p-4 text-center">
                                                <span className={`font-semibold ${
                                                    RequestMessage.status === "pending" ? "text-yellow-500"
                                                    : RequestMessage.status === "Approved" ? "text-[#008081]"
                                                    : RequestMessage.status === "Rejected" ? "text-red-500"
                                                    : "text-gray-500" // Default for unknown statuses
                                                }`}>{RequestMessage.status}</span>
                                            </td>
                                            <td className="p-4 text-center">{RequestMessage.destination}</td>
                                            <td className="sm:p-4 text-center">
                                                <Link to={RequestMessage.status === "Approved" || RequestMessage.status === "Rejected" 
                                                ? `/workerMessageView/${RequestMessage._id}`
                                                : `/workerViewBox/${RequestMessage._id}`}>
                                                    <button className="sm:px-4 w-[110px] py-2 bg-[#008081] text-white rounded-md hover:bg-[#1b5a5a]">
                                                        View More
                                                    </button>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div>
                            <h1 className="text-[20px] font-semibold pt-32 text-center text-red-500">NO Requests were found</h1>
                        </div>
                    )},
                </div>
                <WorkerFooter />
            </div>
        </div>
    );
}

export default WorkerDashboard;
