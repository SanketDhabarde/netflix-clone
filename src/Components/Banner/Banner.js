import React, { useContext, useEffect, useState } from "react";
import axios from "../../axios";
import request from "../../request";
import "./Banner.css";
import Modal from '../Modal/Modal';
import { AuthContext } from "../../context/auth-context";
import db from "../../firebase";
import firebase from 'firebase/app';
import { toast } from "react-toastify";

function Banner({tv}) {
  const [movie, setMovie] = useState([]);
  const [selectedMovie, setSelectedMovie]= useState(null);
  const authContext = useContext(AuthContext);

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

  const moreInfoHandler = (movie) => {
    if(movie){
      setSelectedMovie(movie);
    }
  }

  const addMovieToWatchList = (movie) => {
    if(movie){
      db.collection("users")
      .doc(authContext.user.uid)
      .collection("watchlist").doc(`${movie.id}`)
      .set({
        movie,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
      toast.success(`${movie.name} Added to your watchlist successfully`, {position: 'top-center'});
    }
  };

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
          <button className="banner__button" onClick={() => addMovieToWatchList(movie)}>My List</button>
          <button className="banner__button" onClick={() => moreInfoHandler(movie)}>More Info</button>
        </div>
        <div className="banner__description">{movie?.overview}</div>
      </div>
      <div className="banner__fadeBottom">

      </div>
      {selectedMovie && <Modal selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie}/>}
    </header>
  );
}

export default Banner;
