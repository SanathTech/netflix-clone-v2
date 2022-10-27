import React, { useEffect, useState } from "react";
import "./InfoScreen.css";
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ExpandMoreOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

function InfoScreen({
  title,
  index,
  movie,
  slideNumber,
  length,
  width,
  runTime,
  contentRating,
  year,
  isHovered,
  sendDataToParent,
}) {
  const base_url = "https://image.tmdb.org/t/p/original/";
  const poster_width = (120 * 16) / 9 + 5;
  const [isHoveredActive, setIsHoveredActive] = useState(isHovered);
  const num_posters = Math.floor(width / poster_width);
  const video_index = (movie.videos.results.length - 1).toString();

  useEffect(() => {
    if (!isHoveredActive) {
      sendDataToParent(
        movie,
        index,
        isHoveredActive,
        runTime,
        contentRating,
        year
      );
    }
  }, [isHoveredActive]);

  return (
    <div
      key={`${title}-${index}-${movie.id}`}
      className="infoScreen_modal"
      onMouseEnter={() => setIsHoveredActive(true)}
      onMouseLeave={() => setIsHoveredActive(false)}
      style={{
        left:
          index !== 0 && index !== slideNumber
            ? index !== length - 1 && index !== slideNumber + num_posters - 1
              ? ((index - slideNumber) % num_posters) * poster_width -
                (325 - poster_width) / 2 +
                width * 0.04
              : ((index - slideNumber) % num_posters) * poster_width -
                (325 - poster_width) +
                width * 0.04
            : width * 0.04,
      }}
    >
      <img
        className="infoScreen_modal_image"
        key={movie.id}
        src={`${base_url}${movie.backdrop_path}`}
        alt={movie.name}
      />
      {movie.images.logos.length !== 0 && (
        <img
          key={movie.id * movie.id}
          className="infoScreen_modal_logo"
          src={`${base_url}${movie.images.logos["0"].file_path}`}
          alt={movie.name}
        />
      )}
      {movie.videos.results.length !== 0 &&
        movie.videos.results[video_index].key && (
          <iframe
            src={`https://www.youtube.com/embed/${movie.videos.results[video_index].key}?&modestbranding=1&iv_load_policy=3&fs=0&autoplay=1&mute=1&controls=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        )}
      <div className="infoScreen_modal_info">
        <div className="infoScreen_modal_icons">
          <Link to="/WatchScreen" state={{ movie: movie }}>
            <PlayArrow className="infoScreen_modal_icon white" />
          </Link>
          <Add className="infoScreen_modal_icon" />
          <ThumbUpAltOutlined className="infoScreen_modal_icon" />
          <ExpandMoreOutlined
            className="infoScreen_modal_icon"
            style={{ marginLeft: "auto" }}
          />
        </div>
        <div className="infoScreen_modal_info_top">
          {runTime && <span>{runTime}</span>}
          {contentRating && <span className="limit">{contentRating}</span>}
          {year && <span className="year">{year}</span>}
        </div>
        <div className="infoScreen_modal_genre">
          {movie?.genres.map((genre) => (
            <span key={genre.name}>{genre.name}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InfoScreen;
