import { useSelector } from "react-redux";
import EditProfile from "../components/EditProfile";
import ViewProfile from "../components/ViewProfile";

function Profile(){
    const user = useSelector((store) => store.user)
    return (
        <>
        <ViewProfile/>
        <div className="m-10">
            {user?.data && <EditProfile key={user.data._id}/>}
        </div>
        </>
    )
}
export default Profile;