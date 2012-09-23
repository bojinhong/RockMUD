var Roller = function() {

}

Roller.prototype.roll = function(dNum, dSides) {
	try {
		var total = 0,
		i = 0;
		
		while(total < 12) { 	
			for (i; i < dNum; i += 1) {
				total = total + Math.floor(Math.random() * dSides) + 1;	
				console.log('current roll ' + total);
			}
			return total;
		}
	}
	catch(e) {
		console.log('Roller failed');
	}
}

module.exports.roller = new Roller();