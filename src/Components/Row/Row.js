import React, { useEffect, useState } from "react";
import axios from "../../axios";
import './Row.css';

const baseImgUrl = "https://image.tmdb.org/t/p/original";

function Row({ title, fetchURL, isLargeRow }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(fetchURL).then((response) => {
      setMovies(response.data.results);
      console.log(response.data.results);
    });
  }, [fetchURL]);

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            key={movie.id}
            src={`${baseImgUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
            alt={movie.title}
          />
        ))}
      </div>
    </div>
  );
}

export default Row;
