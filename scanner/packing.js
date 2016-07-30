/*

*/

//gets the number of steps required to fill rectangle with hexes with size: size
var getNumbers = function(side, length, height){
	var h = 2 * (Math.sqrt(3) / 2) * side;

	// console.log(length, height, side, h, (length - side), (3 / 2) * side)

	//returns number of steps required
	//steps are an increment of how 
	return [Math.ceil(height / (h/2)), Math.ceil((length - side) / (3/2 * side)) + 1];
}

//get the length of hexes in odd columns and even columns
var getColumns = function(vert){
	return [Math.floor(vert/2) + 1, Math.ceil(vert/2)];
}

//get the number of hexes required
var getQunatity = function(col1, col2, horz){
	return Math.ceil(horz / 2) * col1 + Math.floor(horz / 2) * col2;
}

//given a hexagonside length
//length and height of a rectagle to fill
module.exports = function(side, length, height){
	var h = 2*(Math.sqrt(3) / 2) * side;
	// console.log(h);

	var norm = getNumbers(side, length, height);
	// console.log(norm);
	// var rot = getNumbers(side, height, length);
	// console.log(rot);


	var normC = getColumns(norm[0], norm[1]);
	// console.log(normC);
	// var rotC = getColumns(rot[0], rot[1]);
	// console.log(rotC);

	var normQ = getQunatity(normC[0], normC[1], norm[1]);
	// console.log(normQ);
	// var rotQ = getQunatity(rotC[0], rotC[1], rot[1]);
	// console.log(rotQ);

	// var normal = true;
	// if (normQ > rotQ)
	// 	normal = false;

	var list = [];

	// if(normal){
		for(var i = 0; i < norm[1]; i++){
			var col1 = ((i % 2) == 0);
			for(var j = 0; j < (col1 ? normC[0] : normC[1]); j++){
				list[list.length] = {x:side/2 + i*(side)*3/2, y: (col1 ? 0 : h/2) + (h * j)};
			}
		}
	// }
	// else{
	// 	for(var i = 0; i < rot[1]; i++){
	// 		var col1 = ((i % 2) == 0);
	// 		for(var j = 0; j < (col1 ? rotC[0] : rotC[1]); j++){
	// 			list[list.length] = {x:side/2 + i*(h+side)/2, y: (col1 ? 0 : h/2) + (h * j)};
	// 		}
	// 	}
	// }

	return list;
}
