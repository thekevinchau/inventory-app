/*
How it works:
    - takes the nonempty key-value pairs of everything in the updated_params mapping and pushes their string value into an array
        -example: {movie_title : 'abcd', movie_genre: 'Action', movie_released: '2003'} -> ["movie_title = 'abcd'"", "movie_genre = 'Action'"", "movie_released = '2003'"]
        - it takes every string in the updates array, and puts the SET keyword and joins it with a comma
            -example: ["movie_title = 'abcd'"", "movie_genre = 'Action'"", "movie_released = '2003'"]
                -> SET + "movie_title = 'abcd', movie_genre = 'Action', movie_released='2003'";
                - overall string: "SET movie_title = 'abcd', movie_genre = 'Action', movie_released='2003'"
    - now I've implemented image functionality.
        - implementation: we have the movie_title from updated_params
            - we call on retrieveMovieImage from 'testingFetch.js' to return us the url for the image. then we can immediately push the key value pair via a
            'movie_poster = url' SQL query.

*/

const retrieveMovieImage = require("./testingFetch");

async function processUpdateQuery(updated_params){
    const updates = [];
    const poster_url = await retrieveMovieImage(updated_params.movie_title);
    updates.push(`movie_poster = '${poster_url}'`);
    for (const [key,value] of Object.entries(updated_params)){
        if (value !== ''){
            updates.push(`${key} = '${value}'`);
        }
    }
    return updates.length > 0 ? `SET ${updates.join(', ')}` : '';
}


/*
To process the search query we want to look at:
    SELECT * FROM movies
    WHERE
        - (if the key is not movie_released, then simply evaluate it using LIKE)
            - example: movie_title LIKE '%movie.title%'
        - (if the key is movie_released, then evaluate it using =)
        `   - example: movie_released = movie.released
        - we want to join each one with an "OR" statement
    ORDER BY movie_title;

    
    -do we make a movie title required?
*/

function processSearchQuery(search_params){
    const search = [];
    for (const [key, value] of Object.entries(search_params)){
        if (key === "movie_released" && value !== ''){
            search.push(`${key} = ${value}`);
        }
        else if (value !== '' && key !== "movie_released"){
            search.push(`${key} LIKE '%${value}%'`)
        }
    }
    return search.length > 0 ? search.join(' AND ') : '';
}


module.exports = {processUpdateQuery, processSearchQuery}