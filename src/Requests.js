const API_KEY = '520e6628ccca02a1350a7f518496d2e4';

const requests = {
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchUpcoming: `/movie/upcoming?api_key=${API_KEY}&language=en-US`,
    fetchCinemateOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213&language=en-US`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28&language=en-US`,
    fetchAdventureMovies: `/discover/movie?api_key=${API_KEY}&with_genres=12&language=en-US`,
    fetchDramaMovies: `/discover/movie?api_key=${API_KEY}&with_genres=18&language=en-US`,
    fetchFamilyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10751&language=en-US`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35&language=en-US`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27&language=en-US`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749&language=en-US`,
    fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99&language=en-US`,
    fetchHistoryMovies: `/discover/movie?api_key=${API_KEY}&with_genres=36&language=en-US`,
    fetchScienceFictionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=878&language=en-US`,
    fetchAnimationMovies: `/discover/movie?api_key=${API_KEY}&with_genres=16&language=en-US`,
};

export default requests;