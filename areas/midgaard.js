
'use strict';
var Cmd = require('../src/commands').cmd,
Room = require('../src/rooms').room,
World = require('../src/world').world;

module.exports = {
    "name" : "Midgaard",
    "id" : "1",
    "type" : "city",
    "levels" : "All",
    "description" : "第一座城市。",
    "reloads": 0,
    "created": "",
    "saved": "",
	"dark": false,
	"author": "Rocky",
    "messages": [
        {"msg": "一陣涼風吹過街道。"},
        {"msg": "留意盜賊，城市的喧囂可能分散你注意力。"}
    ],
    "respawnOn": 3,
    "respawnTick": 0,
    "rooms" : [
        {
            "id" : "1",
            "title" : "Town Square",
            "area": "Midgaard",
            "content" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent congue sagittis efficitur. Vivamus dapibus sem ac mauris pharetra dapibus. Nunc id ex orci. Quisque fringilla dictum orci molestie condimentum. Duis volutpat porttitor ipsum. Sed ac aliquet leo. Nulla at facilisis orci, eu suscipit nibh. ",
            "exits" : [
                {
                    "cmd" : "north",
                    "id" : "2"
                }, {
                    "cmd" : "east",
                    "id" : "3"
                }, {
                    "cmd" : "south",
                    "id" : "4"
                }, {
                    "cmd" : "west",
                    "id" : "5"
                },
                {
                    "cmd" : "down",
                    "id" : "6",
                    "door": {
                        "isOpen": false,
                        "locked": true,
                        "key": "101",
                        "openMsg": "A foul smell flows in from below.",
                        "unlockMsg": "You hear something moving under the gate.",
                        "name": "gate"
                    }
                }
            ],
            "playersInRoom": [],
            "monsters" : [
                {
                    "name": "Rufus",
                    "level": 15,
                    "short": "魯弗斯，這座城市的市長",
                    "description": "",
                    "race": "human",
                    "id": 9,
                    "area": "Midgaard",
                    "weight": 245,
                    "diceNum": 2, 
                    "diceSides": 8,
                    "diceMod": 5,
                    "str": 16,
                    "position": "standing",
                    "attackType": "punch",
                    "damRoll": 10,
                    "hitRoll": 10,
                    "templates": [],
                    "ac": 20,
                    "itemType": "mob",
                    "items": [{
                        "name": "Midgaard city key", 
                        "short": "a small key",
                        "long": "A thin gold key with a ruby embbeded to the end." ,
                        "area": "Midgaard",
                        "id": "10",
                        "level": 1,
                        "itemType": "key",
                        "material": "gold", 
                        "weight": 0,
                        "slot": "",
                        "value": 1000,
                        "equipped": false,
                        "isKey": true,
                        "flags": []
                    }],
                    "behaviors": [{
                        "module" : "mayor"
                    }]
                }, {
                    "name": "Boar",
                    "displayName": ["Brown boar", "A old brown boar"],
                    "level": 1,
                    "short": ["一隻棕色的大野豬", "一隻巨大的野豬"],
                    "race": "animal",
                    "id": "6",
                    "area": "Midgaard",
                    "weight": 120,
                    "position": "standing",
                    "attackType": "bite",
                    "templates": [],
                    "ac": 7,
                    "hp": 18,
                    "chp": 18,
                    "gold": 1,
                    "size": {"value": 2, "display": "small"},
                    "itemType": "mob",
                    "spawn": "2",
                    "behaviors": [{  
                        "module" : "wander"
                    }]
                }, {
                    "name": "Shackleton",
                    "displayName": "The mayors dog",
                    "level": 15,
                    "short": "Shackleton, the Mayors famous canine",
                    "description": "",
                    "race": "human",
                    "id": "100",
                    "area": "Midgaard",
                    "weight": 115,
                    "diceNum": 2, 
                    "diceSides": 8,
                    "diceMod": 5,
                    "str": 13,
                    "position": "resting",
                    "attackType": "maw",
                    "damRoll": 10,
                    "hitRoll": 10,
                    "templates": [],
                    "ac": 10,
                    "itemType": "mob",
                    "items": [],
                    "behaviors": []
                }
            ],
            "items" : [{
                "name": "Torch", 
                "short": "骯髒煙灰覆蓋的火炬",
                "long": "" ,
                "area": "Midgaard",
                "id": "104", 
                "level": 1,
                "itemType": "light",
                "material": "wood", 
                "ac": -1, 
                "weight": 1,
                "slot": "hands",
                "equipped": false,
                "decay": 10,
                "flags": [] 
            }, {
                "name": "Small Buckler", 
                "short": "small round buckler",
                "long": "" ,
                "area": "Midgaard",
                "id": "103", 
                "level": 1,
                "itemType": "shield",
                "material": "wood", 
                "ac": 2, 
                "weight": 1,
                "slot": "hands",
                "equipped": false,
                "flags": []
            }, {
                "name": "Loaf of Bread",
                "short": "brown loaf of bread",
                "long": "A rather stale looking loaf of bread." ,
                "area": "Midgaard",
                "id": "7",
                "level": 1,
                "itemType": "food",
                "weight": 0.5,
                "diceNum": 1,
                "diceSides": 6,
                "diceMod": 1,
                "decay": 7,
                "flags": []
            }, {
                "name": "Short Sword", 
                "short": "短劍",
                "long": "一把鋒利的短劍包裹著皮革。" ,
                "area": "Midgaard",
                "id": "8",
                "level": 1,
                "itemType": "weapon",
                "weaponType": "sword",
                "material": "iron", 
                "diceNum": 1, 
                "diceSides": 6,
                "diceMod": 0,
                "attackType": "slice", 
                "attackElement": "",
                "weight": 4,
                "slot": "hands",
                "equipped": false,
                "modifiers": {
                    "str": 2
                },
                "flags": [],
				"onKill": function(roomObj) {
					console.log('lol');
				}
            }, {
                "name": "Burlap sack",
                "short": "worn, tan, burlap sack",
                "long": "A tan burlap sack with frizzed edges and various stains." ,
                "area": "Midgaard",
                "id": "27",
                "level": 1,
                "itemType": "container",
                "weight": 1,
                "items": [{
                    "name": "Sewer key", 
                    "short": "small rusty key",
                    "long": "A small rusty key made of low quality iron." ,
                    "area": "Midgaard",
                    "id": "101",
                    "level": 1,
                    "itemType": "key",
                    "material": "iron", 
                    "weight": 0,
                    "slot": "",
                    "value": 1,
                    "equipped": false,
                    "isKey": true
                }],
                "isOpen": true,
                "carryLimit": 50,
                "flags": []
            }],
            "flags" : [],
            "onEnter": ""
        },
        {
            "id" : "2",
            "title" : "城市廣場北邊",
            "area": "Midgaard",
            "content" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent congue sagittis efficitur. Vivamus dapibus sem ac mauris pharetra dapibus. Nunc id ex orci. Quisque fringilla dictum orci molestie condimentum. Duis volutpat porttitor ipsum. Sed ac aliquet leo. Nulla at facilisis orci, eu suscipit nibh. ",
            "exits" : [
                {
                    "cmd" : "south",
                    "id" : "1"
                }
            ],
            "playersInRoom": [],
            "monsters" : [],
            "items" : [{
                "name": "Tattered Buckler", 
                "short": "Tattered Buckler",
                "long": "A round buckler that looks like its seen heavy use." ,
                "area": "Midgaard",
                "id": "2", 
                "level": 1,
                "itemType": "shield",
                "material": "wood", 
                "ac": 2, 
                "weight": 6,
                "slot": "hands",
                "equipped": false,
                "flags": []
            }],
            "flags" : []
        },
        {
            "id" : "3",
            "title" : "城市廣場東邊",
            "area": "Midgaard",
            "content" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent congue sagittis efficitur. Vivamus dapibus sem ac mauris pharetra dapibus. Nunc id ex orci. Quisque fringilla dictum orci molestie condimentum. Duis volutpat porttitor ipsum. Sed ac aliquet leo. Nulla at facilisis orci, eu suscipit nibh. ",
            "terrian" : "stone-road",
            "terrianMod": 0,
            "exits" : [
                {
                    "cmd" : "west",
                    "id" : "1"
                }
            ],
            "playersInRoom": [],
            "monsters" : [],
            "items" : [{
                "name": "Brown waterskin", 
                "short": "brown waterskin",
                "long": "A brown waterskin. The hide seems worn and used." ,
                "area": "Midgaard",
                "id": "102",
                "level": 1,
                "drinks": 6,
                "maxDrinks": 6,
                "itemType": "bottle",
                "material": "leather",
                "weight": 0,
                "value": 1,
                "equipped": false
            }],
            "flags" : []
        },
        {
            "id" : "4",
            "title" : "城市廣場南邊",
            "area": "Midgaard",
            "content" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent congue sagittis efficitur. Vivamus dapibus sem ac mauris pharetra dapibus. Nunc id ex orci. Quisque fringilla dictum orci molestie condimentum. Duis volutpat porttitor ipsum. Sed ac aliquet leo. Nulla at facilisis orci, eu suscipit nibh. ",
            "exits" : [
                {
                    "cmd" : "north",
                    "id" : "1"
                }
            ],
            "playersInRoom": [],
            "monsters" : [],
            "items" : [],
            "flags" : []
        },
        {
            "id" : "5",
            "title" : "城市廣場西邊",
            "area": "Midgaard",
            "content" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent congue sagittis efficitur. Vivamus dapibus sem ac mauris pharetra dapibus. Nunc id ex orci. Quisque fringilla dictum orci molestie condimentum. Duis volutpat porttitor ipsum. Sed ac aliquet leo. Nulla at facilisis orci, eu suscipit nibh. ",
            "exits" : [
                {
                    "cmd" : "west",
                    "id" : "8"
                },
                {
                    "cmd" : "east",
                    "id" : "1"
                }
            ],
            "playersInRoom": [],
            "monsters" : [],
            "items" : [{
                "name": "Leather Helmet", 
                "short": "Leather Helmet",
                "long": "" ,
                "area": "Midgaard",
                "id": "3", 
                "level": 1,
                "itemType": "armor",
                "material": "wood", 
                "ac": 1, 
                "weight": 1,
                "slot": "head",
                "equipped": false,
                "flags": []
            }],
            "flags" : []
        },
        {
            "id" : "6",
            "title" : "下城區廣場",
            "area": "Midgaard",
            "content" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent congue sagittis efficitur. Vivamus dapibus sem ac mauris pharetra dapibus. Nunc id ex orci. Quisque fringilla dictum orci molestie condimentum. Duis volutpat porttitor ipsum. Sed ac aliquet leo. Nulla at facilisis orci, eu suscipit nibh. ",
            "exits" : [
                {
                    "cmd" : "up",
                    "id" : "1",
                    "door": {
                        "name": "gate",
                        "isOpen": false,
                        "locked": true,
                        "key": "101"
                    }
                }
            ],
            "playersInRoom": [],
            "monsters" : [{
                "name": "Large alligator",
                "level": 3,
                "race": "animal",
                "short": "A large mean looking alligator",
                "diceNum": 2,
                "diceSides": 2,
                "diceMod": 2,
                "hp": 30,
                "chp": 30,
                "kingdom": "reptile",
                "gold": 3,
                "size": {"value": 3, "display": "medium"},
                "attackOnVisit": true,
                "behaviors": [{
                    "module": "aggie"
                }]
            }],
            "items" : [],
            "flags" : []
        },
        {
            "id" : "8",
            "title" : "一般商店",
            "area": "Midgaard",
            "content" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent congue sagittis efficitur. Vivamus dapibus sem ac mauris pharetra dapibus. Nunc id ex orci. Quisque fringilla dictum orci molestie condimentum. Duis volutpat porttitor ipsum. Sed ac aliquet leo. Nulla at facilisis orci, eu suscipit nibh. ",
            "exits" : [
                {
                    "cmd" : "east",
                    "id" : "5"
                }
            ],
            "playersInRoom": [],
            "monsters" : [
                {
                    "name": "Tom",
                    "level": 15,
                    "short": "Thomas, the dwarven shopkeep",
                    "description": "",
                    "race": "dwarf",
                    "id": "9",
                    "area": "Midgaard",
                    "weight": 200,
                    "diceNum": 2, 
                    "diceSides": 8,
                    "diceMod": 5,
                    "str": 18,
                    "gold": 1000,
                    "position": "standing",
                    "attackType": "punch",
                    "damRoll": 10,
                    "hitRoll": 10,
                    "templates": [],
                    "ac": 20,
                    "merchant": true,
                    "itemType": "mob",
                    "items": [{
                        "name": "Pemmican", 
                        "short": "",
                        "long": "" ,
                        "area": "Midgaard",
                        "id": "110",
                        "level": 1,
                        "itemType": "food",
                        "material": "flesh", 
                        "weight": 0,
                        "slot": "",
                        "value": 10,
                        "equipped": false,
                        "store": true,
                        "worth": 10
                    }, {
                        "name": "Pemmican", 
                        "short": "",
                        "long": "" ,
                        "area": "Midgaard",
                        "id": "110",
                        "level": 1,
                        "itemType": "food",
                        "material": "flesh", 
                        "weight": 0,
                        "slot": "",
                        "value": 10,
                        "equipped": false,
                        "store": true,
                        "worth": 10
                    }, {
                        "name": "Pemmican", 
                        "short": "",
                        "long": "" ,
                        "area": "Midgaard",
                        "id": "110",
                        "level": 1,
                        "itemType": "food",
                        "material": "flesh", 
                        "weight": 0,
                        "slot": "",
                        "value": 10,
                        "equipped": false,
                        "store": true,
                        "worth": 10
                    }],
                    "behaviors": [] 
                }
            ],
            "items" : [],
            "flags" : []
        }
    ]
};
