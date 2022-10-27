import React from "react";
import "./WatchScreen.css";
import { ArrowBackOutlined } from "@mui/icons-material";
import { useLocation } from "react-router-dom";

function WatchScreen() {
  const location = useLocation();
  const length = location.state.movie.videos.results.length;
  const key = location.state.movie.videos.results[`${length - 1}`].key;
  // console.log(location.state.movie.videos.results[`${length - 1}`].key);
  console.log(location);
  return (
    <div className="watchScreen">
      <div className="watchScreen_nav">
        <div className="watchScreen_back">
          <a href=".">
            <ArrowBackOutlined />
            Home
          </a>
        </div>
      </div>

      <iframe
        className="iframe"
        src={`https://www.youtube.com/embed/${key}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default WatchScreen;
