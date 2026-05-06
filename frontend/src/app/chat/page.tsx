"use client";
import React, { useEffect, useState } from "react";
import { chat_service, useAppData, User } from "../context/AppContext";
import { useRouter } from "next/navigation";
import Loading from "../components/Loading";
import ChatSidebar from "../components/ChatSidebar";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import axios from "axios";

export interface Message {
  _id: string;
  chatId: string;
  sender: string;
  text?: string;
  image?: {
    url: string;
    publicId: string;
  };
  messageType: "text" | "image";
  seen: boolean;
  seenAt?: string;
  createdAt: string;
}

const chatApp = () => {
  const {
    loading,
    isAuth,
    logoutUser,
    chats,
    user: loggedInUser,
    users,
    fetchChats,
    setChats,
  } = useAppData();

  const [selected, setSelected] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [sidebarOpen, setSiderbarOpen] = useState(false);
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [showAllUser, setshowAllUser] = useState(false);
  const [isTyping, setisTyping] = useState(false);
  const [typingTimeOut, setTypingTimeOut] = useState<NodeJS.Timeout | null>(
    null,
  );

  const router = useRouter();
  useEffect(() => {
    if (!isAuth && !loading) {
      router.push("/login");
    }
  }, [isAuth, loading, router]);

  const handleLogout = () => {
    logoutUser();
  };

  async function fetchChat() {
    const token = Cookies.get("token");
    try {
      const { data } = await axios.get(
        `${chat_service}/api/v1/message/${selected}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setMessages(data.messages);
      setUser(data.user);
      await fetchChats();
    } catch (error) {
      toast.error("Failed to load messages");
    }
  }

  async function createChat(u: User) {
    try {
      const token = Cookies.get("token");
      const { data } = await axios.post(
        `${chat_service}/api/v1/chat/new`,
        {
          userId: loggedInUser?._id,
          otherUserId: u._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setSelected(data.chatId);
      setshowAllUser(false);
      await fetchChats();
    } catch (error) {
      toast.error("Failed to create chat");
    }
  }

  useEffect(() => {
    if (selected) {
      fetchChat();
    }
  }, [selected]);

  if (loading) return <Loading />;
  return (
    <div className="min-h-screen flex bg-gray-900 text-white relative overflow-hidden">
      <ChatSidebar
        sidebarOpen={sidebarOpen}
        setSiderbarOpen={setSiderbarOpen}
        showAllUsers={showAllUser}
        setshowAllUsers={setshowAllUser}
        users={users}
        loggedInUser={loggedInUser}
        chats={chats}
        selectedUser={selected}
        setSelectedUser={setSelected}
        handleLogout={handleLogout}
        createChat={createChat}
      />
      <div className="flex-1 flex flex-col justify-between p-4 backdrop-blur-xl bg-white/5 border-1 border-white/10"></div>
    </div>
  );
};

export default chatApp;
