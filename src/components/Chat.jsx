import { useParams } from "react-router-dom";
import { useEffect, useState, useMemo, useRef } from "react"; // 1. Import useRef
import { useSelector } from "react-redux";
import UserCard from "../components/UserCard";
import axios from "axios";
import io from "socket.io-client";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const allMatches = useSelector((store) => store.matches);
  const user = useSelector((store) => store.user);
  const userId = user?.data?._id || user?._id
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // 2. Create a reference for the scrolling div
  const scrollRef = useRef();

  const socket = useMemo(() => io(BASE_URL), []);
  const targetProfile = allMatches?.find((m) => m._id === targetUserId);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(BASE_URL + "/chat/" + targetUserId, {
          withCredentials: true,
        });
        setMessages(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMessages();
  }, [targetUserId]);

  useEffect(() => {
    if (!user) return;

    socket.emit("joinChat", { userId: userId });

    socket.on("messageReceived", (msg) => {
      if (msg.senderId === targetUserId || msg.senderId === userId) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => {
      socket.off("messageReceived");
    };
  }, [user,userId, targetUserId, socket]);

  // 3. AUTO-SCROLL LOGIC: Runs every time 'messages' changes
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!newMessage) return;
    socket.emit("sendMessage", {
      senderId: userId,
      targetUserId,
      text: newMessage,
    });

    setNewMessage("");
  };

  if (!allMatches || !targetProfile) {
    return (
      <div className="flex h-full w-full justify-center items-center bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const { photoUrl, firstName } = targetProfile;

  return (
    <div className="flex h-full w-full bg-base-100 rounded-2xl overflow-hidden shadow-xl border border-base-300">
      
      {/* LEFT COLUMN */}
      <div className="flex flex-col flex-grow h-full md:w-2/3 relative">
        {/* HEADER */}
        <div className="navbar bg-base-100 border-b border-base-300 px-4 py-2 h-16 flex-shrink-0 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="avatar online">
              <div className="w-11 h-11 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={photoUrl || "https://via.placeholder.com/150"}
                  alt={firstName}
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-xl text-base-content">
                {firstName}
              </h3>
              <p className="text-xs text-base-content/60">Active now</p>
            </div>
          </div>
        </div>

        {/* MESSAGES BODY */}
        <div className="flex-1 overflow-y-auto p-5 bg-base-200 flex flex-col">
          {messages.length === 0 && (
            <div className="text-center text-base-content/40 my-10">
              This is the start of your conversation with {firstName}.
            </div>
          )}
          {messages.map((msg, index) => {
            const isMe = msg.senderId === userId;
            return (
              <div
                key={index}
                className={`chat ${isMe ? "chat-end" : "chat-start"}`}
              >
                <div
                  className={`chat-bubble ${isMe ? "chat-bubble-primary" : "chat-bubble-secondary"}`}
                >
                  {msg.text}
                </div>
                <div className="chat-footer opacity-50 text-xs">
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            );
          })}
          
          {/* 4. INVISIBLE DIV FOR SCROLL TARGET */}
          <div ref={scrollRef}></div>
        </div>

        {/* INPUT FOOTER */}
        <div className="p-4 bg-base-100 border-t border-base-300 flex-shrink-0">
          <div className="join w-full shadow-sm">
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="input input-bordered w-full"
              placeholder="Type a message..."
            />
            {/* 5. ADDED CLICK HANDLER TO BUTTON */}
            <button 
                onClick={sendMessage} 
                className="btn btn-primary join-item px-6"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: PROFILE DETAILS */}
      <div className="hidden md:flex md:w-1/3 h-full border-l border-base-300 bg-base-100 flex-col items-center p-6 overflow-y-auto">
        <div className="w-full max-w-xs sticky top-0">
          <UserCard user={targetProfile} hideButtons={true} />
          <div className="mt-6 flex flex-col gap-3 w-full">
            <button className="btn btn-outline btn-error w-full">
              Unmatch
            </button>
            <button className="btn btn-ghost w-full text-base-content/60">
              Report User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;