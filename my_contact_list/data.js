// Fields:
//	- name - name of contact
//	- status - status of contact. Possible values: Friend, Enemy, Aquaintance
//	- contact - contact number
//	- isFriend - if the contact is a friend, it will have a true value
//	- isEnemy - if the contact is an enemy, it will have a true value
//	- isAq - if the contact is an aquantance, it will have a true value

function getContactList(){
	const fs = require('fs');
	let rawdata = fs.readFileSync('./data.json');
	return JSON.parse(rawdata);
}

module.exports.getContactList = getContactList;
