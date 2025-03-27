function add(server,app_data){

const saModel = app_data['saModel'];
const bcModel = app_data['bcModel'];
const cardModel = app_data['cardModel'];
const mongoClient = app_data['mongoClient'];

//This route is used to load all the actions made on the specified
//board and send it to the client. The actions should be in the same
//format at the move route's response but will be in the form of an
//array.

//Do not modify the route declaration
server.get('/reload/:id', async function(req, resp){ //<--
  console.log('board id from mongodb: '+req.params.id);

  const board = await bcModel.findById(req.params.id);
  const actions = await saModel.find({ board: req.params.id });

  let action_list = [];

  for (let action of actions) {
    const symbol1 = board.map[action.first - 1];
    const symbol2 = board.map[action.second - 1];
    let status;
    if (symbol1 === symbol2) {
      status = 'match';
    } else {
      status = 'mismatch';
    }

    let image = null;
    if (status === 'match') {
      const card = await cardModel.findOne({ symbol: symbol1 });
      if (card !== null && card !== undefined) {
        image = card.image;
      }
    }

    action_list.push({
      status: status,
      location1: action.first, location2: action.second,
      symbol1: symbol1, symbol2: symbol2,
      image: image
    });
  }

  resp.send({ actions: action_list });
});
}

module.exports.add = add;
