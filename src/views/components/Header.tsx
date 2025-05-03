import React, { useEffect, useState } from "react";
import logo_img from "../../assets/imgs/logo_image.png";
import { getMe } from "../../services/User/getMe";
import { IUser } from "../../interfaces/user";
import { logOut } from "../../services/User/logOut";
import { Role } from "../../enums/Role";

const Header: React.FC = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const getUserProfile = async () => {
    const response = await getMe();
    if ("data" in response) {
      setUser(response.data);
    }
  };

  const handleLogout = async () => {
    sessionStorage.removeItem("access_token");
    await logOut();
    window.location.href = "/login";
  };

  useEffect(() => {
    getUserProfile();
  });

  return (
    <header className=" text-black px-6 text-2xl font-bold shadow flex justify-between items-center bg-[#FFF5F5] border-b-2 border-[#FD7A7E] sticky top-0 z-10">
      <div>
        <a href="/" className="flex items-center">
          <img src={logo_img} alt="logo_img" />
        </a>
      </div>
      <div>
        <h2 className="text-[#FB5F8B] ">
          {user?.role === Role.ADMIN ? "ADMIN MANAGEMENT" : "EDITOR MANAGEMENT"}
        </h2>
      </div>
      <div>
        <div
          className="bg-white rounded-full cursor-pointer"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="black"
            className="w-[35px] sm:w-[50px]"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </div>
        {showDropdown && (
          <div className="absolute right-2 mt-2 w-[200px] bg-white text-black rounded-lg shadow-lg z-10 p-4 text-base border-2 border-[#f198d4]">
            <p className="font-semibold mb-2">
              Hello, {user?.name || "Unknown User"}
            </p>
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-1 rounded-lg"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
