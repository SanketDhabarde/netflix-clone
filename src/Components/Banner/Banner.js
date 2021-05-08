import React, { useEffect, useState } from "react";
import axios from "../../axios";
import request from "../../request";
import "./Banner.css";

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    axios.get(request.fetchNetflixOriginals).then((response) => {
      setMovie(
        response.data.results[
          Math.floor(Math.random() * response.data.results.length - 1)
        ]
      );
    });
  }, []);

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">{movie?.title || movie?.original_name || movie?.name}</h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">my list</button>
        </div>
        <div className="banner__description">{movie?.overview}</div>
      </div>
      <div className="banner__fadeBottom">

      </div>
    </header>
  );
}

export default Banner;
