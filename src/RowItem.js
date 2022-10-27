import React, { useEffect, useState } from "react";
import "./RowItem.css";

const base_url = "https://image.tmdb.org/t/p/original/";

function RowItem({ index, title, movie, media, sendDataToParent }) {
  const [runTime, setRunTime] = useState(null);
  const [contentRating, setContentRating] = useState(null);
  const [year, setYear] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (
      media === "TV" ||
      movie.media_type === "tv" ||
      movie.number_of_seasons ||
      movie.number_of_episodes
    ) {
      setRunTime(
        movie?.number_of_seasons +
          " season" +
          (movie?.number_of_seasons !== 1 ? "s" : "") ||
          movie?.number_of_episodes + " episodes" ||
          "Rating: " + movie?.vote_average
      );
      if (movie.content_ratings) {
        setContentRating(movie.content_ratings.results["0"].rating);
      }
      if (movie.first_air_date) {
        setYear(movie.first_air_date.substring(0, 4));
      }
    } else if (
      media === "Movie" ||
      movie.media_type === "movie" ||
      movie.runtime
    ) {
      setRunTime(timeConvert(movie.runtime));
      if (movie.release_dates) {
        movie.release_dates.results.forEach((result) => {
          if (result.iso_3166_1 === "US") {
            setContentRating(result.release_dates["0"].certification);
          }
        });
      }
      if (movie.release_date) {
        setYear(movie.release_date.substring(0, 4));
      }
    } else {
      console.log("Could not find media type");
      console.log(movie);
      console.log(media + " - " + (movie?.title || movie?.name));
    }

    return;
  }, []);

  // console.log(movie)

  useEffect(() => {
    if (isHovered) {
      sendDataToParent(movie, index, isHovered, runTime, contentRating, year);
    }
  }, [isHovered]);

  function timeConvert(time) {
    let minutes = time;
    let m = minutes % 60;
    let h = (minutes - m) / 60;
    return (h !== 0 ? h.toString() + "h " : "") + m.toString() + "m";
  }

  return (
    <div
      key={title.length * movie.id * index}
      className="row_poster"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        className="row_poster_image"
        key={movie.id}
        src={`${base_url}${movie.backdrop_path}`}
        alt={movie.name}
      />
      {movie.images.logos.length !== 0 && (
        <img
          key={movie.id * movie.id}
          className="row_poster_logo"
          src={`${base_url}${movie.images.logos["0"].file_path}`}
          alt={movie.name}
        />
      )}
    </div>
  );
}

export default RowItem;
