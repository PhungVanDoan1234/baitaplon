import { useEffect, useMemo, useState } from "react";
import Wrapper from "../../components/wrapper/Wrapper";
import ReactPlayer from "react-player/lazy";
import "./playListPage.css";
import { Alert } from "react-bootstrap";
import { Button } from "@mui/material";

function PlayListPage() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const songs = [
    {
      id: 1,
      title: "Neu Luc Do",
      artist: "tlinh",
      url: PF + "NeuLucDo-tlinh2pillz-8783613.mp3",
    },
    {
      id: 2,
      title: "Ghe Iu Dau Cua Em Oi",
      artist: "tlinh",
      url: PF + "GheIuDauCuaEmOi-tlinh2pillzWOKEUPAT4AM-8677578.mp3",
    },
  ];

  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mode, setMode] = useState("normal");

  return (
    <Wrapper sologan={"Play List 📼"}>
      <div className="playlist">
        <ReactPlayer
          className="react-player"
          style={{
            margin: "0 auto",
          }}
          height={"80px"}
          url={currentSong.url}
          playing={isPlaying}
          controls
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => {
            if (mode === "repeat") {
              setIsPlaying(true);
            } else if (mode === "random") {
              const randomIndex = Math.floor(Math.random() * songs.length);
              setCurrentSong(songs[randomIndex]);
              setIsPlaying(true);
            } else if (mode === "sequential") {
              const currentIndex = songs.findIndex(
                (song) => song.id === currentSong.id
              );
              const nextIndex = (currentIndex + 1) % songs.length;
              setCurrentSong(songs[nextIndex]);
              setIsPlaying(true);
            }
          }}
        />
        <div className="controls">
          <Button
            className={`control-button ${mode === "random" ? "active" : ""}`}
            onClick={() => setMode("random")}
          >
            Random
          </Button>
          <Button
            className={`control-button ${
              mode === "sequential" ? "active" : ""
            }`}
            onClick={() => setMode("sequential")}
          >
            Sequential
          </Button>
          <Button
            className={`control-button ${mode === "repeat" ? "active" : ""}`}
            onClick={() => setMode("repeat")}
          >
            Repeat
          </Button>
        </div>
        <ul className="song-list">
          {songs.map((song) => (
            <li key={song.id} onClick={() => setCurrentSong(song)}>
              <Alert
                variant="light"
                style={{ width: "55%", margin: " 20px auto" }}
              >
                {song.title} - {song.artist}
              </Alert>
            </li>
          ))}
        </ul>
      </div>
    </Wrapper>
  );
}

export default PlayListPage;
