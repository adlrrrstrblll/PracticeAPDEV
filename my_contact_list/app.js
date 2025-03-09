const express = require('express');
const server = express();

const bodyParser = require('body-parser')
server.use(express.json()); 
server.use(express.urlencoded({ extended: true }));

const handlebars = require('express-handlebars');
server.set('view engine', 'hbs');
server.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));

server.use(express.static('public'));

const dataModule = require('./data');

server.get('/', function(req, resp){
	const contact_list = dataModule.getContactList();
    resp.render('main',{
        layout: 'index',
        title: 'Contacts page',
        contact_list: contact_list
    });
});

const port = process.env.PORT | 9090;
server.listen(port, function(){
    console.log('Listening at port '+port);
});

