import { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  const [songsData, setSongsData] = useState([]);
  const [albumsData, setAlbumsData] = useState([]);

  const [track, setTrack] = useState(songsData[0]);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      second: "00",
      minute: "00",
    },
    totalTime: {
      second: "00",
      minute: "00",
    },
  });

  const play = () => {
    audioRef.current.play();
    setPlayStatus(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setPlayStatus(false);
  };

  const playWithId = async (id) => {
    await songsData.map((item) => {
      if (id === item._id) {
        setTrack(item);
      }
    });

    await audioRef.current.play();
    setPlayStatus(true);
  };

  const previous = async () => {
    songsData.map(async (item, index) => {
      if (track._id === item._id && index > 0) {
        await setTrack(songsData[index - 1]);
        await audioRef.current.play();
        setPlayStatus(true);
      }
    });
  };

  const next = async () => {
    songsData.map(async (item, index) => {
      if (track._id === item._id && index < songsData.length) {
        await setTrack(songsData[index + 1]);
        await audioRef.current.play();
        setPlayStatus(true);
      }
    });
  };

  const seekSong = async (e) => {
    audioRef.current.currentTime =
      (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
      audioRef.current.duration;
  };

  const fetchSongs = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/songs/`
      );

      setSongsData(response.data.data);
      setTrack(response.data.data[0]);
    } catch (error) {}
  };

  const fetchAlbums = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/albums/`
      );
      setAlbumsData(response.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    setTimeout(() => {
      audioRef.current.ontimeupdate = () => {
        seekBar.current.style.width =
          Math.floor(
            (audioRef.current.currentTime / audioRef.current.duration) * 100
          ) + "%";

        // Format the time
        const currentMinutes = Math.floor(audioRef.current.currentTime / 60)
          .toString()
          .padStart(2, "0");
        const currentSeconds = Math.floor(audioRef.current.currentTime % 60)
          .toString()
          .padStart(2, "0");
        const totalMinutes = Math.floor(audioRef.current.duration / 60)
          .toString()
          .padStart(2, "0");
        const totalSeconds = Math.floor(audioRef.current.duration % 60)
          .toString()
          .padStart(2, "0");

        setTime({
          currentTime: {
            second: currentSeconds,
            minute: currentMinutes,
          },
          totalTime: {
            second: totalSeconds,
            minute: totalMinutes,
          },
        });
      };
    });
  }, [audioRef]);

  useEffect(() => {
    fetchSongs();
    fetchAlbums();
  }, []);

  const contextValue = {
    audioRef,
    seekBg,
    seekBar,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    playWithId,
    previous,
    next,
    seekSong,
    songsData,
    albumsData,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
