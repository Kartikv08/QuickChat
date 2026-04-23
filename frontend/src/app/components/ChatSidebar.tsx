import React, { useState } from "react";
import { User } from "../context/AppContext";

interface ChatSidebarProps {
  sidebarOpen: boolean;
  setSiderbarOpen: (open: boolean) => void;
  showAllUsers: boolean;
  setshowAllUsers: (show: boolean | ((prev: boolean) => boolean)) => void;
  users: User[] | null;
  loggedInUser: User | null;
  chats: any[] | null;
  selectedUser: string | null;
  setSelectedUser: (userId: string | null) => void;
  handleLogout: () => void;
}

const ChatSidebar = ({
  sidebarOpen,
  setshowAllUsers,
  setSiderbarOpen,
  showAllUsers,
  users,
  loggedInUser,
  chats,
  selectedUser,
  setSelectedUser,
  handleLogout,
}: ChatSidebarProps) => {
    const [searchQuery, setSearchQuery] = useState("");
  return <div>ChatSidebar</div>;
};

export default ChatSidebar;
