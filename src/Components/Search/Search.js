import React, { useContext, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Nav from "../Nav/Nav";
import "./Search.css";
import { AuthContext } from "../../context/auth-context";
import db from '../../firebase';
import firebase from 'firebase/app';
import Modal from "../Modal/Modal";
import { toast } from "react-toastify";

const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?api_key=9abece2b3fd2ebefc230ea2ce46c4bef&language=en-US&page=1&include_adult=false&query=";

const baseImgUrl = "https://image.tmdb.org/t/p/original";

function Search() {
  const [searchInput, setSearchInput] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const authContext = useContext(AuthContext);

  const searchHandler = (event) => {
    event.preventDefault();
    if (searchInput) {
      fetch(SEARCH_API + searchInput)
        .then((res) => res.json())
        .then((data) => setMovies(data.results))
        .catch((error) => console.log(error));

        setSearchInput("");
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

      toast.success(`${movie.name || movie.title || movie.original_name} Added to your watchlist successfully`, {position: 'top-center'});
    }
  };

  return (
    <div>
      <Nav search />
      <div className="search__form">
        <form>
          <input
            type="text"
            placeholder="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit" onClick={searchHandler}>
            Search
          </button>
        </form>
      </div>

      <div className="search__movies">
          {movies.map(movie => (
              <div className="search__poster" key={movie.id}>
                <img
                    className="search__posterImg"
                    src={`${baseImgUrl + movie.poster_path}`}
                    alt={movie.title}
                />
                <div className="search__movieOption">
                    <AddIcon onClick={() => addMovieToWatchList(movie)} className="tag"/>
                    <div>
                        <ExpandMoreIcon className="tag" onClick={() => setSelectedMovie(movie)}/>
                    </div>
                </div> 
              </div>
           ))}
      </div>
      {selectedMovie && <Modal selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie}/>}
    </div>
  );
}

export default Search;
