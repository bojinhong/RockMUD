/*
* Characters.js controls everything dealing with a 'Character' which includes in game creatures.
* No in game commands are defiend here; Commands.js does share some function names with this module, 
* see: save().
*/
'use strict';
var fs = require('fs'),
crypto = require('crypto'),
Room = require('./rooms').room,
World = require('./world').world,
Skills = require('./skills').skills,
Character = function () {
	this.statusReport = [
		{msg: ' 全身流血看來已經接近死亡！', percentage: 0},
		{msg: ' 處於血流如注的狀態。', percentage: 10},
		{msg: ' 有一些重大割傷和瘀傷。', percentage: 20},
		{msg: ' 有一些大的傷口，看起來筋疲力盡！', percentage: 30},
		{msg: ' 有一些小割傷和瘀傷。', percentage: 40},
		{msg: ' 累了並且傷痕累累。', percentage: 50},
		{msg: ' 處於受傷狀態並顯出疲態。', percentage: 60},
		{msg: ' 看起來有點累也有點受傷！', percentage: 70},
		{msg: ' 輕微的受傷！', percentage: 80},
		{msg: ' 處於良好的健康狀態！', percentage: 90},
		{msg: ' 仍然處於完美的健康狀態！', percentage: 95},
		{msg: ' 處於完美的健康狀態！', percentage: 100}
	];
};

