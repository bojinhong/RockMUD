'use strict';
var Translate = function() {

};

//
Translate.prototype.direction = function(cmd) {
	var result="";
        switch(cmd){
        	case "east":
                	result="東(e)";
                break;
                case "west":
                        result="西(w)";
                break;
                case "south":
                        result="南(s)";
                break;
                case "north":
                        result="北(n)";
                break;
                case "up":
                        result="上(u)";
                break;
                case "down":
                        result="下(d)";
                break;
        }
        return result;
}

Translate.prototype.position = function(cmd) {
        var result="";
        switch(cmd){
                case "standing":
                        result="站立(standing)";
                break;
                case "sleeping":
                        result="睡覺(sleeping)";
                break;
                case "resting":
                        result="休息(resting)";
                break;
                case "flighting":
                        result="戰鬥(flighting)";
                break;
        }
        return result;
}

Translate.prototype.race = function(cmd) {
        var result="";
        switch(cmd){
                case "dwarf":
                        result="矮人(dwarf)";
                break;
                case "elf":
                        result="精靈(elf)";
                break;
                case "human":
                        result="人類(human)";
                break;
                case "ogre":
                        result="食人魔(ogre)";
                break;
        }
        return result;
}


/*
// General dice rolling
Roller.prototype.roll = function(dNum, dSides, mod) {
	var total = 0,
	i = 0;

	if (!mod) {
		mod = 0;
	}

	mod = Math.round(mod);

	for (i; i < dNum; i += 1) {
		total = total + Math.floor((Math.random() * dSides) + 1);
	}

	total = total + mod;

	return Math.round(total);
};

// return an array of numbers of length @number and between 0 - upperBound
Roller.prototype.randomPick = function(number, upperBound) {
	var i = 0,
	resultArr = [],
	randomNum = 0;

	for (i; i < number; i += 1) {
		randomNum = this.roll(1, upperBound);

		resultArr.push(randomNum);
	}

	return resultArr;
};

Roller.prototype.getDexMod = function(target, mod) {
	var sizeMod = 0;

	if (!mod) {
		mod = 0;
	}

	if (target.size < 3) {
		sizeMod += target.size;
	} else if (target.size > 3) {
		sizeMod = -(target.size - 2);
	}

	if (target.dex > 12) {
		return Math.round( (target.dex/4) + mod + sizeMod);
	} else {
		return 0;
	}
};

Roller.prototype.getConMod = function(target, mod) {
	var sizeMod = 0;

	if (!mod) {
		mod = 0;
	}

	if (target.size < 3) {
		sizeMod = -(target.size - 2);
	} else if (target.size > 3) {
		sizeMod += ( target.size );
	}

	if (target.con > 12) {
		return Math.round( (target.con/4) + mod + sizeMod);
	} else {
		return 0;
	}
};

Roller.prototype.getIntMod = function(target, mod) {
	if (!mod) {
		mod = 0;
	}

	if (target.int > 12) {
		return Math.ceil( (target.int/4) + mod);
	} else {
		return 0;
	}
};

Roller.prototype.getStrMod = function(target, mod) {
	var sizeMod = 0;

	if (!mod) {
		mod = 0;
	}

	if (target.size < 3) {
		sizeMod = -(target.size - 2);
	} else if (target.size > 3) {
		sizeMod += ( target.size );
	}

	if (target.str > 11) {
		return Math.round( (target.str/4) + mod + sizeMod);
	} else {
		return 0;
	}
};

Roller.prototype.getWisMod = function(target, mod) {
	if (!mod) {
		mod = 0;
	}

	if (target.wis > 13) {
		return Math.round( (target.wis/4) + mod);
	} else {
		return 0;
	}
};

// return an object with each mod outlined
Roller.prototype.getMods = function(player, mod) {
	var dice = this;

	if (!mod) {
		mod = 0;
	}

	return {
		con: dice.getConMod(player, mod),
		wis: dice.getWisMod(player, mod),
		int: dice.getIntMod(player, mod),
		str: dice.getStrMod(player, mod),
		dex: dice.getDexMod(player, mod)
	};
};

Roller.prototype.calExp = function(player, expOpt) {
	var dice = this,
	exp = 0,
	total = dice.roll(1, 4);

	if (!expOpt.level) {
		expOpt.level = 1;
	}

	if (expOpt.level >= (player.level - 6)) {
		if (expOpt.level >= player.level) {
			exp = ((((expOpt.level - player.level)) * total) + 1) *
			(total * Math.abs(expOpt.level - player.level)) + dice.roll(1, 10) + 20;

			return exp;
		} else {
			return dice.roll(1, 2) * 10;
		}
	} else {
		return exp;
	}
};
*/
module.exports.translate = new Translate();
