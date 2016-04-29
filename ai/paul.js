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
		'歡迎光臨行動裝置實驗室！',
		'不好意思都沒空整理，辦公室亂得很。',
		'iOS實在太難搞了，為什麼還是那麼多人要用啊~~~',
		'用webview的方式開發APP搞不好可以省下你不少時間喔！'
	],
	moveDirections: ['north', 'east', 'west', 'south'],
	onAlive: function(roomObj) {
		var mayor = this,
		roll = World.dice.roll(1, 10);
		
		if (roll >= 2) {
			// Most of the time we just proclaim something
			Cmd.say(mayor, {
				msg: mayor.exclimations[parseInt(Math.random() * ((mayor.exclimations.length)))]
			});
		} /*else {
			// Sometimes we move to a new room
			Cmd.move(mayor, {
				arg: mayor.moveDirections[parseInt(Math.random() * ((mayor.moveDirections.length)))]
			});
		}*/
	}
};
