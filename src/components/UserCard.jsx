import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addSingleMatch } from "../utils/matchesSlice";

const UserCard = ({user, onNext, hideButtons}) => {
    if(!user){
      return null;
    }
    const {firstName, lastName, photoUrl, age,gender,about} = user;
    const dispatch = useDispatch();
    const handleLike = async() => {
        try {
          const res = await axios.post(BASE_URL + `/swipe/like/${user._id}`,{}, {withCredentials:true})
          console.log(res);
          if(res.data.isMatch){
            dispatch(addSingleMatch(user));
          }

          onNext()
        }catch(err){
          console.error(err.message)
        }  
    }
    const handlePass = () => {
        onNext() 
    }
  return (
    <div className="card bg-base-200 w-96 h-[500px] sm:h- shadow-sm rounded-2xl">
      <figure className="">
        <img
        className="w-96 h-[600px]"
          src={photoUrl}
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title ">{firstName + " " + lastName}</h2>
        <p className="text-gray-400">
          {age  + (gender === "male" ?"M":gender ==="female"?"F":"NB")}
        </p>
        <p>{about}</p>
        {!hideButtons && (<div className="card-actions justify-end">
          <button className="btn bg-rose-500" onClick={handlePass}>Pass</button>
          <button className="btn bg-green-400" onClick={handleLike}>Like</button>
        </div>)}
      </div>
    </div>
  );
};

export default UserCard;