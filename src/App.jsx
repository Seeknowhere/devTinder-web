import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { addUser } from "./utils/userSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";



function App() {
  const dispatch = useDispatch();
    const fetchUser = async() => {
        try{
            const res = await axios.get(BASE_URL + "/profile/view", { withCredentials:true});
            dispatch(addUser(res.data));
        }catch(err){
            console.error(err)
        }
    }
    useEffect(()=>{
        fetchUser();
    },[])
  return (
    <>
    <NavBar/>
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
         <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
