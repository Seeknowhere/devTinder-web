import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import UserCard from "./userCard";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ closeEdit }) => {
  const userProfile = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  

  const { firstName, lastName, age, gender, photoUrl, about, skills } = userProfile?.data || {};

  const [formData, setFormData] = useState({
    firstName: firstName || "",
    lastName: lastName || "",
    age: age || "",
    gender: gender || "",
    about: about || "",
    photoUrl: photoUrl || "",
    skills: skills || [], 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setError("");
    try {
      const res = await axios.patch(BASE_URL + "/profile/edit", formData, {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
      // Optional: Add a toast notification here
      closeEdit();
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-start gap-10 m-8 max-w-6xl mx-auto">
      
      <div className="card bg-base-100 w-full md:w-2/3 shadow-xl border border-base-200">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">Edit Profile</h2>
          
          {/* Row 1: Name */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">First Name</span>
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="input input-bordered w-full"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Last Name</span>
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="input input-bordered w-full"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Row 2: Age & Gender */}
          <div className="flex flex-col md:flex-row gap-4 mt-2">
            <div className="form-control w-full md:w-1/3">
              <label className="label">
                <span className="label-text font-semibold">Age</span>
              </label>
              <input
                type="number"
                name="age"
                className="input input-bordered w-full"
                value={formData.age}
                onChange={handleChange}
              />
            </div>
            <div className="form-control w-full md:w-2/3">
              <label className="label">
                <span className="label-text font-semibold">Gender</span>
              </label>
              <select 
                name="gender" 
                className="select select-bordered w-full"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="" disabled>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-Binary">Non-Binary</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Row 3: Photo URL */}
          <div className="form-control mt-2 w-full">
            <label className="label">
              <span className="label-text font-semibold">Profile Picture URL</span>
            </label>
            <div className="join w-full">
                <span className="btn btn-disabled join-item bg-base-200 border-base-300">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 opacity-50">
                        <path fillRule="evenodd" d="M1 8a2 2 0 0 1 2-2h.93a2 2 0 0 0 1.664-.89l.812-1.22A2 2 0 0 1 8.07 3h3.86a2 2 0 0 1 1.664.89l.812 1.22A2 2 0 0 0 16.07 6H17a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8Zm13.5 3a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM10 14a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                    </svg>
                </span>
                <input
                    type="url"
                    name="photoUrl"
                    placeholder="https://example.com/photo.jpg"
                    className="input input-bordered join-item w-full"
                    value={formData.photoUrl}
                    onChange={handleChange}
                />
            </div>
          </div>

          {/* Row 4: About */}
          <div className="form-control mt-2 w-full">
            <label className="label">
              <span className="label-text font-semibold">About Me</span>
            </label>
            <textarea
              name="about"
              className="textarea textarea-bordered h-24 text-base w-full"
              placeholder="Tell us about yourself..."
              value={formData.about}
              onChange={handleChange}
            />
          </div>

          {/* Row 5: Error Message */}
          {error && (
             <div role="alert" className="alert alert-error mt-4 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Row 6: Buttons */}
          <div className="card-actions justify-end mt-6 gap-3">
             <button className="btn btn-ghost" onClick={closeEdit}>Cancel</button>
             <button className="btn btn-primary px-8" onClick={handleSave}>Save Profile</button>
          </div>

        </div>
      </div>

      {/* RIGHT SIDE: LIVE PREVIEW */}
      {/* Hidden on mobile, sticky on desktop */}
      <div className="hidden md:flex flex-col items-center w-1/3 min-w-[300px]">

        <div className="sticky top-10">
            {/* IMPORTANT: We pass formData here, not the redux state, so it updates live */}
            <UserCard 
                user={formData} 
                hideButtons={true} 
            />
        </div>
      </div>

    </div>
  );
};

export default EditProfile;