import { Link } from "react-router-dom";
import { FaDeleteLeft } from "react-icons/fa6";
import ManagerHeader from "../Components/ManagerHeader";
import ManagerSidebar from "../Components/ManagerSidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { HashLoader } from "react-spinners";

function PendingRequests() {
  const [PendingRequests, setPendingRequests] = useState([]);
  const [PendingCount, setPendingCount] = useState(0);
  const [SearchByID, setSearchByID] = useState(""); // State for search input
  const [Loading, setLoading] = useState(true);

  // const filteredRequests = PendingRequests.filter((request) =>
  //   request.ID.toLowerCase().includes(SearchByID.toLowerCase())
  // );
  const getAllPendingRequests = () => {
    setLoading(true);
    axios
      .get("http://localhost:7000/requests/read")
      .then((res) => {
        const Allrequests = res.data;
        const allPending = Allrequests.filter((req) => req.status === "pending");
        setPendingRequests(allPending)
        setPendingCount(allPending.length) //set the count of pending requests
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
    })
  };

  const SearchWorkersRequestByID = PendingRequests.filter((request) => 
    request.ID.toLowerCase().includes(SearchByID.toLowerCase(
    
  )))
  useEffect(() => {
    getAllPendingRequests();
  }, []);

  return (
    <div className="w-full h-screen flex bg-[#dadada]">
      {/* Fixed Header and Sidebar */}
      <div className="fixed w-full z-10">
        <ManagerHeader setSearchByID={setSearchByID} />
      </div>
      <div className="fixed top-[60px] z-10">
        <ManagerSidebar />
      </div>

      {/* Scrollable Content Below Header and Sidebar */}
      <div className="sm:ml-[250px] px-[10px] sm:pp-3 sm:x-0 pt-[100px] sm:pt-[100px] w-full h-screen overflow-y-auto">
        <div className="flex items-center justify-between px-[20px] w-full">
          <h1 className="text-center text-2xl sm:text-3xl ml-12 sm:ml-64 font-semibold ">
            Pending Requests 
          </h1>
          <Link to="/managerDashboard">
            <FaDeleteLeft className="sm:text-[35px] sm:ml-[-130px] text-2xl text-[#3b3832] hover:text-[#008081]" />
          </Link>
        </div>

        {/* Scrollable Table Section */}
        {/* Search words requests by */}
        { Loading == true ? (
                    <HashLoader className=" sm:ml-[400px] sm:mt-[100px] mt-[60px] ml-[150px] " color="#008081" size={50} loading={Loading} /> 
            ): SearchWorkersRequestByID.length > 0 ? (
        <div className="w-full  mt-4 max-w-4xl mb-10 bg-white rounded-lg shadow-md">
          {/* Set the height and apply scrolling */}

          
          <div className="max-h-[600px] overflow-y-auto">
            <table className="table-auto shadow-md w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#008081] text-white font-semibold">
                  <td className="p-3 sm:p-4 text-center rounded-tl-lg">No.</td>
                  <td className="p-3 sm:p-4 text-center">ID</td>
                  <td className="p-3 sm:p-4 text-center">Name</td>
                  <td className="p-3 sm:p-4 text-center">Status</td>
                  <td className="p-3 sm:p-4 text-center">Destination</td>
                  <td className="p-3 sm:p-4 text-center rounded-tr-lg">Action</td>
                </tr>
              </thead>
              <tbody className="bg-white">
                {SearchWorkersRequestByID.map((pendingRequest, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } border-b border-gray-300 hover:bg-gray-100`}
                  >
                    <td className="p-3 sm:p-4 text-center">{index + 1}</td>
                    <td className="p-3 sm:p-4 text-center">{pendingRequest.ID}</td>
                    <td className="p-3 sm:p-4 text-center">{pendingRequest.fullName}</td>
                    <td className="p-3 sm:p-4 text-center">
                      <span
                        className={`font-semibold ${
                          pendingRequest.status === "pending"
                            ? "text-yellow-500"
                            : pendingRequest.status === "Approved"
                            ? "text-[#008081]"
                            : pendingRequest.status === "Rejected"
                            ? "text-red-500"
                            : "text-gray-500"
                        }`}
                      >
                        {pendingRequest.status}
                      </span>
                    </td>
                    <td className="p-3 sm:p-4 text-center">{pendingRequest.destination}</td>
                    <td className="p-3 sm:p-4 text-center">
                      <Link to={`/managerMessageView/${pendingRequest._id}`}>
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
        </div>
          ): (
            <p className=" ml-10 sm:ml-[30%] mt-28 text-red-600 font-semibold text-2xl"> No requests found</p>
          )}
      </div>
    </div>
  );
}

export default PendingRequests;
