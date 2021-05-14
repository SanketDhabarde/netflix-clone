const API_KEY = "9abece2b3fd2ebefc230ea2ce46c4bef";

const requests = {
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
    fetchLatestTv: `/tv/latest?api_key=${API_KEY}&language=en-US`,
    featchAiringTodayTv: `/tv/airing_today?api_key=${API_KEY}&language=en-US&page=1`,
    fetchPopularTv: `/tv/popular?api_key=${API_KEY}&language=en-US&page=1`,
    fetchTopRatedTv: `/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
    fetchTrendingTv: `/trending/tv/day?api_key=${API_KEY}`
  };
  
  export default requests;