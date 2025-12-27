import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addSingleMatch } from "../utils/matchesSlice";

const UserCard = ({ user, onNext, hideButtons }) => {
  if (!user) {
    return null;
  }
  const { firstName, lastName, photoUrl, age, gender, about,skills } = user;
  const dispatch = useDispatch();
  const handleLike = async () => {
    try {
      const res = await axios.post(
        BASE_URL + `/swipe/like/${user._id}`,
        {},
        { withCredentials: true }
      );
      console.log(res);
      if (res.data.isMatch) {
        dispatch(addSingleMatch(user));
      }

      onNext();
    } catch (err) {
      console.error(err.message);
    }
  };
  const handlePass = () => {
    onNext();
  };
  return (
    <div className="card bg-base-100 w-96 shadow-xl hover:shadow-2xl transition-all duration-300">
      <figure className="relative">
        <img src={photoUrl} alt="user" className="h-100 w-full object-cover" />

        {/* Optional: Overlay gradient for better text visibility if you put name on image */}
        <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-black/50 to-transparent"></div>
      </figure>

      <div className="card-body">
        <h2 className="card-title text-2xl">
          {firstName} {lastName}
          {age && (
            <div className="badge badge-secondary font-normal text-sm">
              {age + " "}
              {gender === "female" ? "F" : gender === "male" ? "M" : "NB"}
            </div>
          )}
        </h2>
        <p className="text-base-content/70 line-clamp-3">{about}</p>
        <p className="text-base-content/70 line-clamp-3">{skills}</p>

        {/* BUTTONS */}
        {!hideButtons && (
          <div className="card-actions justify-center gap-6 mt-4">
            {/* PASS BUTTON */}
            <button
              onClick={handlePass}
              className="btn btn-circle btn-outline btn-error w-14 h-14 hover:bg-error hover:text-white transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* LIKE BUTTON */}
            <button
              onClick={handleLike}
              className="btn btn-circle btn-outline btn-success w-14 h-14 hover:bg-success hover:text-white transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
