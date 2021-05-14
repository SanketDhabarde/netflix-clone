import React, { useEffect, useState } from "react";
import axios from "../../axios";
import request from "../../request";
import "./Banner.css";

function Banner({tv}) {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    if(tv){
      axios.get(request.fetchPopularTv).then((response) => {
        setMovie(
          response.data.results[
            Math.floor(Math.random() * response.data.results.length - 1)
          ]
        );
      });
    }else{
      axios.get(request.fetchNetflixOriginals).then((response) => {
        setMovie(
          response.data.results[
            Math.floor(Math.random() * response.data.results.length - 1)
          ]
        );
      });
    }
    
  }, [tv]);

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundSize: "cover"
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">{movie?.name || movie?.title || movie?.original_name}</h1>
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
