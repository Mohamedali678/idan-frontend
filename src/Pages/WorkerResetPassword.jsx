import axios from "axios";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

function WorkerResetPassword() {
  const [ResetID, setResetID] = useState("");

  const handleForgetPassword = (e) => {
    e.preventDefault();

    axios
      .post(`http://localhost:7000/resetPassword`, )
      .then((response) => {
        if (response.data.error) {
          toast.error(response.data.error);
        } else {
          toast.success("Password Recovery Request Sent Successfully");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Wax qalad ah ayaa dhacay!");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-teal-700 mb-6 text-center">
          Forget Password
        </h2>

        <form onSubmit={handleForgetPassword} className="flex flex-col space-y-4">
          <label className="flex flex-col">
            <span className="mb-1 text-teal-700 font-semibold">Worker ID:</span>
            <input type="text"  onChange={(e) => setResetID(e.target.value)}
              placeholder="Enter your ID" required className="border border-teal-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-200 transition"
            />
          </label>

          <button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white rounded px-4 py-2 font-semibold transition">Submit</button>
        </form>
      </div>

      <Toaster />
    </div>
  );
}

export default WorkerResetPassword;
