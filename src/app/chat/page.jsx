"use client";
import { useState, useEffect } from "react";
import { connectSocket } from "@/utils/socket";
import { apiRequest } from "@/services/api";
import Link from "next/link";
import ChatMateLogo from "../ChatMateLogo/ChatMateLogo";

export default function ChatPage() {
  const [users, setUsers] = useState([]);
  const [receiverId, setReceiverId] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [friendEmail, setFriendEmail] = useState("");
  const [requests, setRequests] = useState([]);
  const [unreadCounts, setUnreadCounts] = useState({});
  const [isTyping, setIsTyping] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [receiverName, setReceiverName] = useState("");



  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;


  const user =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("user"))
    : null;

const userId = user?.id;    

// Socket connection
 useEffect(() => {
  if (!token) return;

  const s = connectSocket(token);
  setSocket(s);

  s.on("connect", () => {
    console.log("🟢 Connected:", s.id);
  });

  s.on("receive_message", (msg) => {
    setMessages((prev) => [...prev, msg]);

    if (msg.senderId !== receiverId) {
      setUnreadCounts((prev) => ({
        ...prev,
        [msg.senderId]: (prev[msg.senderId] || 0) + 1,
      }));
    }
  });

  s.on("online_users", (users) => {
  setOnlineUsers(users);
  });

  s.on("typing", () => {
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 1500);
  });

  return () => {
    s.disconnect();
  };
}, [token, receiverId]);


//Message send
const sendMessage = () => {
   if (!message.trim() || !socket || !receiverId) return;

    socket.emit("send_message", {
      receiverId,
      text: message,
    });

    setMessage("");
  };

//Add friends
  useEffect(() => {
  if (!token) return;

  apiRequest("/friends/requests", "GET", null, token)
    .then((data) => {
      setRequests(Array.isArray(data) ? data : []);
    })
    .catch((err) => {
      console.error(err);
      setRequests([]);
    });
}, [token]);


// Fetch friends list
useEffect(() => {
  if (!token) return;

  apiRequest("/users/friends", "GET", null, token)
    .then((data) => {
      setUsers(Array.isArray(data) ? data : []);
    })
    .catch((err) => {
      console.error(err);
      setUsers([]);
    });
}, [token]);

//For Logout
const handleLogout = () => {
  // remove auth data
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  // disconnect socket 
  if (socket) {
    socket.disconnect();
  }

  // redirect to login
  window.location.href = "/login";
};

//For Typing
const handleTyping = () => {
  socket.emit("typing", { receiverId });
};


 return (
  <div className="h-screen bg-[#0b0e14] text-white flex">

    {/* LEFT ICON BAR */}
    <div className="w-16 bg-[#0a0c11] flex flex-col  items-center py-6 gap-6 border-r border-white/5">
      <span ></span>
      <button
       className=" px-1 py-1  border-2  rounded-full">
      <Link href="/" >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25" height="25">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill="#ffffff "/>
         </svg>
      </Link>
      </button>
      <button
          onClick={handleLogout}
          className=" px-1 py-1 border-2 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" 
          className="w-6 h-6 " 
          fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-label="Logout"> 
          <path d="M9 21H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h3"/> 
          <path d="M16 17l5-5-5-5"/> 
          <path d="M21 12H9"/> </svg>
      </button>
    </div>

    {/* INBOX / USERS */}
    <div className="w-80 bg-[#12141b] border-r border-white/10 p-4 overflow-y-auto">
      <ChatMateLogo/>

      {/* Add Friend */}
      <div className="mb-4">
        <input
          value={friendEmail}
          onChange={(e) => setFriendEmail(e.target.value)}
          placeholder="Friend Email"
          className="w-full mb-2 px-3 py-2 rounded bg-white/10 outline-none"
        />
        <button
          onClick={async () => {
            try {
              await apiRequest("/friends/send", "POST", { email: friendEmail }, token);
              alert("Friend request sent");
              setFriendEmail("");
            } catch (err) {
              alert(err.message);
            }
          }}
          className="w-full bg-purple-600 py-2 rounded"
        >
          Add Friend
        </button>
      </div>

      {/* Requests */}
      {requests.length > 0 && (
        <>
          <p className="text-xs text-gray-400 mb-2">Requests</p>
          {requests.map((req) => (
            <div key={req._id} className="flex justify-between items-center p-2 bg-white/10 rounded mb-2">
            <div className="flex items-center gap-2">

  <div>
    <p className="font-medium">{u.name}</p>
    <p className="text-xs text-gray-400">{u.email}</p>
  </div>
</div>

<button
 onClick={async () => {
 await apiRequest("/friends/accept", "POST", { requestId: req._id }, token);
 setRequests((prev) => prev.filter((r) => r._id !== req._id));
 }}
 className="bg-green-600 px-3 py-1 rounded text-sm"
 >
 Accept
</button>
</div>
  ))}
  </>
      )}

      {/* USERS LIST */}
      <div className="mt-4 space-y-2">
      {users.map((u) => (
      <div
      key={u._id}
      onClick={() => {
        setReceiverId(u._id);
        setReceiverName(u.name);
        setUnreadCounts((prev) => ({ ...prev, [u._id]: 0 }));
      }}
      className={`p-3 rounded-lg cursor-pointer flex justify-between items-center ${
        receiverId === u._id ? "bg-purple-600" : "hover:bg-white/10"
      }`}
    >
      <div className="flex items-center gap-2">
        {/* ONLINE / OFFLINE DOT */}
        <span
          className={`w-2.5 h-2.5 rounded-full ${
            onlineUsers.includes(String(u._id))
              ? "bg-green-500"
              : "bg-gray-500"
          }`}
        />

        <div>
          <p className="font-medium">{u.name}</p>
          <p className="text-xs text-gray-400">{u.email}</p>
        </div>
      </div>

      {unreadCounts[u._id] > 0 && (
        <span className="bg-pink-500 text-xs px-2 py-0.5 rounded-full">
          {unreadCounts[u._id]}
        </span>
      )}
    </div>
  ))}
      </div>
    </div>

    {/* CHAT AREA */}
    <div className="flex-1 flex flex-col">

      {/* HEADER */}
      <div className="h-16 px-6 flex items-center justify-between bg-[#12141b] border-b border-white/10">
        <div>
          <p className=" uppercase font-bold">
            {receiverId ? receiverName : "Select a user"}
          </p>
          {isTyping && (
            <p className="text-xs text-green-400">Typing...</p>
          )}
        </div>

         
      </div>

      {/* MESSAGES */}
      <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-linear-to-b from-[#0e1117] to-[#0a0c11]">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.senderId === userId ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-md ${
                msg.senderId === userId
                  ? "bg-linear-to-r from-purple-600 to-pink-500"
                  : "bg-white/10"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* INPUT */}
      <div className="h-16 px-4 flex items-center gap-3 bg-[#12141b] border-t border-white/10">
        <input
          disabled={!receiverId}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            socket?.emit("typing", { receiverId });
          }}
          placeholder={receiverId ? "Type a message..." : "Select a chat"}
          className="flex-1 bg-white/5 px-4 py-2 rounded-full outline-none disabled:opacity-50"
        />
        <button
          onClick={sendMessage}
          className="px-6 py-2 rounded-full bg-linear-to-r from-purple-600 to-pink-500"
        >
          Send
        </button>
      </div>
    </div>
  </div>
);

}
