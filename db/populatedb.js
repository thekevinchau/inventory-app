const {Client} = require('pg');
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env')})
const DB_URI = process.env.DB_URI;

const SQL = `
CREATE TABLE IF NOT EXISTS movies (
    movie_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    movie_poster VARCHAR(200) NOT NULL,
    movie_title VARCHAR(50) NOT NULL,
    movie_director VARCHAR(50) NOT NULL,
    movie_genre VARCHAR(20) NOT NULL,
    movie_main_actor VARCHAR(50) NOT NULL,
    movie_released int NOT NULL
);

INSERT INTO movies (movie_poster, movie_title, movie_director, movie_genre, movie_main_actor, movie_released)
VALUES
('https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg', 'Oppenheimer', 'Christopher Nolan', 'Drama', 'Cilian Murphy', 2023),
('https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg', 'The Dark Knight', 'Christopher Nolan', 'Action', 'Christian Bale', 2008),
('https://image.tmdb.org/t/p/w500/hr0L2aueqlP2BYUblTTjmtn0hw4.jpg', 'The Dark Knight Rises', 'Christopher Nolan', 'Action', 'Christian Bale', 2012);


`;

async function main(){
    console.log('Seeding...');
    const client = new Client({
        connectionString: DB_URI
    })

    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log('Done');
}

main();