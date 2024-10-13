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

    try{
        await db.insertMovie(movieObj);
    }
    catch(err){
        console.error('Error inserting movie', err);
        res.status(500).send('Server error when inserting movie')
    }


    res.redirect('/');

}

exports.editMovie = async (req, res) => {
    const movie_id = req.query.movie_id;
    const isEmptyUpdate = Object.values(req.body).every(elem => elem === '')
    if (isEmptyUpdate){
        return res.status(400).send('Request body is empty!');
    }
    else{

        try{
            const update_params = {...req.body};
            await db.updateMovie(movie_id, update_params);
        }
        catch(err){
            console.error('Error updating movie', err);
            res.status(500).send('Server error when updating movie!');
        }

    }
    res.redirect('/');
}

exports.removeMovie = async(req, res) => {
    const {movie_id} = req.query;
    await db.deleteMovie(movie_id);
    res.redirect('/')
}

exports.searchMovie = async(req, res) => {

    try{
        const search = await db.searchMovie(req.body);
        res.render('homePage', {movies: search, title: 'Search results'});
    }
    catch(err){
        console.error('Error searching for the movie');
        res.status(404).send('Movie not found!')
    }
}

exports.deleteAll = async(req, res) => {
    await db.dropAllEntries();
    res.redirect('/')
}