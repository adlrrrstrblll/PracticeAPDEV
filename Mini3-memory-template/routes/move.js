function add(server,app_data){

const saModel = app_data['saModel'];
const bcModel = app_data['bcModel'];
const cardModel = app_data['cardModel'];
const mongoClient = app_data['mongoClient'];

//This route is used to record an action taken by the user and
//will return the appropriate image. This should take into account
//the board being used. Each action should be saved in the select_action
//model using saModel. The route sends a response which specifies the
//status of the selected actions and returns the symbol of the two
//selected cells as well as the image of the first selected cell.

//Do not modify the route declaration
server.post('/move', async function(req, resp){ //<--
  console.log('first selected cell  : '+req.body.first);
  console.log('second selected cell : '+req.body.second);
  console.log('board id from mongodb: '+req.body.board);

  const board = await bcModel.findById(req.body.board);
  // array starts at 0, not 1
  const symbol1 = board.map[req.body.first - 1];
  const symbol2 = board.map[req.body.second - 1];
  let status;
  if (symbol1 === symbol2) {
    status = 'match';
  } else {
    status = 'mismatch';
  }

  await saModel.create({
    first: req.body.first,
    second: req.body.second,
    board: req.body.board
  });

  let image = null;
  if (status === 'match') {
    const card = await cardModel.findOne({ symbol: symbol1 });
    if (card !== null && card !== undefined) {
      image = card.image;
    }
  }

  resp.send({
    status: status,
    location1: parseInt(req.body.first), location2: parseInt(req.body.second),
    symbol1: symbol1, symbol2: symbol2,
    image: image
   });
});

}

module.exports.add = add;
