import { Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddSongPage from "./pages/AddSongPage";
import AddAlbumPage from "./pages/AddAlbumPage";
import SongListPage from "./pages/SongListPage";
import AlbumListPage from "./pages/AlbumListPage";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="flex items-start min-h-screen">
      <ToastContainer />
      <Sidebar />

      <div className="flex-1 h-screen overflow-y-scroll bg-[#F3FFF7]">
        <Navbar />
        <div className="pt-8 pl-5 sm:pt-12 sm:pl-12">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin/add-song" element={<AddSongPage />} />
            <Route path="/admin/add-album" element={<AddAlbumPage />} />
            <Route path="/admin/songs" element={<SongListPage />} />
            <Route path="/admin/albums" element={<AlbumListPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
