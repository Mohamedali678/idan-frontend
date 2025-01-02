import axios from "axios";
import { useEffect, useState } from "react";
import ManagerSidebar from "../Components/ManagerSidebar";

function GetUserIdOnly() {

    const [getAllUsersForget, setGetAllUsersForget] = useState([])

    const handlegetAllUsersForget = ()=>{
        axios.get("https://idan-backend.onrender.com/getAllIdUsersForget").then((response)=>{
            setGetAllUsersForget(response.data)
        }).catch((erro)=>{
            console.log(erro);
            
        })
    } 

    useEffect(()=>{
        handlegetAllUsersForget()
    },[])

   return <div>
         <div className="bg-[#dadada] flex w-full h-screen">
      <div className="fixed">
        <ManagerSidebar />
      </div>
      <div className="sm:pt-20 pt-24 sm:pl-[18%] w-full overflow-y-auto px-[10px]">
        <h1 className="text-center text-3xl font-semibold text-[#0e0e0e]">
          All users Forget Passwords
        </h1>
        {getAllUsersForget.length > 0 ? (
          <div className="w-[950px] sm:ml-10 top-58 mt-10 overflow-y-auto bg-white rounded-lg shadow-md">
            <table className="table-auto font-Nunito w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#008080] text-white font-semibold">
                  <td className="p-3 border-[#008080] border text-center">
                    No.
                  </td>
                  <td className="p-3 border-[#008080]  border text-center">
                    user ID
                  </td>
                  
                 
                 
                </tr>
              </thead>
              <tbody className="bg-[#d2d2d2]">
                {getAllUsersForget.map((worker, index) => {
                  return (
                    <tr key={worker.id} className="border-b text-center">
                      <td className="p-2 border border-[#0e0e0e] text-center">
                        {index + 1}
                      </td>
                      <td className="p-2 border border-[#0e0e0e] text-blue-500 text-center">
                        {worker.workerId}
                      </td>
                    
                  
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="ml-10 sm:ml-[30%] mt-28 text-red-600 font-semibold text-2xl">
            No Admins found
          </p>
        )}
      </div>
    </div>
   </div>
}

export default GetUserIdOnly;
