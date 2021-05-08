import React from 'react';
import './App.css';
import Row from './Components/Row/Row';
import request from './request';

function App() {
  return (
    <div className="App">
      <h1>hello world</h1>
        <Row title="NETFLIX ORIGINALS" fetchURL={request.fetchNetflixOriginals} isLargeRow/>
        <Row title="Trending Now" fetchURL={request.fetchTrending}/>
        <Row title="Top rated" fetchURL={request.fetchTopRated}/>
        <Row title="Action Movies" fetchURL={request.fetchActionMovies}/>
        <Row title="Comedy Movies" fetchURL={request.fetchComedyMovies}/>
        <Row title="Horrer Movies" fetchURL={request.fetchHorrorMovies}/>
        <Row title="Documentaries" fetchURL={request.fetchDocumentaries}/>
    </div>
  );
}

export default App;
