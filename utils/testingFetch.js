const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env')})

const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

const retrieveMovieImage = async(movie_title) => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${movie_title}&include_adult=false&language=en-US&page=1`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: TMDB_API_TOKEN
    }
  };

  try{
    const query = await fetch(url, options);
    const response = await query.json();
    const image_path = response.results[0].poster_path;
    console.log(image_path);
    return `https://image.tmdb.org/t/p/w500${image_path}`
  }
  catch(err){
    console.log('Error fetching movie image', err);
  }
}


module.exports = retrieveMovieImage;