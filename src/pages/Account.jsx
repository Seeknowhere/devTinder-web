import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
const Account = () => {
  const user = useSelector((store) => store.user);
  console.log(user);
  const { firstName, lastName, emailId, username, password } = user.data;
  const [oldPassword, setOldPassword] = useState("");
   const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [showInput, setShowInput] = useState(false)
  const navigate = useNavigate();
    
  const handleChangePassword = () => {
    setShowInput(true);
  };
  const handleSave = async() => {
    try{
        await axios.patch(BASE_URL + "/resetPassword", {
            oldPassword, newPassword
        }, {withCredentials:true})
        alert("Password changed Succesfully!")
        navigate("/");
        
  }catch(err){
    setError(err?.resonse?.data || "Something went wrong");
    console.error(err?.response?.data) || "Something went wrong";
  }
}
const handleCancel = () => {
  navigate("/")
}

  return (
    <div className="flex items-center justify-center my-10">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Account Settings</legend>
        <label className="label">Name</label>
        <input
          type="text"
          className="input"
          value={firstName + " " + lastName}
          readOnly
        />
        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={emailId}
          readOnly
        />
        {showInput ? (
          <div className="flex flex-col gap-1 mt-2">
            <label className="label hover:cursor-pointer">Change Password</label>
            <input
              type="password"
              className="input "
              placeholder="Enter old password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <input
              type="text"
              className="input "
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        ) : (
          <a className="text-blue-300 mt-2" onClick={handleChangePassword}>
            Change Password
          </a>
        )}

        <p className="text-red-500">{error}</p>
        <button className="btn btn-neutral mt-4 bg-base-100" onClick={handleCancel}>Cancel</button>
        <button className="btn btn-neutral" onClick={handleSave}>Save</button>
      </fieldset>
    </div>
  );
};
export default Account;
