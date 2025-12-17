import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addMatches } from "../utils/matchesSlice";
import { Link } from "react-router-dom";

const Matches = () => {
  const matches = useSelector((store) => store.matches);
  const dispatch = useDispatch();
  const getMatches = async () => {
    try {
      const res = await axios.get(BASE_URL + "/matches", {
        withCredentials: true,
      });
      dispatch(addMatches(res?.data?.data));
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getMatches();
  }, []);
  if (!matches) {
    return (
      <div>
        <div></div>
      </div>
    );
  }
  return (
    <div>
      {matches.map((match) => {
        return (
          <Link to={`chat/${match._id}/`}>
          <div className="flex flex-row items-center gap-4 bg-base-100 hover:bg-base-300 hover:cursor-pointer p-2 w-full">
            <div className="border-2 border-rose-400 p-1 rounded-4xl">
              <img src={match.photoUrl} className="h-10 w-10 rounded-4xl" />
            </div>
            <div className="flex flex-col">
             <p>{match.firstName + " " + match.lastName}</p>
             <p className="text-gray-400">Say Hi!</p>
            </div>
           
          </div>
          </Link>
         
        );
      })}
    </div>
  );
};
export default Matches;
