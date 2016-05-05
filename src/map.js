'use strict';
var World = require('./world').world;
var Map = function() {

};

//
Map.prototype.draw = function(target) {
	var result="";
        var room=[];
        var x=['0','1','2','3','4','5','6','7','8','9'];
        var y=['J','I','H','G','F','E','D','C','B','A'];
        var fontc = "";
        var bgc ="";
        var flag=true;
        var currentRoom=World.getRoomObject(target.area,target.roomid);
        
        for (var k=0;k<30;k++){
                var roomObj=World.getRoomObject(target.area,k.toString());
        	if(roomObj){
                        room.push(roomObj.location);
                }
        }

        result += "<h3>"+target.area+"->"+currentRoom.title+"</h3>";
        
        result += "<table border=\"1\">";
        for (var i=0;i<y.length;i++){
        	result += "<tr>";
                for (var j=0;j<x.length;j++){   
                         flag=true;                     
                         for(var z=0;z<room.length;z++){
                                if(room[z]===y[i]+"."+x[j]){
                                     if(currentRoom.location===y[i]+"."+x[j]){
                                          result += "<td bgcolor=\"#FF0040\"><font color=\"#D8D8D8\">"+y[i]+x[j]+"</font></td>";
                                     }else{
                                          result += "<td bgcolor=\"#2E2EFE\"><font color=\"#D8D8D8\">"+y[i]+x[j]+"</font></td>";
                                     }
                                     flag=false;
                                }                         
                         }
                         if(flag){
                         	result += "<td bgcolor=\"#000000\"><font color=\"#D8D8D8\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font></td>";
                         }
                }
                result += "</tr>";
        }
        
        result += "</table>";
        return result;
}

module.exports.map = new Map();
