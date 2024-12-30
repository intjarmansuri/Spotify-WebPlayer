import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AlbumListPage = () => {
  const [data, setData] = useState([]);

  const fetchAlbums = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/albums/`
      );

      if (response.data.success) {
        setData(response.data.data);
      }
    } catch (error) {
      toast.error("No albums Found");
    }
  };

  // Remove a album by ID
  const removeAlbum = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/albums/${id}`
      );

      if (response.data.success) {
        toast.success("Album removed successfully");
        await fetchAlbums();
      }
    } catch (error) {
      confirm.error("Error removing album,", error);
      toast.error("Error removing album");
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  return (
    <div>
      <p className="text-xl font-bold mb-4">All Albums List</p>
      <br />
      <div>
        <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
          <b>Image</b>
          <b>Name</b>
          <b>Description</b>
          <b>Album Colour</b>
          <b>Action</b>
        </div>
        {data.map((item, index) => {
          return (
            <div
              key={index}
              className="sm:grid grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100"
            >
              <img className="w-12" src={item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.desc}</p>
              <input type="color" value={item.bgColor} disabled />
              <p
                onClick={() => removeAlbum(item._id)}
                className="cursor-pointer"
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

export default AlbumListPage;
