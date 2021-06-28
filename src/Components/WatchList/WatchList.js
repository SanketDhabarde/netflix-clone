import { Clear, PlayArrow } from "@material-ui/icons";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth-context";
import db from "../../firebase";
import Nav from "../Nav/Nav";
import "./WatchList.css";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Modal from "../Modal/Modal";
import { toast } from "react-toastify";
import YouTube from "react-youtube";
import axios from "../../axios";

const baseImgUrl = "https://image.tmdb.org/t/p/w500";

function WatchList() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState("");
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

  const opts = {
    height: "390px",
    width: "80%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      let url = `/movie/${movie.movie.id}/videos?api_key=9abece2b3fd2ebefc230ea2ce46c4bef`;

      axios
        .get(url)
        .then((res) => {
          setTrailerUrl(res.data.results[0]?.key);
        })
        .catch((error) =>{
          console.log(error);
          toast.error("Sorry trailer is not available 😥", {position: 'top-center'});
        });
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
        .catch((error) => {
          console.log(error);
          toast.error("Something went wrong", {position: 'top-center'});
        });
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
              <div>
                <PlayArrow className="tag movie__note" onClick={() => handleClick(movie)}/>
                <Clear
                  className="tag movie__note"
                  onClick={() => removeMovieFromWatchList(movie.movie.id)}
                />
              </div>
              <div>
                <ExpandMoreIcon className="tag movie__note" onClick={() => setSelectedMovie(movie.movie)}/>
              </div>
              
            </div>
          </div>
        ))}
      </div>
      {trailerUrl && (
        <div className="backdrop" onClick={() => setTrailerUrl("")}>
          <YouTube videoId={trailerUrl} opts={opts} className="youtube__trailer"/>
        </div>
      )}
      {selectedMovie && <Modal selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie}/>}
    </div>
  );
}

export default WatchList;
