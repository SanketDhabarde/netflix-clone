import React from 'react';

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

    return (
        <div className="backdrop" onClick={clickHandler}>
            <div className="modal">
                <img src={`${baseImgUrl + selectedMovie.backdrop_path}`} alt=""/>
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
