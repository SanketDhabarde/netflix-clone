import React from 'react';
import { Clear } from "@material-ui/icons";
import './Modal.css';

const baseImgUrl = "https://image.tmdb.org/t/p/w500";

function Modal({selectedMovie, setSelectedMovie}) {

    const clickHandler = (event) => {
        if(event.target.classList.contains('backdrop')){
            setSelectedMovie(null); 
        }
    }

    const setClassName = (vote) => {
        if (vote >= 8) {
          return "green";
        } else if (vote >= 6) {
          return "orange";
        } else {
          return "red";
        }
    };

    const clearModalHandler = () => {
        setSelectedMovie(null); 
    }

    return (
        <div className="backdrop" onClick={clickHandler}>
            <div className="modal">
                <img src={`${selectedMovie.backdrop_path ? baseImgUrl + selectedMovie.backdrop_path : baseImgUrl + selectedMovie.poster_path}`} alt=""/>
                <Clear className="modal__clear" onClick={clearModalHandler}/>
                <div className="modal__movieInfo">
                    <h2>{selectedMovie.name || selectedMovie.title || selectedMovie.original_name}</h2>
                    <p className={`${setClassName(selectedMovie.vote_average)}`}>
                    ⭐{selectedMovie.vote_average}
                    </p>
                    <div className="modal__movieOverview">
                        <h4>Overview:</h4>
                        <p>{selectedMovie.overview}</p>
                    </div>
                </div>  
            </div>  
        </div>
    )
}

export default Modal;
