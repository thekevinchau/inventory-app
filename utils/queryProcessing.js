/*
How it works:
    - takes the nonempty key-value pairs of everything in the updated_params mapping and pushes their string value into an array
        -example: {movie_title : 'abcd', movie_genre: 'Action', movie_released: '2003'} -> ["movie_title = 'abcd'"", "movie_genre = 'Action'"", "movie_released = '2003'"]
        - it takes every string in the updates array, and puts the SET keyword and joins it with a comma
            -example: ["movie_title = 'abcd'"", "movie_genre = 'Action'"", "movie_released = '2003'"]
                -> SET + "movie_title = 'abcd', movie_genre = 'Action', movie_released='2003'";
                - overall string: "SET movie_title = 'abcd', movie_genre = 'Action', movie_released='2003'"

*/

function processUpdateQuery(updated_params){
    const updates = [];
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