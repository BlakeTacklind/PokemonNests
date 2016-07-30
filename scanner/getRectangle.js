
var toRadians = function(deg){
	return deg * (Math.PI/180);
}

var toDegrees = function(rad){
	return rad * (180/Math.PI);
}

const R = 6371e3; // metres

var dist = function(coord1, coord2){
	var φ1 = toRadians(coord1.latitude);
	var φ2 = toRadians(coord2.latitude);
	var Δφ = φ2-φ1;
	var Δλ = toRadians(coord1.longitude - coord2.longitude);

	var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
		Math.cos(φ1) * Math.cos(φ2) *
		Math.sin(Δλ/2) * Math.sin(Δλ/2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

	return R * c;
}

var distEuc = function(coord1, coord2){
	return Math.sqrt(Math.pow(coord2.longitude - coord1.longitude, 2) + Math.pow(coord2.latitude - coord1.latitude, 2));
}

var bearing = function (coord1, coord2) {
	var φ1 = toRadians(coord1.latitude);
	var φ2 = toRadians(coord2.latitude);
	var Δφ = φ2-φ1;
	var Δλ = toRadians(coord1.longitude - coord2.longitude);
	var λ1 = toRadians(coord1.longitude);
	var λ2 = toRadians(coord2.longitude);

	var y = Math.sin(λ2-λ1) * Math.cos(φ2);
	var x = Math.cos(φ1)*Math.sin(φ2) -
		Math.sin(φ1)*Math.cos(φ2)*Math.cos(λ2-λ1);
	return Math.atan2(y, x);
}

module.exports = {
	bearing,
	dist,
	distEuc,
	calc: function(coords){
		var edge1 = dist(coords[0], coords[1]);
		// console.log(edge1);

		var edge2 = dist(coords[0], coords[2]);
		var edge3 = dist(coords[1], coords[2]);

		var p = (edge1 + edge2 + edge3)/2;

		var area = Math.sqrt(p * (p-edge1)*(p-edge2)*(p-edge3));

		return {length: edge1 , height:(area / edge1) * 2};
	}
}