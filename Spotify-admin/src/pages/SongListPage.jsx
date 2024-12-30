import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const SongListPage = () => {
  const [data, setData] = useState([]);

  // Fetch all songs
  const fetchSongs = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/songs/`
      );

      if (response.data.success) {
        setData(response.data.data);
      }
    } catch (error) {
      toast.error("Error fetching songs");
    }
  };

  // Remove a song by ID
  const removeSong = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/songs/${id}`
      );

      if (response.data.success) {
        toast.success("Song removed successfully");
        await fetchSongs();
      }
    } catch (error) {
      console.error("Error ", error);
      toast.error("Error removing song");
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <div>
      <p className="text-xl font-bold mb-4">All Songs List</p>
      <br />
      <div>
        <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
          <b>Image</b>
          <b>Name</b>
          <b>Album</b>
          <b>Duration</b>
          <b>Action</b>
        </div>
        {data.map((item, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5"
            >
              <img src={item.image} className="w-12" alt="" />
              <p>{item.name}</p>
              <p>{item.album}</p>
              <p>{item.duration}</p>
              <p
                className="cursor-pointer"
                onClick={() => removeSong(item._id)}
              >
                X
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SongListPage;
