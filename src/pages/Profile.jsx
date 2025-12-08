import { useSelector } from "react-redux";
import { useState } from "react";
import EditProfile from "../components/EditProfile";
import ViewProfile from "../components/ViewProfile";

function Profile() {
  const user = useSelector((store) => store.user);
  const [isEditing, setIsEditing] = useState(false);
  console.log(isEditing)
  return (
    <>
      {isEditing ? (
        <div className="m-10">
          {user?.data && <EditProfile closeEdit= {() => setIsEditing(false)}key={user.data._id} />}
        </div>
      ) : (
        <ViewProfile startEdit={() => setIsEditing(true)} />
      )}
    </>
  );
}
export default Profile;
