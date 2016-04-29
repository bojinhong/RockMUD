'use strict';
var Cmd = require('../src/commands').cmd,
Room = require('../src/rooms').room,
World = require('../src/world').world;

module.exports = {
    "name" : "GITS Lab",
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
            "title" : "GITS Lab",
            "area": "GITS Lab",
            "content" : "我們是一群專注於互、物聯網應用商務與技術開發的人，從裝置端的開發到雲端後台建置與資料分析，都是我們投入的範圍，希望透過這個交流的平台分享我們的收獲，如同魔豆穿透雲端，連接到未知世界 ^^。",
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
                    "name": "Lormann",
                    "level": 15,
                    "short": "Lormann，GITS Lab的技術長",
                    "description": "",
                    "race": "human",
                    "id": 9,
                    "area": "GITS Lab",
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
                        "name": "GITS Lab city key", 
                        "short": "a small key",
                        "long": "A thin gold key with a ruby embbeded to the end." ,
                        "area": "GITS Lab",
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
                        "module" : "lormann"
                    }]
                }, {
                    "name": "野豬(Boar)",
                    "displayName": ["棕色野豬(Boar)", "棕色老野豬(Boar)"],
                    "level": 1,
                    "short": ["一隻棕色的大野豬(Boar)", "一隻巨大的野豬(Boar)"],
                    "race": "animal",
                    "id": "6",
                    "area": "GITS Lab",
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
                },
                {
                    "name": "Schy",
                    "level": 15,
                    "short": "Schy，Dev Manager",
                    "description": "",
                    "race": "human",
                    "id": 9,
                    "area": "GITS Lab",
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
                        "name": "GITS Lab city key",
                        "short": "a small key",
                        "long": "A thin gold key with a ruby embbeded to the end." ,
                        "area": "GITS Lab",
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
                        "module" : "schy"
                    }]
                } 
            ],
            "items" : [{
                "name": "Torch", 
                "short": "骯髒煙灰覆蓋的火炬(Torch)",
                "long": "" ,
                "area": "GITS Lab",
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
            },  {
                "name": "Short Sword", 
                "short": "短劍(Short Sword)",
                "long": "一把鋒利的短劍包裹著皮革。" ,
                "area": "GITS Lab",
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
            }],
            "flags" : [],
            "onEnter": ""
        },
        {
            "id" : "2",
            "title" : "行動裝置研發實驗室",
            "area": "GITS Lab",
            "content" : "一個破舊的辦公室，桌上散亂的擺了一堆行動裝置，iPhone6、Note3、G4...，桌上電腦畫面中Android Studio還開著一個Project。 ",
            "exits" : [
                {
                    "cmd" : "south",
                    "id" : "1"
                }
            ],
            "playersInRoom": [],
            "monsters" : [{
                    "name": "Paul",
                    "level": 15,
                    "short": "Paul，這個辦公室的負責人",
                    "description": "",
                    "race": "human",
                    "id": 9,
                    "area": "GITS Lab",
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
                        "name": "GITS Lab city key",
                        "short": "a small key",
                        "long": "A thin gold key with a ruby embbeded to the end." ,
                        "area": "GITS Lab",
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
                        "module" : "paul"
                    }]
                }],
            "items" : [{
                "name": "iPhone6S", 
                "short": "破舊的iPhone6S",
                "long": "A round buckler that looks like its seen heavy use." ,
                "area": "GITS Lab",
                "id": "2", 
                "level": 1,
                "itemType": "shield",
                "material": "wood", 
                "ac": 2, 
                "weight": 6,
                "slot": "hands",
                "equipped": false,
                "flags": []
            },
            {
                "name": "Note3",        
                "short":"螢幕裂開的Note3",
                "long": "A round buckler that looks like its seen heavy use." ,
                "area": "GITS Lab",
                "id": "2",
                "level": 1,
                "itemType": "shield",
                "material": "wood",
                "ac": 2,
                "weight": 6,
                "slot": "hands",
                "equipped": false,
                "flags": []
            }
        ],
            "flags" : []
        },
        {
            "id" : "3",
            "title" : "數據分析實驗室",
            "area": "GITS Lab",
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
                "area": "GITS Lab",
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
            "title" : "雲端開發實驗室",
            "area": "GITS Lab",
            "content" : "想看到sigrid的blog文章請打list。",
            "exits" : [
                {
                    "cmd" : "north",
                    "id" : "1"
                }
            ],
            "playersInRoom": [],
            "monsters" : [
         {
                    "name": "Sigrid",
                    "level": 15,
                    "short": "Sigrid, 資深工程師",
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
                        "name": "<a href=\"http://wp.me/p7t8c8-6x\" target=\"_blank\">使用Python取得Facebook文章存到DynamoDB</a>", 
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
                        "name": "<a href=\"http://wp.me/p7t8c8-6p\" target=\"_blank\">Tensorflow初體驗-環境建置</a>", 
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
                        "name": "<a href=\"http://wp.me/p7t8c8-3E\" target=\"_blank\">AWS SNS with APNS</a>", 
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
        },
        {
            "id" : "5",
            "title" : "DevOps流程控管實驗室",
            "area": "GITS Lab",
            "content" : "DevOps是一組過程、方法與系統的統稱，用於促進開發、技術運營和質量保障部門之間的溝通、協作與整合。 ",
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
                "area": "GITS Lab",
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
            "title" : "露天咖啡座",
            "area": "GITS Lab",
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
            "title" : "科技新聞中心",
            "area": "GITS Lab",
            "content" : "GITS Lab的新聞中心，這邊會收集一些新的科技和產業新聞網站，請打list可以看到網站列表。",
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
                    "short": "Thomas, 科技新聞中心主任",
                    "description": "",
                    "race": "dwarf",
                    "id": "9",
                    "area": "GITS Lab",
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
                        "name": "<a href=\"http://chinese.engadget.com/\" target=\"_blank\">Engadget中文版</a>", 
                        "short": "",
                        "long": "" ,
                        "area": "GITS Lab",
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
                        "name": "<a href=\"http://www.ithome.com.tw/\" target=\"_blank\">iThome</a>", 
                        "short": "",
                        "long": "" ,
                        "area": "GITS Lab",
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
                        "name": "<a href=\"http://buzzorange.com/techorange/\" target=\"_blank\">科技橘報</a>", 
                        "short": "",
                        "long": "" ,
                        "area": "GITS Lab",
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
