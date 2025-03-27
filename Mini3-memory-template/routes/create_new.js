function add(server,app_data){

const saModel = app_data['saModel'];
const bcModel = app_data['bcModel'];
const cardModel = app_data['cardModel'];
const mongoClient = app_data['mongoClient'];

//This route is used to create a board. A board is a 16 string array
//where there are pairs of symbols ( A, B, C, D, E, F, G, H ) arranged
//in a random order. The function should end by redirecting the user
//to the board that was just created

//Do not modify the route declaration
server.post('/create_new', async function(req, resp){ //<--
  // symbols used
  const symbols = ['A','B','C','D','E','F','G','H'];
  let board = [];

  // first set
  for (let i = 0; i < symbols.length; i++) {
    board.push(symbols[i]); 
  }

  // second set
  for (let i = 0; i < symbols.length; i++) {
    board.push(symbols[i]);
  }

  // shuffle the board
  board.sort(() => Math.random() - 0.5);

  const instance = new bcModel({ map: board });
  const result = await instance.save();

  resp.redirect('/board/' + result._id);
});
}

module.exports.add = add;
