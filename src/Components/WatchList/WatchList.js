import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth-context";
import db from "../../firebase";
import Nav from "../Nav/Nav";
import './WatchList.css';

const baseImgUrl = "https://image.tmdb.org/t/p/original";

function WatchList() {
  const [movies, setMovies] = useState([]);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const unsub = db
      .collection("users")
      .doc(authContext.user.uid)
      .collection("watchlist")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMovies(snapshot.docs.map((doc) => doc.data()));
      });

    return () => {
      unsub();
    };
  }, [authContext.user.uid]);

  return (
    <div>
     <Nav watchlist/>
    <div className="movie__container">
      {movies.map((movie) => (
        <div key={movie.movie.id} className="movie">
          <img
            src={`${baseImgUrl + movie.movie.poster_path}`}
            alt={movie.name}
          />
          <div className="movie__info">
                <h3>{movie.movie.name || movie.movie.title || movie.movie.original_name}</h3>
                <span className="vote__average">{movie.movie.vote_average}</span>
            </div>
            <div className="movie__overview">
                <h3>Overview</h3>
                <p>{movie.movie.overview}</p>
            </div>
        </div>
      ))}
    </div>
    </div>
  );
}

export default WatchList;
