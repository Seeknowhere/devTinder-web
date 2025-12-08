import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const Signup = () => {
  const [emailId, setEmailId] = useState("");
   const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("")
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async() => {
    try{
        await axios.post(BASE_URL + "/signup", {
        emailId,
        password,
        username,
        firstName,
        lastName,
        age
    }, {withCredentials:true});
    
    alert("Signed up successfully!")
    navigate("/login")

    }catch(err){
        setError(err?.response?.data)
    }
  
}
  return (
    <div className="flex items-center justify-center my-10">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Create account</legend>

        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
        />
        <label className="label">Username</label>
        <input
          type="text"
          className="input"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <hr className="m-2 border-gray-600"/>
         <label className="label">First Name</label>
        <input
          type="text"
          className="input"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label className="label">Last Name</label>
        <input
          type="text"
          className="input"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <label className="label">Age</label>
        <input
          type="number"
          className="input"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        
        <p className="text-red-500">{error}</p>
        <button className="btn btn-neutral mt-4 hover:bg-base-100" onClick={handleSignup}>Sign up</button>
        <div className="w-full flex justify-center">
          <p className="">
            Have an account?{" "}
            <Link to="/Login" className="hover:underline text-blue-300">
              Log in
            </Link>
          </p>
        </div>
      </fieldset>
    </div>
  );
};
export default Signup;
