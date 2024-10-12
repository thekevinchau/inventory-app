const db = require("../db/query");

exports.renderHomePage = async (req, res) => {
    const allMovies = await db.retrieveAllMovies();
    res.status(200).render('homePage', {title: 'Homepage', movies: allMovies})
}

exports.renderSearchPage = (req, res) => {
    res.status(200).render('searchMovie')
}
exports.renderUpdatePage = (req, res) => {
    res.status(200).render('updateMovie', {movie_id: req.query.movie_id})
}

exports.renderAddPage = (req, res) => {
    res.status(200).render('addMovie');
}


exports.submitMovie = async (req, res) => {
    const {movie_title, movie_director, movie_genre, movie_main_actor, movie_released} = req.body;
    const movieObj = {movie_title: movie_title, movie_director: movie_director, movie_genre: movie_genre, movie_main_actor: movie_main_actor, movie_released: movie_released};
    await db.insertMovie(movieObj);
    res.redirect('/');

}

exports.editMovie = async (req, res) => {
    const movie_id = req.query.movie_id;
    const isEmptyUpdate = Object.values(req.body).every(elem => elem === '')
    if (isEmptyUpdate){
        return res.status(400).send('Request body is empty!');
    }
    else{
        const update_params = {...req.body};
        await db.updateMovie(movie_id, update_params);
    }
    res.redirect('/');
}

exports.removeMovie = async(req, res) => {
    const {movie_id} = req.query;
    await db.deleteMovie(movie_id);
    res.redirect('/')
}

exports.deleteAll = (req, res) => {
    db.dropAllEntries();
    res.redirect('/')
}