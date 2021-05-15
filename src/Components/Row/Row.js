import React, { useContext, useEffect, useState } from "react";
import YouTube from "react-youtube";
import axios from "../../axios";
import "./Row.css";
import AddIcon from "@material-ui/icons/Add";
import db from "../../firebase";
import { AuthContext } from "../../context/auth-context";
import firebase from 'firebase/app';
import {toast} from 'react-toastify';


const baseImgUrl = "https://image.tmdb.org/t/p/original";

function Row({tv, title, fetchURL, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const authContext = useContext(AuthContext);

  useEffect(() => {
     axios.get(fetchURL).then((response) => {
      setMovies(response.data.results);
    });
  }, [fetchURL]);

  // to add the user for watchlist
  useEffect(() => {
    db.collection("users").doc(authContext.user.uid).set({
      uid: authContext.user.uid,
      name: authContext.user.displayName,
    });
  }, [authContext.user.uid, authContext.user.displayName]);

  const opts = {
    height: "390px",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      if(tv){
        axios
        .get(
          `/tv/${movie.id}/videos?api_key=9abece2b3fd2ebefc230ea2ce46c4bef&language=en-US`
        )
        .then((res) => {
          setTrailerUrl(res.data.results[0]?.key);
        })
        .catch((error) => console.log(error));
      }else{
        axios
        .get(
          `/movie/${movie.id}/videos?api_key=9abece2b3fd2ebefc230ea2ce46c4bef`
        )
        .then((res) => {
          setTrailerUrl(res.data.results[0]?.key);
        })
        .catch((error) => console.log(error));
      }
      
    }
  };

  const addMovieToWatchList = (movie) => {
    if(movie){
      db.collection("users")
      .doc(authContext.user.uid)
      .collection("watchlist").doc(`${movie.id}`)
      .set({
        movie,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
      
      if(tv){
        toast.success("Show Added to your watchlist successfully", {position: 'top-center'});
      }else{
        toast.success("Movie Added to your watchlist successfully", {position: 'top-center'});
      }
      
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies?.map((movie) => (
          <>
            <img
              key={movie.id}
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              onClick={() => handleClick(movie)}
              src={`${baseImgUrl}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.title}
            />
            <AddIcon onClick={() => addMovieToWatchList(movie)} className="row__posterAdd"/>
          </>
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
