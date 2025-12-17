import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect, useState } from "react";
import UserCard from "./userCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const [index, setIndex] = useState(0);
  
  const dispatch = useDispatch();
  const getFeed = async () => {
   
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getFeed();
  }, []);

  const handleNextUser = () => {
    setIndex((prev) => prev + 1)
  }
  if(!feed)return;
  if(feed.length === 0) return <div>No new users found!</div>
  return feed && (
    <div className="flex justify-center " >
        <UserCard user={feed.data[index]} onNext={handleNextUser}/>
    </div>
  );
};
export default Feed;
