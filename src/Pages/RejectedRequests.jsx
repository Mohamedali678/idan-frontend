import { Link } from "react-router-dom";
import { FaDeleteLeft } from "react-icons/fa6";
import ManagerHeader from "../Components/ManagerHeader";
import ManagerSidebar from "../Components/ManagerSidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { HashLoader } from "react-spinners";
function RejectedRequests() {
  const [RejectedRequests, setRejectedRequests] = useState([]);
  const [SearchByID, setSearchByID] = useState("");
  const [Loading, setLoading] = useState(true);

  const getAllRejectedRequests = () => {
    setLoading(true);
    axios
      .get("https://idan-backend.onrender.com/requests/read")
      .then((res) => {
        const AllRequests = res.data;
        setRejectedRequests(AllRequests.filter((req) => req.status === "Rejected"));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getAllRejectedRequests();
  }, []);

  // Filtering the rejected requests based on the SearchByID value
  const SearchWorkersRequestByID = RejectedRequests.filter((request) =>
    request.ID.toLowerCase().includes(SearchByID.toLowerCase())
  );

  return (
    <div className="w-full flex h-screen bg-[#dadada]">
      {/* Fixed Header and Sidebar */}
      <div className="fixed w-full z-10">
        <ManagerHeader setSearchByID={setSearchByID} />
      </div>
      <div className="fixed top-[60px] z-10">
        <ManagerSidebar />
      </div>

      {/* Scrollable Content Below Header and Sidebar */}
      <div className="sm:ml-[250px] px-[10px] sm:px-0 sm:pt-[80px] pt-[100px] w-full h-screen overflow-y-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between px-[20px] w-full">
          <h1 className="text-center text-2xl sm:text-3xl ml-12 sm:ml-64 font-semibold ">
            Rejected Requests
          </h1>
          <Link to="/managerDashboard">
            <FaDeleteLeft className="sm:text-[35px] sm:ml-[-130px] text-2xl text-[#3b3832] hover:text-[#008081]" />
          </Link>
        </div>

        {/* Table Section */}
        { Loading == true ? (
                    <HashLoader className=" sm:ml-[400px] sm:mt-[100px] mt-[60px] ml-[150px] " color="#008081" size={50} loading={Loading} /> 
            ):SearchWorkersRequestByID.length > 0 ? (
          <div className="w-full mt-3 max-w-4xl mb-10 bg-white rounded-lg shadow-md">
            <div className="max-h-[600px] overflow-y-auto">
              <table className="table-auto shadow-md w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#008081] text-white font-semibold">
                    <td className="sm:p-4 p-3 text-center rounded-tl-lg">No.</td>
                    <td className="sm:p-4 p-3 text-center">ID</td>
                    <td className="sm:p-4 p-3 text-center">Name</td>
                    <td className="sm:p-4 p-3 text-center">Status</td>
                    <td className="sm:p-4 p-3 text-center">Destination</td>
                    <td className="sm:p-4 p-3 text-center rounded-tr-lg">Action</td>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {SearchWorkersRequestByID.map((rejectedRequest, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } border-b border-gray-300 hover:bg-gray-100`}
                    >
                      <td className="sm:p-4 p-3 text-center">{index + 1}</td>
                      <td className="sm:p-4 p-3 text-center">{rejectedRequest.ID}</td>
                      <td className="sm:p-4 p-3 text-center">{rejectedRequest.fullName}</td>
                      <td className="sm:p-4 p-3 text-center">
                        <span
                          className={`font-semibold ${
                            rejectedRequest.status === "pending"
                              ? "text-yellow-500"
                              : rejectedRequest.status === "approved"
                              ? "text-[#008081]"
                              : rejectedRequest.status === "Rejected"
                              ? "text-red-500"
                              : "text-gray-500"
                          }`}
                        >
                          {rejectedRequest.status}
                        </span>
                      </td>
                      <td className="sm:p-4 p-3 text-center">{rejectedRequest.destination}</td>
                      <td className="sm:p-4 p-3 text-center">
                        <Link to={`/managerMessageView/${rejectedRequest._id}`}>
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
        ) : (
          <p className=" ml-10 sm:ml-[30%] mt-28 text-red-600 font-semibold text-2xl">
            No requests found
          </p>
        )}
      </div>
    </div>
  );
}

export default RejectedRequests;