Character.prototype.login = function(r, s, fn) {
	var name = r.msg.replace(/_.*/,'').toLowerCase();
	
	if (r.msg.length > 2) {
		if  (/^[a-z]+$/g.test(r.msg) === true && /[`~@#$%^&*()-+={}[]|]+$/g.test(r.msg) === false) {
			fs.stat('./players/' + name + '.json', function (err, stat) {
				if (err === null) {
					return fn(name, s, true);
				} else {
					return fn(name, s, false);
				}
			});
		} else {
			return s.emit('msg', {msg : '<b>輸入無效</b>。 輸入你的名字：', res: 'login', styleClass: 'enter-name'});
		}
	} else {
		s.emit('msg', {
			msg: '無效的名字，至少需要超過兩個字。',
			res: 'login',
			styleClass: 'error'
		});
	}
};

Character.prototype.load = function(name, s, fn) {
	fs.readFile('./players/'  + name + '.json', function (err, r) {
		if (err) {
			throw err;
		}
		
		s.player = JSON.parse(r);

		s.player.name = s.player.name.charAt(0).toUpperCase() + s.player.name.slice(1);

		if (s.player.lastname !== '') {
			s.player.lastname = s.player.lastname = s.player.lastname.charAt(0).toUpperCase() + s.player.lastname.slice(1);
		}

		s.player.sid = s.id;
		s.player.socket = s;

		return fn(s);
	});
};

Character.prototype.hashPassword = function(salt, password, iterations, fn) {
	var hash = password,
	i = 0;
		
	for (i; i < iterations; i += 1) {
		hash = crypto.createHmac('sha512', salt).update(hash).digest('hex');
	}
			
	return fn(hash);
};

Character.prototype.generateSalt = function(fn) {
	crypto.randomBytes(128, function(ex, buf) {
		if (ex) {
			throw ex;
		}

		fn(buf.toString('hex'));
	});
};

Character.prototype.getPassword = function(s, fn) {
	var character = this;
	s.emit('msg', {msg: '你的密碼： ', res: 'enterPassword'});

	s.on('password', function (r) {
		if (r.msg.length > 7) {
			character.hashPassword(s.player.salt, r.msg, 1000, function(hash) {
				var roomObj,
				displayHTML;

				if (s.player.password === hash) {
					if (character.addPlayer(s)) {
						World.sendMotd(s);
						
						roomObj = World.getRoomObject(s.player.area, s.player.roomid);
						roomObj.playersInRoom.push(s.player);
						
						fn(s);
					} else {
						if (msg === undefined) {
							s.emit('msg', {msg: '登入錯誤，請重試。'});

							return s.disconnect();
						} else {
							s.emit('msg', {msg: msg, res: 'end'});
						}
					}
				} else {
					s.emit('msg', {msg: '超過5次登入錯誤，你已經被標記了。', res: 'enterPassword'});
					return s.emit('msg', {msg: '你的密碼： ', res: 'enterPassword'});
				}
			});
		} else {
			s.emit('msg', {msg: '錯誤！密碼需要有8個字或以上。', res: 'enterPassword'});
			return s.emit('msg', {msg: '你的密碼： ', res: 'enterPassword'});
		}
	});
};

// Add a player reference object to the players array
Character.prototype.addPlayer = function(s) {
	var i = 0,
	x = null;

	for (i; i < World.players.length; i += 1) {
		if (s.player.name === World.players[i].name) {
			return false;
		}
	}
	
	World.players.push(s.player);

	return true;
};

// A New Character is saved
Character.prototype.create = function(r, s, fn) { 
	var character = this,
	socket;

	s.player.displayName = s.player.name[0].toUpperCase() + s.player.name.slice(1);
	s.player.chp += 30;
	s.player.cmana += 5;
	s.player.cmv += 100;
	s.player.isPlayer = true;
	s.player.salt = '';
	s.player.created = new Date();
	s.player.saved = null;
	s.player.role = 'player';
	s.player.area = 'GITS Lab';
	s.player.roomid = '1';
	s.player.trains += 25;
	s.player.deaths = 0;
	s.player.baseStr += 10 + s.player.str;
	s.player.baseInt += 10 + s.player.int;
	s.player.baseWis += 10 + s.player.wis;
	s.player.baseCon += 10 + s.player.con;
	s.player.baseDex += 10 + s.player.dex;
	s.player.settings = {
		autosac: false,
		autoloot: true,
		autocoin: true,
		wimpy: {enabled: false, hp: 0},
		channels: {
			blocked: ['flame']
		}
	};

	socket = s.player.socket;

	s.player = character.rollStats(s.player);

	s.player.mv = s.player.cmv;
	s.player.mana = s.player.cmana;
	s.player.hp = s.player.chp;
	s.player.str = s.player.baseStr;
	s.player.int += s.player.baseInt;
	s.player.wis += s.player.baseWis;
	s.player.con += s.player.baseCon;
	s.player.dex += s.player.baseDex;

	character.generateSalt(function(salt) {
		s.player.salt = salt;

		character.hashPassword(salt, s.player.password, 1000, function(hash) {
			s.player.password = hash;
			s.player.socket = null;

			fs.writeFile('./players/' + s.player.name + '.json', JSON.stringify(s.player, null, 4), function (err) {
				var i = 0,
				displayHTML,
				roomObj;

				if (err) {
					throw err;
				}

				s.player.socket = socket;
				s.player.saved = new Date();
			
				if (character.addPlayer(s)) {
					s.leave('creation'); // No longer creating the character so leave the channel and join the game
					s.join('mud');

					World.sendMotd(s);

					displayHTML = Room.getDisplay(s.player.area, s.player.roomid);

					roomObj = World.getRoomObject(s.player.area, s.player.roomid);

					Room.getDisplayHTML(roomObj, {
						hideCallingPlayer: s.player.name
					});

					World.msgPlayer(s, {
						msg: displayHTML,
						styleClass: 'room'
					});

					fn(s);
				} else {
					s.emit('msg', {msg: '登入錯誤，請重試。'});

					s.disconnect();
				}
			});
		});
	});
};

// Rolling stats for a new character
Character.prototype.rollStats = function(player) {
	var i = 0,
	j = 0,
	raceKey, // property of the race defines in raceList
	classKey; // property of the class defines in classList
	
	for (i; i < World.races.length; i += 1) {// looking for race
		if (World.races[i].name.toLowerCase() === player.race.toLowerCase()) { // found race
			for (raceKey in player) {
				if (raceKey in World.races[i] && raceKey !== 'name') { // found, add in stat bonus
					if (isNaN(World.races[i][raceKey])) {
						player[raceKey] = World.races[i][raceKey];
					} else {
						player[raceKey] += World.races[i][raceKey];
					}
				}
			}
		}
	}

	for (j; j < World.classes.length; j += 1) { // looking through classes
		if (World.classes[j].name.toLowerCase() === player.charClass.toLowerCase()) { // class match found
			for (classKey in player) {
				if (classKey in World.classes[j] && classKey !== 'name') {
					if (!World.classes[j][classKey].isArray) {
						if (!isNaN(World.classes[j][classKey])) {
							player[classKey] += World.classes[j][classKey];
						} else {
							player[classKey] = World.classes[j][classKey];
						}
					} else {
						player[classKey].push(World.classes[j][classKey]);
					}
				} 
			}
		}
	}

	player.carry = player.str * 10;
	player.ac = World.dice.getDexMod(player) + 2;
	
	return player;
};

Character.prototype.newCharacter = function(r, s, fn) {
	var character = this,
	i = 0,
	str = '',
	races = World.getPlayableRaces(),
	classes = World.getPlayableClasses();

	for (i; i < races.length; i += 1) {
		str += '<li class="race-list-'+ races[i].name + '">' + races[i].fullname + '</li>';

		if	(races.length - 1 === i) {
			s.emit('msg', {
				msg: s.player.name + ' 是一個新的腳色！再3個步驟就完成設定了。<strong>第1步驟</strong>先選擇種族： <ul>' + str +
				'</ul><p class="tip">你可以打入指令help加上種族名稱來學習更多有關的資訊</p>',
				res: 'selectRace',
				styleClass: 'race-selection'
			});		

			s.on('raceSelection', function (r) { 
				var cmdArr = r.msg.split(' ');

				r.cmd = cmdArr[0].toLowerCase();
				r.msg = cmdArr.slice(1).join(' ');
	
				character.raceSelection(r, s, function(r, s, fnd) {
					if (fnd) {
						i = 0;
						str = '';
						s.player.race = r.cmd;

						for (i; i < classes.length; i += 1) {
							str += '<li>' + classes[i].fullname + '</li>';

							if	(classes.length - 1 === i) {
								s.emit('msg', {
									msg: '很好，<strong>再兩個步驟就設定好了！</strong>現在幫' + s.player.name +
									'從下面列表選一個職業：<ul>' + 
									str + '</ul>', 
									res: 'selectClass', 
									styleClass: 'race-selection'
								});
								
								s.on('classSelection', function(r) {
									r.msg = r.msg.toLowerCase();

									character.classSelection(r, function(fnd) {
										if (fnd) {
											s.player.charClass = r.msg;
											
											s.emit('msg', {
												msg: s.player.name + '是' + s.player.charClass + '！<strong>再一個步驟' + s.player.name + 
												'這個帳號就完成設定了</strong>。請設定密碼(需要8個或以上的字元)：', 
												res: 'createPassword', 
												styleClass: 'race-selection'
											});
								
											s.on('setPassword', function(r) {
												if (r.msg.length > 7) {
													s.player.password = r.msg;
													character.create(r, s, fn);
												} else {
													s.emit('msg', {msg: '密碼太短了', styleClass: 'error' });
												}
											});
										} else {
											s.emit('msg', {msg: '你選的職業沒有在列表上，請再選一次', styleClass: 'error' });
										}
									}); 
								});
							}
						}
					} else if (!fnd && r.cmd !== 'help') {
						s.emit('msg', {msg: '你選的種族沒有在列表上，請再選一次', styleClass: 'error' });
					}
				});
			});
		}
	}
};

Character.prototype.raceSelection = function(r, s, fn) {
	var i = 0,
	races = World.getPlayableRaces(),
	helpTxt;

	if (r.cmd !== 'help') {
		for (i; i < races.length; i += 1) {
			if (r.cmd === races[i].name.toLowerCase()) {
				return fn(r, s, true);
			}
		}

		return fn(r, s, false);
	} else {
		fs.readFile('./help/' + r.msg + '.html', 'utf-8', function (err, data) {
			if (!err) {
				s.emit('msg', {msg: data, styleClass: 'cmd-help' });

				return fn(r, s, false);
			} else {
				s.emit('msg', {msg: '沒有發現你的種族的幫助文件。', styleClass: 'error' });

				return fn(r, s, false);
			}
		});
	}
};

Character.prototype.classSelection = function(r, fn) {
	var i = 0,
	classes = World.getPlayableClasses();

	for (i; i < classes.length; i += 1) {
		if (r.msg === classes[i].name.toLowerCase()) {
			return fn(true)
		}
	}

	return fn(false);
};

Character.prototype.save = function(player, fn) {
	var character = this,
	socket = player.socket;

	player.saved = new Date().toString();

	if (player.opponent) {
		player.opponent = null;;
	};

	player.socket = null;

	fs.writeFile('./players/' + player.name.toLowerCase() + '.json', JSON.stringify(player, null, 4), function (err) {
		player.socket = socket;
		
		if (err) {
			return World.msgPlayer(player, {msg: '儲存時發生錯誤。'});
		} else {
			return fn(player);
		}
	});
};

Character.prototype.hpRegen = function(target) {
	var conMod = World.dice.getConMod(target),
	total;

	// unless the charcter is a fighter they have 
	// a 10% chance of skipping hp regen

	if (target.chp < target.hp && target.thirst < 5 && target.hunger < 6) {
		total = World.dice.roll(conMod, 4);

		if (target.position === 'sleeping') {
			conMod += 3;
		}

		if (target.thirst >= 3 || target.hunger >= 3) {
			conMod -= 1;
		}

		if (!conMod) {
			conMod = 1;
		}

		total = total + target.level;

		target.chp += total;

		if (target.chp > target.hp) {
			target.chp = target.hp;
		}
	}
};

Character.prototype.manaRegen = function(target) {
	var intMod = World.dice.getIntMod(target),
	chanceMod = World.dice.roll(1, 10),
	total;

	if (target.cmana < target.mana && target.thirst < 5 && target.hunger < 6) {
		total = World.dice.roll(intMod, 8);
		// unless the charcter is a mage they have 
		// a 10% chance of skipping mana regen
		if (target.charClass === 'mage' || (target.charClass !== 'mage' && chanceMod > 1)) {
			if (target.position === 'sleeping') {
				intMod += 2;
			}

			if (target.thirst >= 3 || target.hunger >= 3) {
				intMod -= 1;
			}

			if (!intMod) {
				intMod = World.dice.roll(1, 2) - 1;
			}

			total = total + target.level;

			target.cmana += total;

			if (target.cmana  > target.mana ) {
				target.cmana  = target.mana ;
			}
		}
	}
};

Character.prototype.mvRegen = function(target) {
	var dexMod = World.dice.getDexMod(target),
	total;

	// unless the charcter is a thief they have 
	// a 10% chance of skipping move regen

	if (target.cmv < target.mv && target.thirst < 5 && target.hunger < 6) {
		total = World.dice.roll(dexMod, 8);

		if (target.position === 'sleeping') {
			dexMod += 3;
		} else {
			dexMod += 1;
		}

		if (target.thirst >= 3 || target.hunger >= 3) {
			dexMod -= 1;
		}

		if (!dexMod) {
			dexMod = 1;
		}

		target.cmv += total;

		if (target.cmv > target.mv) {
			target.cmv = target.mv;
		}
	}
};

Character.prototype.hunger = function(target) {
	var character = this,
	conMod = World.dice.getConMod(target),
	total;

	if (target.hunger < 10) {
		total = World.dice.roll(1, 12 + conMod);

		if (total > 9) {
			target.hunger += 1;
		}

		if (target.hunger > 5) {
			target.chp -= Math.round(World.dice.roll(1, 5 + target.hunger) + (target.level - conMod));

			if (target.chp < target.hp) {
				target.chp = 0;
			}

			if (World.dice.roll(1, 2) === 1) {
				World.msgPlayer(target, {msg: '你感到飢餓。', styleClass: 'hunger'});
			} else {
				World.msgPlayer(target, {msg: '你的胃開始咆哮。', styleClass: 'hunger'});
			}
		}
	} else {
		/*
		Need death before this can be completed

		target.chp -= (World.dice.roll(1, 5 + target.hunger) - conMod) * 2;

		if (target.chp < target.hp) {
			target.chp = 0;
		}
		*/

		World.msgPlayer(target, {msg: '你快餓死了。', styleClass: 'hunger'});
	}
};

Character.prototype.thirst = function(target) {
	var character = this,
	total,
	dexMod = World.dice.getDexMod(target);

	if (target.thirst < 10) {
		total = World.dice.roll(1, 12 + dexMod);

		if (total > 10) {
			target.thirst += 1;
		}

		if (target.thirst > 5) {
			target.chp -= Math.round(World.dice.roll(1, 5 + target.thirst) + (target.level - dexMod));

			if (target.chp < target.hp) {
				target.chp = 0;
			}

			if (World.dice.roll(1, 2) === 1) {
				World.msgPlayer(target, {msg: '你口渴了。', styleClass: 'thirst'});
			} else {
				World.msgPlayer(target, {msg: '你的嘴唇乾裂。', styleClass: 'thirst'});
			}
		}
	} else {
		/*
		Need death before this can be completed

		target.chp -= (World.dice.roll(1, 5 + target.hunger) - conMod) * 2;

		if (target.chp < target.hp) {
			target.chp = 0;
		}
		*/

		World.msgPlayer(target, {msg: '你快渴死了。', styleClass: 'thirst'});
	}
};

// Removes experience and gained levels from character
Character.prototype.xpRot = function() {

};

// push an item into a players inventory, checks items to ensure a player can use it
Character.prototype.addItem = function(player, item) {
	player.items.push(item);
};

/*
* Returns all items that meet the query criteria, could be optimized if your
* slots are consistent.
*/
Character.prototype.getSlotsWithWeapons = function(player) {
	var i = 0,
	weapons = [];

	for (i; i < player.eq.length; i += 1) {
		if (player.eq[i].slot === 'hands' && player.eq[i].item !== null 
			&& player.eq[i].item.itemType === 'weapon') {
			weapons.push(player.eq[i]);
		}
	}

	return weapons;
};

Character.prototype.getWeaponSlots = function(player) {
	var i = 0,
	slots = [];

	for (i; i < player.eq.length; i += 1) {
		if (player.eq[i].slot === 'hands') {
			slots.push(player.eq[i]);
		}
	}

	return slots;
};

Character.prototype.getEmptyWeaponSlot = function(player) {
	var i = 0;

	for (i; i < player.eq.length; i += 1) {
		if (player.eq[i].slot === 'hands' && !player.eq[i].item) {
			return player.eq[i];
		}
	}

	return false;
};

Character.prototype.getSlotsWithShields = function(player) {
	var i = 0,
	shields = [];

	for (i; i < player.eq.length; i += 1) {
		if (player.eq[i].slot === 'hands' && player.eq[i].item 
			&& player.eq[i].item.itemType === 'shield') {
			shields.push(player.eq[i]);
		}
	}

	return shields;
};

Character.prototype.getLights = function(player) {
	var i = 0,
	lights = [];

	for (i; i < player.eq.length; i += 1) {
		if (player.eq[i].slot === 'hands' && player.eq[i].item !== null 
			&& player.eq[i].item.itemType === 'light' && player.eq[i].item.decay >= 1) {
			lights.push(player.eq[i]);
		}
	}

	return lights;
};

// All keys in the characters inventory
Character.prototype.getKeys = function(player) {
	var i = 0,
	lights = [];

	for (i; i < player.eq.length; i += 1) {
		if (player.eq[i].slot === 'hands' && player.eq[i].item !== null 
			&& player.eq[i].item.itemType === 'light' && player.eq[i].item.decay >= 1) {
			lights.push(player.eq[i]);
		}
	}

	return lights;
};

// if a character has a specific key
// keyId is the id found on exitObj.door.id
Character.prototype.getKey = function(player, keyId) {
	var i = 0,
	key;

	for (i; i < player.items.length; i += 1) {
		if (player.items[i].isKey && player.items[i].id === keyId) {
			return player.items[i];
		}
	}

	return false;
};

Character.prototype.getStatsFromItems = function(items, fn) {
	var character = this,
	itemMods = {};


};

Character.prototype.getStatsFromAffects = function(affects, fn) {

};

Character.prototype.getStatsFromEq = function(eq, fn) {

};

Character.prototype.getFist = function(player) {
	return {
		name: 'Fighting with your bare hands!',
		level: player.level,
		diceNum: player.diceNum,
		diceSides: player.diceSides,
		itemType: 'weapon',
		equipped: true,
		attackType: player.attackType,
		weaponType: 'fist',
		material: 'flesh',
		modifiers: {},
		diceMod: 0,
		slot: 'hands'
	};
};

Character.prototype.getContainer = function(player, command) {
	var char = this,
	containers = char.getContainers(player),
	i = 0;

	for (i; i < containers.length; i += 1) {
		if (containers[i].name.indexOf(command.input)) {
			return containers[i];
		}
	}

	return false;
};

Character.prototype.getContainers = function(player) {
	var i = 0,
	containers = [];

	for (i; i < player.items.length; i += 1) {
		if (player.items[i].itemType === 'container') {
			containers.push(player.items[i]);
		}
	}

	return containers;
};

Character.prototype.addToContainer = function(container, item) {
	container.items.push(item);
};

Character.prototype.getFromContainer = function(container, command) {
	var i = 0;

	for (i; i < container.items.length; i += 1) {
		if (container.items[i].name.toLowerCase().indexOf(command.arg) !== -1) {
			return container.items[i];
		}
	}

	return false;
};

Character.prototype.removeFromContainer = function(container, item) {
	var i = 0,
	newArr = [];

	for (i; i < container.items.length; i += 1) {
		if (container.items[i].refId !== item.refId) {
			newArr.push(container.items[i]);
		}
	}

	container.items = newArr;
};

Character.prototype.getBottle = function(player, command) {
	var char = this,
	containers = char.getBottles(player),
	i = 0;

	for (i; i < containers.length; i += 1) {
		if (containers[i].name.indexOf(command.input) !== -1) {
			return containers[i];
		}
	}

	return false;
};

Character.prototype.getBottles = function(player) {
	var i = 0,
	containers = [];

	for (i; i < player.items.length; i += 1) {
		if (player.items[i].itemType === 'bottle') {
			containers.push(player.items[i]);
		}
	}

	return containers;
};

Character.prototype.addToBottle = function(container, item) {
	container.items.push(item);
};

// returns a skill object in player.skills
Character.prototype.getSkill = function(player, skillId) {
	var i = 0;

	for (i; i < player.skills.length; i += 1) {
		if (player.skills[i].id === skillId) {
			return player.skills[i];
		}
	}

	return false;
};

Character.prototype.removeItem = function(player, item) {
	var i = 0,
	newArr = [];

	for (i; i < player.items.length; i += 1) {
		if (player.items[i].refId !== item.refId) {
			newArr.push(player.items[i]);
		}
	}

	player.items = newArr;
};

Character.prototype.removeEq = function(player, item) {
	var i = 0;

	item.equipped = false;

	for (i; i < player.eq.length; i += 1) {
		if (player.eq[i].item && player.eq[i].item.refId === item.refId) {
			player.eq[i].item = null;
		}
	}
	
	this.removeStatMods(player, item);

	World.msgPlayer(player, {
		msg: '你停止使用' + item.short + '。'
	});
};

Character.prototype.getItem = function(player, command) {
	var i = 0,
	newArr = [];

	for (i; i < player.items.length; i += 1) {
		if (player.items[i].name.toLowerCase().indexOf(command.arg) !== -1) {
			return player.items[i];
		}
	}

	return false;
};

Character.prototype.getItems = function(player, command) {
	var i = 0,
	newArr = [];

	for (i; i < player.items.length; i += 1) {
		if (player.items[i].name.toLowerCase().indexOf(command.arg) !== -1) {
			newArr.push(player.items[i]);
		}
	}

	return newArr;
};

Character.prototype.addStatMods = function(player, item) {
	var prop;

	for (prop in item.modifiers) {
		if (player[prop]) {
			player[prop] += item.modifiers[prop];
		}
	}
};

Character.prototype.removeStatMods = function(player, item) {
	var prop;

	for (prop in item.modifiers) {
		if (player[prop]) {
			player[prop] -= item.modifiers[prop];
		}
	}
}

Character.prototype.wearWeapon = function(target, weapon) {
	var slot = this.getEmptyWeaponSlot(target),
	roomObj = World.getRoomObject(target.area, target.roomId);

	weapon.equipped = true;
	
	slot.item = weapon;

	this.addStatMods(target, weapon);

	World.msgPlayer(target, {
		msg: '你用'+ slot.name+ '揮舞著' + weapon.short + '。'
	});
};

Character.prototype.wearShield = function(target, shield) {
	var slot = this.getEmptyWeaponSlot(target);

	shield.equipped = true;
	
	slot.item = shield;

	this.addStatMods(target, shield);

	World.msgPlayer(target, {
		msg: '你用' + shield.short + '防禦自己。'
	});
};

Character.prototype.wearLight = function(target, light) {
	var slot = this.getEmptyWeaponSlot(target);

	light.equipped = true;

	slot.item = light;

	this.addStatMods(target, light);

	if (slot.item.decay > 0) {
		World.msgPlayer(target, {
			msg: light.short + '猛烈的燃燒因而發出耀眼的光芒。'
		});
	} else {
		World.msgPlayer(target, {
			msg: '你手中拿的' + light.short + '已經燃燒殆盡。'
		});
	}
};

Character.prototype.wearArmor = function(target, armor) {
	var slot = this.getSlot(target, armor.slot);

	if (slot) {
		armor.equipped = true;
		
		slot.item = armor;
		
		World.msgPlayer(target, {
			msg: 'You wear a ' + armor.short + ' on your ' + slot.name + '.'
		});
	} else {
		return false;
	}
};

Character.prototype.wearFloating = function(target, floating) {
		
};

Character.prototype.removeWeapon = function() {

};

Character.prototype.getSlot = function(target, slotName) {
	var i = 0;

	for (i; i < target.eq.length; i += 1) {
		if (target.eq[i].slot === slotName) {
			return target.eq[i];
		}
	}

	return false;
};

Character.prototype.getEmptyWeaponSlot = function(target) {
	var i = 0;

	for (i; i < target.eq.length; i += 1) {
		if (target.eq[i].slot === 'hands'
			&& !target.eq[i].item) {
			return target.eq[i];
		}
	}

	return false;
};

Character.prototype.getStatusReport = function(player) {
	var i = 0;

	for (i; i < this.statusReport.length; i += 1) {
		if (this.statusReport[i].percentage >= ((player.chp/player.hp) * 100) ) {
			return player, this.statusReport[i];
		}
	}
};

Character.prototype.getAffect = function(player, affectName) {
	var i = 0;

	for (i; i < player.affects.length; i += 1) {
		if (player.affects[i].id === affectName) {
			return player.affects[i];
		}
	}

	return false;
};

Character.prototype.removeAffect = function(player, affectName) {
	var i = 0;

	for (i; i < player.affects.length; i += 1) {
		if (player.affects[i].id === affectName) {
			return player.affects[i];
		}
	}

	return false;
};

Character.prototype.addAffect = function(player) {
	var i = 0;

	for (i; i < player.affects.length; i += 1) {
		if (player.affects[i].id === affectName) {
			player.affects[i].decay += 1;

			return false;
		}
	}

	player.affects.push(affect);
	
	return true;;
};

Character.prototype.canSee = function(player, roomObj, light) {
	var canSee = player.sight;
		
	if (this.getAffect(player, 'darkvision') && player.sight) {
		canSee == true;
	} else if ((!World.time.isDay && !roomObj.dark) || roomObj.dark === true) {
		canSee = false;
	}
	
	return canSee;
};

Character.prototype.createCorpse = function(player) {
	player.level = 1;
	player.short = player.name+'的腐爛屍體';
	player.decay = 1;
	player.itemType = 'corpse';
	player.corpse = true;
	player.weight = player.weight - 1;
	player.chp = 0;
	player.hp = 0;
	player.cmana = 0;
	player.mana = 0;
	player.cmv = 0;
	player.mv = 0;
};

Character.prototype.getLoad = function(s) {
	var load = Math.round((s.player.str + s.player.con / 4) * 10);
	
	return load;
};

Character.prototype.level = function(s, fn) {

};

// Add in gear modifiers and return the updated object
Character.prototype.calculateGear = function() {

};



module.exports.character = new Character();
