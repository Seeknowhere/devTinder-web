import HomeDashboard from "../components/HomeDashboard";
import { useSelector } from "react-redux";

function Home() {
    const user = useSelector((store)=>store.user)
    console.log(user)
    return(
        <> 
        <div>
           {user?.data && <HomeDashboard key={user.data._id}/>}
        </div>
       
        </>
    )
}
export default Home;