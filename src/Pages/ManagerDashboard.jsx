import ManagerHeader from "../Components/ManagerHeader";
import ManagerSidebar from "../Components/ManagerSidebar";
import OverView from "../Components/Overview";
import { ImSpinner3 } from "react-icons/im";
import { FaCheckDouble } from "react-icons/fa";
import { FaUserSlash } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HashLoader } from "react-spinners";
import axios from "axios";

function ManagerDashboard() {
    const params = useParams();
    const [PendingRequests, setPendingRequests] = useState([]);
    const [Requests, setRequests] = useState([]);
    const [SearchByID, setSearchByID] = useState("");
    const [approvedCount, setApprovedCount] = useState(0); // State for approved requests count
    const [pendingCount, setPendingCount] = useState(0);   // State for pending requests count
    const [rejectedCount, setRejectedCount] = useState(0); // State for rejected requests count
    const [Loading, setLoading] = useState(true);

    const getAllPendingRequests = () => {
        setLoading(true);
        axios.get("https://idan-backend.onrender.com/requests/read")
            .then((res) => {
                const AllRequests = res.data;
                setRequests(AllRequests);
                
                const approvedRequests = AllRequests.filter(request => request.status.toLowerCase() === "approved");
                const pendingRequests = AllRequests.filter(request => request.status.toLowerCase() === "pending");
                const rejectedRequests = AllRequests.filter(request => request.status.toLowerCase() === "rejected");

                setApprovedCount(approvedRequests.length);
                setPendingCount(pendingRequests.length);
                setRejectedCount(rejectedRequests.length);

                setPendingRequests(pendingRequests);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            })
    };

    useEffect(() => {
        const filteredUsersID = Requests.filter((request) =>
            request.ID.toLowerCase().includes(SearchByID.toLowerCase())
        );
        const pendingRequests = filteredUsersID.filter(
            (request) => request.status.toLowerCase() === "pending"
        );
        setPendingRequests(pendingRequests);
    }, [SearchByID, Requests]);

    useEffect(() => {
        getAllPendingRequests();
    }, []);

    return (
        <div className="flex w-full bg-[#DADADA] h-screen">
            {/* Fixed sidebar */}
            <div className="fixed top-0 left-0 h-full z-20">
                <ManagerHeader setSearchByID={setSearchByID} />
                <ManagerSidebar setSearchByID={setSearchByID} />
            </div>

            {/* Main content */}
            <div className=" sm:ml-[20%] pt-20 sm:pt-24 px-[10px] overflow-y-auto h-full w-full">
                <h1 className="text-[20px] font-semibold">Dashboard Overview</h1>
                <div className="pt-4 sm:flex grid-cols-[160px_160px] gap-y-4 gap-x-5 sm:ml-12 grid sm:gap-16 sm:mt-0">
                    <Link to="/pendingRequests">
                        <OverView icon={ImSpinner3} Users="Pending Requests" Count={pendingCount} />
                    </Link>
                    <Link to="/acceptedRequests">
                        <OverView icon={FaCheckDouble} Users="Accepted Requests" Count={approvedCount} />
                    </Link>
                    <Link to="/rejectedRequests">
                        <OverView icon={FaUserSlash} Users="Rejected Requests" Count={rejectedCount} />
                    </Link>
                </div>

                <div className="mt-10">
                    <h1 className="font-semibold text-[20px]">Waiting Requests</h1>
                    { Loading == true ? (
                        <HashLoader className=" sm:ml-[450px] sm:mt-[100px] mt-[60px] ml-[150px] " color="#008081" size={50} loading={Loading} /> 
                        ) : PendingRequests.length > 0 ? (
                        <div className="overflow-auto mt-4">
                            <table className="shadow-md rounded-lg w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-[#008081] text-white font-semibold">
                                        <td className="p-4 text-center rounded-tl-lg">No.</td>
                                        <td className="p-4 text-center"> ID</td>
                                        <td className="p-4 text-center">Name</td>
                                        <td className="p-4 text-center">Status</td>
                                        <td className="p-4 text-center">Destination</td>
                                        <td className="p-4 text-center rounded-tr-lg">Action</td>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {PendingRequests.map((pending, index) => (
                                        <tr key={index} className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} border-b border-gray-300 hover:bg-gray-100`}>
                                            <td className="p-4 text-center">{index + 1}</td>
                                            <td className="p-4 text-center">{pending.ID}</td>
                                            <td className="p-4 text-center">{pending.fullName}</td>
                                            <td className="p-4 text-center">{pending.status}</td>
                                            <td className="p-4 text-center">{pending.destination}</td>
                                            <td className="p-4 text-center">
                                                <Link to={`/managerMessageView/${pending._id}`}>
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
                        <div className="text-center mt-10 text-red-500">
                            <h1 className="text-[20px] font-semibold">NO Requests were found</h1>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ManagerDashboard;
