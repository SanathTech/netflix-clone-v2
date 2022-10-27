import React, { useEffect, useState } from "react";
import axios from "./axios";
import requests from "./requests";
import "./Banner.css";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Link } from "react-router-dom";

function Banner() {
  const [movie, setMovie] = useState([]);
  const [movieId, setMovieId] = useState();

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovieId(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ].id
      );

      return request;
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (movieId) {
        const request = await axios.get(
          `/tv/${movieId}?api_key=a32b11f48864be1ba2603a1f30797443&language=en-US&append_to_response=videos,images&include_image_language=null,en`
        );
        setMovie(request.data);
        return request;
      }
    }
    fetchData();
  }, [movieId]);

  console.log(movie);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    // Add Background Image to header
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "left top",
      }}
    >
      <div className="banner_contents">
        <div className="banner_logo_and_text">
          <h1 className="banner_title">
            {movie.length === 0 ? (
              ""
            ) : movie?.images.logos.length === 0 ? (
              movie?.title || movie?.name || movie?.original_name
            ) : (
              <img
                key={movie.id}
                className="banner_logo"
                src={`https://image.tmdb.org/t/p/original/${movie.images.logos["0"].file_path}`}
                alt="Banner Logo"
              />
            )}
          </h1>
          <div className="banner_description">
            {truncate(movie?.overview, 300)}
          </div>
          <div className="banner_buttons">
            <Link to="/WatchScreen" state={{ movie: movie }}>
              <button className="banner_button">
                <PlayArrowIcon
                  style={{
                    width: "3.1vw",
                    height: "auto",
                    marginRight: "0.3vw",
                  }}
                />
                Play
              </button>
            </Link>
            <button className="banner_button more_info">
              <InfoOutlinedIcon
                style={{
                  width: "2.3vw",
                  height: "auto",
                  margin: "0 0.7vw 0 0.6vw",
                }}
              />
              More info
            </button>
          </div>
        </div>
      </div>
      <div className="banner_fadeBottom" />
    </header>
  );
}

export default Banner;
