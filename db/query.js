const db = require('./pool.js')

let movie_poster = 1;

/*
How it works:
    - takes the nonempty key-value pairs of everything in the updated_params mapping and pushes their string value into an array
        -example: {movie_title : 'abcd', movie_genre: 'Action', movie_released: '2003'} -> ["movie_title = 'abcd'"", "movie_genre = 'Action'"", "movie_released = '2003'"]
        - it takes every string in the updates array, and puts the SET keyword and joins it with a comma

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



async function retrieveAllMovies() {
    try {
        const { rows } = await db.query('SELECT * FROM movies')
        return rows;
    }
    catch (err) {
        console.error('Error retrieving all users from database', err);
    }
}

async function insertMovie(movieObject) {
    const { movie_title, movie_director, movie_genre, movie_main_actor, movie_released } = movieObject;

    try {
        await db.query(`
            INSERT INTO movies (movie_poster, movie_title, movie_director, movie_genre, movie_main_actor, movie_released)
            VALUES ('${movie_poster}', '${movie_title}', '${movie_director}', '${movie_genre}','${movie_main_actor}', ${movie_released});
            `);
        movie_poster++;
    }
    catch (err) {
        console.error('Error inserting movie into the database', err)
    }

}

async function updateMovie(movie_id, updated_params){
    const updateQuery = processUpdateQuery(updated_params);
    console.log(updateQuery);
    try{
        await db.query(`
            UPDATE movies
            ${updateQuery}
            WHERE movie_id = ${movie_id};
            `)
    }
    catch(err){
        console.error('Error updating movie: ', err)
    }
}


async function dropAllEntries() {
    try {
        await db.query('DELETE FROM movies;')
        const {rows} = await db.query('SELECt * from movies');
        console.log(rows);
    }
    catch (err) {
        console.error('Error deleting entries', err);
    }
}

module.exports = { retrieveAllMovies, insertMovie, dropAllEntries, processUpdateQuery, updateMovie }