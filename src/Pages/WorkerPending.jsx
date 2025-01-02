import { Link } from "react-router-dom"
import { FaDeleteLeft } from "react-icons/fa6";
// import { AiFillDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import axios from "axios";
import WorkerSideBar from "../Components/WorkerSideBar";
import { HashLoader } from "react-spinners";
function WorkerPendingRequests (){

    const [allPendingRequests, setAllPendingRequests] = useState([])
    const [Loading, setLoading] = useState(false)

    const id = localStorage.getItem("worker")

    const getAllPendingRequests = () => {
        setLoading(true)
            axios.get(`http://localhost:7000/request/SingleRead/${JSON.parse(id).id}`).then((res) => {
                const WorkerPending = res.data;
                const filteredRequest = WorkerPending.filter((req) => req.status === "pending")
                setAllPendingRequests(filteredRequest)
            }).catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false)
            })
        }
    
        useEffect(() => {
            getAllPendingRequests()
        },[])

    return <div className="w-full flex h-screen  bg-[#DADADA]">
        <div className="fixed">
            <WorkerSideBar />
        </div>
        <div className="sm:ml-[250px] px-[10px] sm:pp-3 sm:x-0 pt-[100px] sm:pt-[100px] w-full h-screen overflow-y-auto"> 
            <div className="flex items-center justify-between px-[20px] w-full">
                <h1 className=" text-center text-2xl sm:text-3xl  sm:ml-64 font-semibold"> Worker Pending Requests </h1>
                <Link to="/workerDashboard"><FaDeleteLeft className="sm:text-[40px] text-[30px] text-[#3b3832] hover:text-[#008081]  " /></Link>
            </div>
            {
                Loading == true ? (
                    <HashLoader className=" sm:ml-[400px] sm:mt-[100px] mt-[60px] ml-[150px] " color="#008081" size={50} loading={Loading} /> 
            ):
            <div className="w-full  mt-4 max-w-4xl mb-10 bg-white rounded-lg shadow-md">

                <table className="  w-full text-left border-collabse">
                        <thead>
                            <tr className="bg-[#008081]   text-white">
                                <td className="sm:p-4 p-2 text-center rounded-tl-lg"> No.</td>
                                <td className="sm:p-4 p-2  text-center"> ID </td>
                                <td className="sm:p-4 p-2  text-center"> Name </td>
                                <td className="sm:p-4 p-2  text-center"> Status </td>
                                <td className="sm:p-4 p-2  text-center"> Destination </td>
                                <td className="sm:p-4 p-2  text-center rounded-tr-lg"> Action </td>
                            </tr>
                        </thead>
                        <tbody className="bg-white">

                            {allPendingRequests.map((requestInfo, index) => {
                                return <tr key={index}  className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} border-b border-gray-300 hover:bg-gray-100`}>
                                <td className="sm:p-4 p-2 text-center "> {index + 1}</td>
                                <td className="sm:p-4 p-2 text-center"> {requestInfo.ID} </td>
                                <td className="sm:p-4 p-2 text-center"> {requestInfo.fullName} </td>
                                <td className="sm:p-4 p-2 text-center"> <span className="text-[#0E0E0E]   rounded-[5px] px-3 py-1"> {requestInfo.status} </span> </td>
                                <td className="sm:p-4 p-2 text-center"> {requestInfo.destination}  </td> {/* make the world range 5 word +*/}
                                <td className="sm:p-4 p-2 text-center"> 
                                    <Link to={ requestInfo.status === "Approved" || requestInfo.status === "Rejected" 
                                    ? `/workerMessageView/${requestInfo._id}` 
                                    : `/workerViewBox/${requestInfo._id}`
                                    }> 
                                        <button className="sm:px-4 w-[110px] py-2 bg-[#008081] text-white rounded-md hover:bg-[#1b5a5a]">
                                            View More
                                        </button>
                                    </Link>  
                                </td>                            
                                </tr>
                                })
                            }
                        </tbody>
                        
                    </table>
    </div>
    }
        </div>
    </div>
}
export default WorkerPendingRequests