import { Clear, Edit } from "@material-ui/icons";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth-context";
import db from "../../firebase";
import Nav from "../Nav/Nav";
import "./WatchList.css";

const baseImgUrl = "https://image.tmdb.org/t/p/w500";

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

  const setClassName = (vote) => {
    if (vote >= 8) {
      return "green";
    } else if (vote >= 6) {
      return "orange";
    } else {
      return "red";
    }
  };

  const removeMovieFromWatchList = (id) => {
    if (
      window.confirm(
        "Are you sure you want to remove this movie from watchlist?"
      )
    ) {
      db.collection("users")
        .doc(authContext.user.uid)
        .collection("watchlist")
        .doc(`${id}`)
        .delete()
        .then(() => {
          console.log("deleted successfully");
        })
        .catch((error) => console.log(error));
    }
  };
  
  return (
    <div className="list">
      <Nav watchlist />
      <div className="list__title">
      <h2 style={{color: 'white', fontWeight: '400'}}>My List</h2>
      </div>
      <div className="movie__container">
        {movies.map((movie) => (
          <div key={movie.movie.id} className="movie">
            <img
              src={`${baseImgUrl + movie.movie.backdrop_path}`}
              alt={movie.name}
            />
            <div className="movie__info">
              <span className={`${setClassName(movie.movie.vote_average)}`}>
              ⭐{movie.movie.vote_average}
              </span>
              <Edit className="tag movie__note" />
              <Clear
                className="tag movie__note"
                onClick={() => removeMovieFromWatchList(movie.movie.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WatchList;
