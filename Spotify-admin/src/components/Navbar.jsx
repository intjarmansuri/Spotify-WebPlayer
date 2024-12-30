import React from "react";

const Navbar = () => {
  return (
    <div className="navbar w-full border-b-2 border-gray-600 px-5 sm:px-12 py-4 bg-gradient-to-r from-[#000000] to-[#016936] text-white flex items-center justify-between">
      {/* Admin Panel Title */}
      <div className="flex items-center gap-3">
        <p className="text-xl font-bold">Admin Panel</p>
      </div>

      {/* Right Side Navigation */}
      <div className="flex items-center gap-6">
        <button className="text-sm px-4 py-2 rounded bg-white text-black hover:bg-gray-200">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
