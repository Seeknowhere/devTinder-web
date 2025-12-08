import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import UserCard from "./userCard";
import { addUser } from "../utils/userSlice";
const EditProfile = ({closeEdit}) => {
  const userProfile = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { firstName, lastName, age, gender, photoUrl, about, skills } =
    userProfile.data;

  const [formData, setFormData] = useState({
    firstName : firstName || "",
    lastName: lastName || "",
    age: age || "",
    gender: gender || "",
    about: about || "",
    photoUrl: photoUrl || "",
    skills: skills || "",
  });

  const handleChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    
  };
    const handleDirectChange = (field,value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleSave = async () => {
    setError("");
    try {
      const res = await axios.patch(BASE_URL + "/profile/edit", formData, {
        withCredentials: true,
      });
      console.log(res);
      dispatch(addUser(res.data));
      alert("Profile Updated");
      closeEdit();
    } catch (err) {
      setError(err?.response?.data);
      alert("Update Failed");
    }
  };

  return (
    <div className="flex items-center justify-center m-10">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-s border p-5 gap-5">
        <legend className="fieldset-legend">Edit Profile</legend>
        <div className="flex gap-10">
          <span>
            <label>First Name </label>
            <input
              type="text"
              name="firstName"
              placeholder="Type here"
              className="input"
              value={formData.firstName}
              onChange={handleChange}
            />
          </span>
          <span>
            <label>Last Name </label>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="input"
              value={formData.lastName}
              onChange={handleChange}
            />
          </span>
        </div>
        <div className="flex gap-10">
          <span>
            <label>Age </label>
            <input
              type="number"
              name="age"
              className="input"
              value={formData.age}
              onChange={handleChange}
            />
          </span>
          <span>
            <label>Gender </label>
            <div className="dropdown bg-base-100">
              <div tabIndex={0} role="button" className="btn m-1">
                {formData.gender || "Select"}
              </div>
              <ul
                tabIndex="-1"
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                <li onClick={() => handleDirectChange("gender", "Female")}>
                  <a>Female</a>
                </li>
                <li onClick={() => handleDirectChange("gender", "Male")}>
                  <a>Male</a>
                </li>
                <li onClick={() => handleDirectChange("gender", "Non-Binary")}>
                  <a>Non-Binary</a>
                </li>
              </ul>
            </div>
          </span>
        </div>

        <div className="flex flex-col w-full">
          <label className="input validator w-full">
            Profile Picture
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
              </g>
            </svg>
            <input
              type="url"
              className="w-full"
              required
              placeholder="https://"
              value={formData.photoUrl}
              pattern="^(https?://)?([a-zA-Z0-9]([a-zA-Z0-9\-].*[a-zA-Z0-9])?\.)+[a-zA-Z].*$"
              title="Must be valid URL"
              name="photoUrl"
              onChange={handleChange}
            />
          </label>
          <p className="validator-hint">Must be valid URL</p>
        </div>
        <div className="flex">
          <label className="my-2">About</label>
          <textarea
            placeholder="Bio"
            name="about"
            className="textarea textarea-md w-full"
            value={formData.about}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-wrap gap-2 bg-base-300 h-24">
          <label>Skills</label>
          {formData.skills.map((skill, index) => (
            <div key={index} className="badge badge-primary badge-outline p-3">
              {skill}
            </div>
          ))}
        </div>
        <div><p className="text-red-500">{error}</p></div>
         <button className="btn bg-gray-600 mt-5" onClick={closeEdit}>
          Cancel
        </button>
        <button className="btn btn-primary " onClick={handleSave}>
          Save Changes
        </button>
      </fieldset>
      <UserCard user={{
        firstName,
        lastName,
        age,
        gender,
        photoUrl,
        about
      }}/>
    </div>
  );
};
export default EditProfile;
