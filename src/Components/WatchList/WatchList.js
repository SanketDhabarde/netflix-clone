import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/auth-context';
import db from '../../firebase';

function WatchList() {
    const [movies, setMovies] = useState([]);
    const authContext = useContext(AuthContext);

    useEffect(()=>{
        db.collection("users").doc(authContext.user.uid).collection("watchlist").onSnapshot(snapshot => {
            setMovies(snapshot.docs.map(doc => doc.data()));
        })
    }, [authContext.user.uid]);

    return (
        <div>
            {movies.map(movie => (
                <div key={movie.id}>
                    <img src={movie.img} alt={movie.title}/>
                    <h3 style={{color: 'white'}}>{movie.title}</h3>
                    <p style={{color: 'white'}}>{movie.description}</p>
                </div>
                
            ))}
        </div>
    )
}

export default WatchList;
