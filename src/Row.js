import React, { useEffect, useRef, useState } from "react";
import axios from "./axios";
import "./Row.css";
import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@mui/icons-material";
import RowItem from "./RowItem";
import InfoScreen from "./screens/InfoScreen";

function Row({ title, fetchUrl, media }) {
  const [movies, setMovies] = useState([]);
  const [logos, setLogos] = useState([]);
  const listRef = useRef();
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [slideNumber, setSlideNumber] = useState(0);
  const [leftButton, setLeftButton] = useState(false);
  const [rightButton, setRightButton] = useState(true);
  const [activeMovie, setActiveMovie] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [activeRunTime, setActiveRunTime] = useState(null);
  const [activeContentRating, setActiveContentRating] = useState(null);
  const [activeYear, setActiveYear] = useState(null);

  const handleArrowClick = (direction) => {
    let measurements = listRef.current.getBoundingClientRect();
    let distance =
      listRef.current.getBoundingClientRect().x - windowSize.innerWidth * 0.04;

    let poster_width = (120 * 16) / 9 + 5;
    if (direction === "right") {
      if (slideNumber === 0) {
        setLeftButton(true);
        setRightButton(true);
      }
      if (
        slideNumber ===
        logos.length - Math.floor(windowSize.innerWidth / poster_width) - 1
      ) {
        setLeftButton(true);
        setRightButton(false);
        listRef.current.style.transform = `translateX(${
          -(logos.length - Math.floor(windowSize.innerWidth / poster_width)) *
          poster_width
        }px)`;
      } else {
        setLeftButton(true);
        setRightButton(true);
        listRef.current.style.transform = `translateX(${
          -poster_width + distance
        }px)`;
      }
      setSlideNumber(slideNumber + 1);
    }
    if (direction === "left") {
      if (
        slideNumber ===
        logos.length - Math.floor(windowSize.innerWidth / poster_width)
      ) {
        setLeftButton(true);
        setRightButton(true);
      }
      if (slideNumber === 1) {
        setLeftButton(false);
        listRef.current.style.transform = `translateX(${0}px)`;
      } else {
        setLeftButton(true);
        setRightButton(true);
        listRef.current.style.transform = `translateX(${
          poster_width + distance
        }px)`;
      }
      setSlideNumber(slideNumber - 1);
    }
    console.log(measurements);
    console.log(distance);
  };

  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  // A snippet of code which runs based on a specific condition/variable
  useEffect(() => {
    // if [], run once when the row loads, and don't run again
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      // console.log(request.data.results);
      // console.log(request.data);
      setMovies(request.data.results);

      return request;
    }
    fetchData();
  }, [fetchUrl]);

  useEffect(() => {
    setLogos([]);
    const api_url =
      "?api_key=a32b11f48864be1ba2603a1f30797443&language=en-US&append_to_response=videos,images,release_dates,content_ratings&include_image_language=null,en";
    async function fetchData(movie) {
      if (media === "Movie") {
        const request = await axios.get(`/movie/${movie.id}${api_url}`);
        setLogos((oldArray) => [...oldArray, request.data]);
      } else if (media === "TV") {
        const request = await axios.get(`/tv/${movie.id}${api_url}`);
        setLogos((oldArray) => [...oldArray, request.data]);
      } else {
        if (movie.media_type === "movie") {
          const request = await axios.get(`/movie/${movie.id}${api_url}`);
          setLogos((oldArray) => [...oldArray, request.data]);
        } else if (movie.media_type === "tv") {
          const request = await axios.get(`/tv/${movie.id}${api_url}`);
          setLogos((oldArray) => [...oldArray, request.data]);
        } else {
          console.log("Could not find media type");
          console.log(movie);
        }
      }
      return;
    }

    if (movies.length !== 0) {
      movies.forEach((movie) => movie?.backdrop_path && fetchData(movie));
    }
  }, [movies]);

  // console.log(logos);

  const sendDataToParent = (
    movie,
    index,
    isHovered,
    runTime,
    contentRating,
    year
  ) => {
    setActiveMovie(movie);
    setActiveIndex(index);
    setIsHovered(isHovered);
    setActiveRunTime(runTime);
    setActiveContentRating(contentRating);
    setActiveYear(year);
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_wrapper">
        <ArrowBackIosOutlined
          onClick={() => handleArrowClick("left")}
          style={{
            display: !leftButton && "none",
            width: "4vw",
            height: "100%",
          }}
          className="slider_arrow left"
        />
        {isHovered && (
          <InfoScreen
            index={activeIndex}
            title={title}
            movie={activeMovie}
            length={logos.length}
            width={windowSize.innerWidth}
            slideNumber={slideNumber}
            runTime={activeRunTime}
            contentRating={activeContentRating}
            year={activeYear}
            isHovered={isHovered}
            sendDataToParent={sendDataToParent}
          />
        )}
        <div className="row_posters" ref={listRef}>
          {logos.map(
            (movie, index) =>
              movie.backdrop_path !== null && (
                <RowItem
                  index={index}
                  title={title}
                  movie={movie}
                  media={media}
                  sendDataToParent={sendDataToParent}
                  key={title.length * movie.id * index}
                />
              )
          )}
        </div>
        <ArrowForwardIosOutlined
          onClick={() => handleArrowClick("right")}
          style={{
            display: !rightButton && "none",
            width: "4vw",
            height: "100%",
          }}
          className="slider_arrow right"
        />
      </div>
    </div>
  );
}

export default Row;
