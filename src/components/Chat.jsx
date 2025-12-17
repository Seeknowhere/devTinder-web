import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import UserCard from "../components/userCard"; // Ensure path is correct

const Chat = () => {
  const { targetUserId } = useParams();
  const allMatches = useSelector((store) => store.matches);

  // Robust loading states that center nicely in the available space
  if (!allMatches) {
    return (
      <div className="flex h-full w-full justify-center items-center bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const userProfile = allMatches.find((user) => user._id === targetUserId);

  if (!userProfile) {
    return (
      <div className="flex h-full w-full justify-center items-center bg-base-200 text-xl font-semibold text-error">
        User not found.
      </div>
    );
  }

  const { photoUrl, firstName } = userProfile;

  return (
    // MAIN CONTAINER: Fills the <Outlet> space defined in Home.jsx
    <div className="flex h-full w-full bg-base-100 rounded-2xl overflow-hidden shadow-xl border border-base-300">
      
      {/* ==================== LEFT COLUMN: CHAT AREA ==================== */}
      {/* Grows to fill space, takes 2/3 width on large screens */}
      <div className="flex flex-col flex-grow h-full md:w-2/3 relative">
        
        {/* --- 1. CHAT HEADER (Fixed Height) --- */}
        <div className="navbar bg-base-100 border-b border-base-300 px-4 py-2 h-16 flex-shrink-0 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="avatar online"> {/* 'online' gives a green dot */}
              <div className="w-11 h-11 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={photoUrl || "https://via.placeholder.com/150"} alt={firstName} className="object-cover"/>
              </div>
            </div>
            <div>
               <h3 className="font-bold text-xl text-base-content">{firstName}</h3>
               <p className="text-xs text-base-content/60">Active now</p>
            </div>
          </div>
          {/* Optional: Three dots menu icon */}
          <div className="ml-auto">
             <button className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM17.25 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" /></svg>
             </button>
          </div>
        </div>

        {/* --- 2. MESSAGES BODY (Scrollable Middle) --- */}
        {/* flex-1 makes it fill remaining height. overflow-y-auto allows scrolling */}
        <div className="flex-1 overflow-y-auto p-5 bg-base-200 flex flex-col-reverse">
           {/* NOTE: flex-col-reverse makes the scroll start at the bottom (latest messages) */}

          {/* MOCK RECEIVED MESSAGE (Them) */}
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img src={photoUrl} alt="avatar"/>
              </div>
            </div>
             <div className="chat-header text-xs opacity-50 mb-1">
                {firstName} <time>12:45</time>
            </div>
            <div className="chat-bubble chat-bubble-secondary shadow-sm">Hey! We matched! 😄</div>
          </div>

           {/* MOCK SENT MESSAGE (You) */}
           <div className="chat chat-end mb-4">
            <div className="chat-header text-xs opacity-50 mb-1">
                You <time>12:46</time>
            </div>
            <div className="chat-bubble chat-bubble-primary shadow-sm">Hi there! How are you doing?</div>
             <div className="chat-footer opacity-50 text-xs mt-1">Seen</div>
          </div>
          
           {/* Simple starter text if no messages exist yet */}
           <div className="text-center text-base-content/40 my-10">
              This is the start of your conversation with {firstName}.
           </div>
        </div>

        {/* --- 3. INPUT FOOTER (Fixed Height) --- */}
        <div className="p-4 bg-base-100 border-t border-base-300 flex-shrink-0">
          {/* Using DaisyUI 'join' to connect input and button seamlessly */}
          <div className="join w-full shadow-sm">
            <input
              type="text"
              placeholder={`Message ${firstName}...`}
              className="input input-bordered join-item w-full bg-base-200 focus:outline-none border-primary/30 focus:border-primary"
            />
            <button className="btn btn-primary join-item px-6">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ==================== RIGHT COLUMN: PROFILE DETAILS ==================== */}
      {/* Hidden on mobile, visible on medium screens+ takes 1/3 width */}
      <div className="hidden md:flex md:w-1/3 h-full border-l border-base-300 bg-base-100 flex-col items-center p-6 overflow-y-auto">
        <h4 className="text-lg font-bold text-base-content/70 mb-6 w-full text-center uppercase tracking-wide">Profile Details</h4>
        
        {/* Container for the UserCard to ensure it fits nicely */}
        <div className="w-full max-w-xs sticky top-0">
             <UserCard user={userProfile} hideButtons={true} />
             
             {/* Extra actions below the card */}
             <div className="mt-6 flex flex-col gap-3 w-full">
                 <button className="btn btn-outline btn-error w-full">Unmatch</button>
                 <button className="btn btn-ghost w-full text-base-content/60">Report User</button>
             </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;