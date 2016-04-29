'use strict';
var Cmd = require('../src/commands').cmd,
Room = require('../src/rooms').room,
World = require('../src/world').world;

/*
	The mayor walks aroud midgaard acting as a crier and greeting the masses.
	He puts down the northern gate every mornining and closes up the city at midnight.
*/
module.exports = {
	exclimations: [
		'我跟你說我昨天發現一個新的東西很厲害喔！',
		'上古卷軸5這個遊戲超好玩你一定要玩玩看。',
		'每天晚上我會把城門鎖好，記得晚上之前要回來喔！',
		'每天早上我會把城門開啟並且放下吊橋。'
	],
	moveDirections: ['north', 'east', 'west', 'south'],
	onAlive: function(roomObj) {
		var mayor = this,
		roll = World.dice.roll(1, 10);
		
		if (roll >= 5) {
			// Most of the time we just proclaim something
			Cmd.say(mayor, {
				msg: mayor.exclimations[parseInt(Math.random() * ((mayor.exclimations.length)))]
			});
		} else {
			// Sometimes we move to a new room
			Cmd.move(mayor, {
				arg: mayor.moveDirections[parseInt(Math.random() * ((mayor.moveDirections.length)))]
			});
		}
	}
};
