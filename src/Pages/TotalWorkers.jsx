import ManagerHeader from "../Components/ManagerHeader";
import ManagerSidebar from "../Components/ManagerSidebar";
import { Link } from "react-router-dom";
import { FaDeleteLeft } from "react-icons/fa6";
import axios from "axios";
import { useState, useEffect } from "react";
import { HashLoader } from "react-spinners";

function TotalWorkers() {
  const [Workers, setWorkers] = useState([]);
  const [SearchByID, setSearchByID] = useState("");
  const [Loading, setLoading] = useState(true);


  const HandleGetWorkers = () => {
    setLoading(true);
    axios
      .get("https://idan-backend.onrender.com/worker/read")
      .then((response) => {
        setWorkers(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
    })
  };
  const SearchWorkersByID = Workers.filter((worker) =>
    worker.id.toLowerCase().includes(SearchByID.toLowerCase())
  );
  useEffect(() => {
    HandleGetWorkers();
  }, []);

  return (
    <div className="w-full h-screen fixed bg-[#dadada]">
      {/* Fixed Header and Sidebar */}
      <div className="fixed ">
        <ManagerHeader setSearchByID={setSearchByID} />
        <ManagerSidebar />
      </div>

      {/* Main Content */}
      <div className="pt-[100px] overflow-auto h-screen ml-2 sm:ml-[20%] w-full">
        <h1 className="text-3xl font-semibold text-deepBlue ml-[30%] mb-4"> All Workers </h1>
          <div className="pt-[10px] px-[10px]  overflow-y-auto ">

            {/* Scrollable Table Container */}
            { Loading == true ? (
                    <HashLoader className=" sm:ml-[400px] sm:mt-[100px] mt-[60px] ml-[150px] " color="#008081" size={50} loading={Loading} /> 
            ):
              SearchWorkersByID.length > 0 ? (
                
                <div className="sm:w-[950px] w-[700px]   bg-white rounded-lg shadow-md ">
              <table className=" w-full overflow-y-auto  text-left border-collapse">
                <thead>
                  <tr className="bg-[#008080] rounded-tl-lg text-white font-semibold">
                    <td className="p-3 border-[#008080] border text-center">No.</td>
                    <td className="p-3 border-[#008080] border text-center">Admin ID</td>
                    <td className="p-3 border-[#008080] border text-center">Name</td>
                    <td className="p-3 border-[#008080] border text-center">Email</td>
                    <td className="p-3 border-[#008080] border text-center">Action</td>
                  </tr>
                </thead>
                <tbody className="bg-[#d2d2d2]">
                  {SearchWorkersByID.map((workerData, index) => (
                    <tr key={index} className="border-b border border-gray-300">
                      <td className="p-3 border text-center border-gray-500">
                        {index + 1}
                      </td>
                      <td className="p-3 border text-center border-gray-500">
                        {workerData.id}
                      </td>
                      <td className="p-3 border text-center border-gray-500">
                        {workerData.name}
                      </td>
                      <td className="p-3 border text-center border-gray-500">
                        {workerData.email}
                      </td>
                      <td className="p-3 border text-center border-gray-500">
                        <Link to={`/workerDetail/${workerData._id}`}>
                          <button className="px-2 py-1 rounded-md bg-[#008080] hover:bg-[#0e0e0e] text-white">
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
              <div className="w-full text-center py-[200px]">
                <h2 className="text-2xl font-semibold text-red-500">No Workers Found</h2>
              </div>
            )
            }
          </div>
        </div>
    </div>
  );
}

export default TotalWorkers;
