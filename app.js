const express = require('express');
const path = require('path');
const assetsPath = path.join(__dirname, "public");
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const router = require('./routes/routes.js')

console.log(__dirname);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(assetsPath));
app.use(express.urlencoded({extended: true}))
app.use('/', router);

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})