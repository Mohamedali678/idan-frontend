// import { HiUsers } from "react-icons/hi";

function OverView ({icon: Icon, Users, Count}){
    return <div>
             <div className={`sm:w-[230px] flex gap-3 items-center  w-[180px] sm:h-[100px] px-[5px] py-5 sm:py-3 shadow-md h-[90px] bg-white border-l-4 border-l-[#008081]  rounded-r-[5px]`}>
                <div className="  text-[27px] px-[10px] text-center py-[11px] sm:w-[50px] sm:h-[50px]     bg-[#cceaea]  rounded-[10px]">
                    <Icon className={` text[20px] text-[#008181] `} />
                </div>
                <div className="sm:mt-[-8px]">
                    <h1 className="text-[30px] sm:text-[35px]    font-Nunito font-bold"> {Count} </h1>
                    <h3 className=" text-[12px] sm:text-[16px] mt-[-5px] font-semibold  "> {Users}</h3>
                </div>
            </div>
    </div>
}
export default OverView
// HiUsers