import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import axios from "../../axios";
import "./Row.css";
import AddIcon from '@material-ui/icons/Add';


const baseImgUrl = "https://image.tmdb.org/t/p/original";

function Row({ title, fetchURL, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    axios.get(fetchURL).then((response) => {
      setMovies(response.data.results);
    });
  }, [fetchURL]);

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
      axios
        .get(
          `/movie/${movie.id}/videos?api_key=9abece2b3fd2ebefc230ea2ce46c4bef`
        )
        .then((res) => {
          setTrailerUrl(res.data.results[0]?.key);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
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
           <AddIcon/>
          </>
           
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
