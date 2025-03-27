//Install Command:
//npm init -y
//npm i express express-handlebars body-parser mongoose mongodb

const express = require('express');
const server = express();

const bodyParser = require('body-parser');
server.use(express.json()); 
server.use(express.urlencoded({ extended: true }));

const handlebars = require('express-handlebars');
server.set('view engine', 'hbs');
server.engine('hbs', handlebars.engine({
    extname: 'hbs',
}));

server.use(express.static('public'));

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/memory');

const saSchema = new mongoose.Schema({
  first: { type: Number },
  second: { type: Number },
  board: { type: String },
},{ versionKey: false });

const saModel = mongoose.model('select_action', saSchema);

//For the map, this will accept a list of strings. Creating
//an entry will look like the following:
//  const array = ["1","2","3"];
//  const instance = bcModel({
//      map: array
//  });
const bcSchema = new mongoose.Schema({
  map: { type: [ String ] }
},{ versionKey: false });

const bcModel = mongoose.model('board_card', bcSchema);

const cardSchema = new mongoose.Schema({
  symbol: { type: String },
  image: { type: String }
},{ versionKey: false });

const cardModel = mongoose.model('card', cardSchema);

const { MongoClient } = require('mongodb');
const mongoClient = new MongoClient("mongodb://127.0.0.1:27017/");
mongoClient.connect();

server.get('/', async function(req, resp){
  let boards = await bcModel.find({}).lean();
  resp.render('create',{
    layout: 'index',
    title: 'Create page',
    boards: boards
  });
});

server.get('/board/:id', function(req, resp){
  resp.render('game',{
    layout: 'index2',
    title: 'Game page',
    id: String(req.params.id)
 });
});
//Note: There is no need to modify app.js. However, some solutions can
//cache certain information to avoid extra database fetches. In those
//cases, some processing can be done in app.js.

//Modifyable area start

let app_data = {
    /* For Mongoose */
    'saModel'       : saModel,
    'bcModel'       : bcModel,
    'cardModel'     : cardModel,
    /* For Regular Mongo */
    'mongoClient'   : mongoClient
};

const mod_c = require('./routes/create_new');
mod_c.add(server, app_data);

const mod_r = require('./routes/reload');
mod_r.add(server, app_data);

const mod_m = require('./routes/move');
mod_m.add(server, app_data);

//Modifyable area end

function finalClose(){
    console.log('Close connection at the end!');
    mongoose.connection.close();
    mongoClient.close();
    process.exit();
}

process.on('SIGTERM',finalClose);
process.on('SIGINT',finalClose);
process.on('SIGQUIT', finalClose);

const port = process.env.PORT | 9090;
server.listen(port, function(){
    console.log('Listening at port '+port);
});


