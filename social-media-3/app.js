const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const PORT = 3000;

// Set Handlebars as the view engine
app.engine('hbs', exphbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    partialsDir: 'views/partials'
}));
app.set('view engine', 'hbs');

// Serve static files (CSS, images)
app.use(express.static('public'));

// JSON Data (Posts & Friends)
const posts = [
    { title: "The landscape!", image: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Swedish_landscape_near_Bj%C3%B6rnlunda_%28by_Pudelek%29_01.jpg" }
];

const friends = [
    { name: "Amy", avatar: "https://upload.wikimedia.org/wikipedia/commons/7/70/Bear-face_-_Sparker_-_game-icons.svg" },
    { name: "Cindy", avatar: "https://upload.wikimedia.org/wikipedia/commons/7/70/Bear-face_-_Sparker_-_game-icons.svg" },
    { name: "Emily", avatar: "https://upload.wikimedia.org/wikipedia/commons/7/70/Bear-face_-_Sparker_-_game-icons.svg" }
];

// Home Route - Render Homepage
app.get('/', (req, res) => {
    res.render('home', { posts, friends });
});

// Add Post Route (Form Page)
app.get('/add', (req, res) => {
    res.render('addPost');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
