const db = require("../db/query");

exports.renderHomePage = async (req, res) => {
    const allMovies = await db.retrieveAllMovies();
    res.render('homePage', {title: 'Homepage', movies: allMovies})
}

exports.submitMovie = async (req, res) => {
    const {movie_title, movie_director, movie_genre, movie_main_actor, movie_released} = req.body;
    const movieObj = {movie_title: movie_title, movie_director: movie_director, movie_genre: movie_genre, movie_main_actor: movie_main_actor, movie_released: movie_released};
    await db.insertMovie(movieObj);
    res.redirect('/');

}

exports.deleteAll = (req, res) => {
    db.dropAllEntries();
    res.send('All movies have been deleted!');
}

exports.renderAddPage = (req, res) => {
    res.render('addMovie');
}
