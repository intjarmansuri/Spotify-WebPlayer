import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  return (
    <div className="bg-gradient-to-b from-[#000000] to-[#016936] min-h-screen w-[18vw] pl-6 py-5 text-white">
      {/* Logo Section */}

      <NavLink to="/">
        <img
          src={assets.logo}
          className="w-[160px] max-w-[200px] hidden sm:block mb-10"
          alt="Logo"
        />
        <img
          src={assets.logo_small}
          className="w-[60px] max-w-[80px] sm:hidden block mb-10"
          alt="Logo Small"
        />
      </NavLink>

      {/* Navigation Links */}
      <div className="flex flex-col gap-6">
        <NavLink
          to="/admin/add-song"
          className="flex items-center gap-4 bg-white text-[#1DB954] px-4 py-3 rounded-md shadow-md hover:bg-[#00FF5B]"
        >
          <img src={assets.add_song} alt="Add Song Icon" className="w-6" />
          <p className="hidden sm:block font-medium">Add Song</p>
        </NavLink>

        <NavLink
          to="/admin/songs"
          className="flex items-center gap-4 bg-white text-[#1DB954] px-4 py-3 rounded-md shadow-md hover:bg-[#00FF5B]"
        >
          <img src={assets.song_icon} alt="Songs Icon" className="w-6" />
          <p className="hidden sm:block font-medium">All Songs</p>
        </NavLink>

        <NavLink
          to="/admin/add-album"
          className="flex items-center gap-4 bg-white text-[#1DB954] px-4 py-3 rounded-md shadow-md hover:bg-[#00FF5B]"
        >
          <img src={assets.add_album} alt="Add Album Icon" className="w-6" />
          <p className="hidden sm:block font-medium">Add Album</p>
        </NavLink>

        <NavLink
          to="/admin/albums"
          className="flex items-center gap-4 bg-white text-[#1DB954] px-4 py-3 rounded-md shadow-md hover:bg-[#00FF5B]"
        >
          <img src={assets.album_icon} alt="Albums Icon" className="w-6" />
          <p className="hidden sm:block font-medium">All Albums</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
