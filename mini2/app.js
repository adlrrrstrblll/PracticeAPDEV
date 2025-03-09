const express = require('express');
const server = express();

const bodyParser = require('body-parser');
server.use(express.json()); 
server.use(express.urlencoded({ extended: true }));

const handlebars = require('express-handlebars');
server.set('view engine', 'hbs');
server.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));

server.use(express.static('public'));

const solutionVals = [
    {"from":"1","to":"2"},
    {"from":"2","to":"3"},
    {"from":"3","to":"1"},
    {"from":"2","to":"3"},
    {"from":"1","to":"2"},
    {"from":"2","to":"3"},
    {"from":"3","to":"1"}];

server.get('/', function(req, resp){
    resp.render('main',{
        layout: 'index',
        title: 'Layton Puzzle 23 Replica',
        solution: solutionVals
    });
});


const port = process.env.PORT || 9090;
server.listen(port, function(){
    console.log('Listening at port '+port);
});
