const url = 'https://api.themoviedb.org/3/search/movie?query=The%20Dark%20Knight&include_adult=false&language=en-US&page=1';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNWI0OTk2MzAzYzY3NjMxOWNmMzFkNjQ2OTQzODExNiIsIm5iZiI6MTcyODc4MTkwNi4wNzcyNzgsInN1YiI6IjY3MGIxYWZlYmJiMWE5ZTgxYzYxYzkxZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KOsT_AyV-8CYKXrianBCzpJh9AWxxlZKpI5ExpWDmDE'
  }
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json.results[0].poster_path))
  .catch(err => console.error('error:' + err));