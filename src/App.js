import React, { useContext } from 'react';
import './App.css';
import Banner from './Components/Banner/Banner';
import Login from './Components/Login/Login';
import Nav from './Components/Nav/Nav';
import Row from './Components/Row/Row';
import { AuthContext } from './context/auth-context';
import request from './request';
import {BrowserRouter, Route} from 'react-router-dom';
import WatchList from './Components/WatchList/WatchList';

function App() {
  const authContext = useContext(AuthContext);
  
  return (
    <div className="app">
      {!authContext.user ? (
        <BrowserRouter>
            <Login/>
        </BrowserRouter>
          
      ):(
        <div>
          <BrowserRouter>
          <Route path="/home">
            <Nav/>
              <Banner/>
              <Row title="NETFLIX ORIGINALS" fetchURL={request.fetchNetflixOriginals} isLargeRow/>
              <Row title="Trending Now" fetchURL={request.fetchTrending}/>
              <Row title="Top rated" fetchURL={request.fetchTopRated}/>
              <Row title="Action Movies" fetchURL={request.fetchActionMovies}/>
              <Row title="Comedy Movies" fetchURL={request.fetchComedyMovies}/>
              <Row title="Horrer Movies" fetchURL={request.fetchHorrorMovies}/>
              <Row title="Romance Movies" fetchURL={request.fetchRomanceMovies}/>
              <Row title="Documentaries" fetchURL={request.fetchDocumentaries}/>
            </Route>
            <Route path="/watchlist">
              <WatchList/>
            </Route>
          </BrowserRouter>
            
        </div> )
      }
    </div>
  );
}

export default App;
