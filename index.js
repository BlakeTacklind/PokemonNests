var pokegoScan = require('pokego-scanner');
var usng = require('./usng.js');
var packing = require('./packing.js');
var rectCalc = require('./getRectangle.js');
var fs = require('fs');

var converter = new usng.Converter();

var SiliconValleyArea = [
	{latitude:37.510457, longitude:-122.233641},
	{latitude:37.525674, longitude:-122.194256},
	{latitude:37.496262, longitude:-122.128338},
	{latitude:37.435767, longitude:-122.039074},
	{latitude:37.323017, longitude:-122.132360},
	{latitude:37.463568, longitude:-122.315792},
];

var RectangleValley = [
	{latitude:37.520833, longitude:-122.204786},
	{latitude:37.419545, longitude:-122.037138},
	{latitude:37.457793, longitude:-122.331848},
];

var PaloAlto = {latitude:37.441883, longitude:-122.143019};
var PA = [PaloAlto['latitude'], PaloAlto['longitude']];

var ErrorFile = 'errors.txt';
var dataFile = 'data.txt';


// console.log(converter.LLtoUSNG(PA[0], PA[1], 6))
// console.log(converter.USNGtoLL("10S EG 75808 44239", true))

var radius = 400;

var rect = rectCalc.calc(RectangleValley);

var list = packing(radius, rect.length, rect.height);

var translation = [RectangleValley[0].latitude, RectangleValley[0].longitude];
var scale = rectCalc.distEuc(RectangleValley[1], RectangleValley[0]) / rect.length;
var rotate = rectCalc.bearing(RectangleValley[1], RectangleValley[0]);

var transformer = function(trans, sc, rot){

	return function(coord){
		// console.log(coord)
		var a = -sc *  Math.cos(rot);
		var b = -sc * -Math.sin(rot);
		var c = -sc *  Math.sin(rot);
		var d = -sc *  Math.cos(rot);

		// console.log(a,b,c,d)

		var x = coord.x;
		var y = coord.y;

		// console.log(x, y)

		var xPrime = a * x + b * y + trans[0];
		var yPrime = c * x + d * y + trans[1];

		return [xPrime, yPrime];
	};
}

var trans = transformer(translation, scale, rotate);
var run = 1;

var successTimeout =1000;
var failTimeout = 1000;

fs.writeFile(ErrorFile, "", function(err) {
    if(err) {
        return console.log(err);
    }
}); 
fs.writeFile(dataFile, "", function(err) {
    if(err) {
        return console.log(err);
    }
}); 

var logElement = function(p, k){
	fs.appendFileSync(dataFile, p[k]+',');
}

var scan = function(num){
	var c = trans(list[num]);
	var coord = {latitude: c[0], longitude:c[1]};
	// console.log(coord)

	pokegoScan(coord, (err, pokemon)=>{
		if (err){
			setTimeout(()=>{scan(num)}, failTimeout);

			try{
				fs.appendFileSync(ErrorFile, new Date().getTime()+" "+run.toString()+" "+num.toString()+" " + err+"\n")
			}
			catch(err){
				console.log('error logging failure ' + err)
			}

			return;
		};


		num++;
		if(num > list.length){
			num = 0;
			run++;
		}

		setTimeout(()=>{scan(num)}, successTimeout);


		try {
			fs.appendFileSync(dataFile, new Date().getTime()+" "+pokemon.length+" "+coord.latitude+" "+coord.longitude+'\n');

			for(var i = 0; i < pokemon.length; i++){
				var p = pokemon[i];
				logElement(p, 'id');
				logElement(p, 'latitude');
				logElement(p, 'longitude');
				logElement(p, 'pokemonId');
				logElement(p, 'expiration_time');
				logElement(p, 'name');
				logElement(p, 'distance');
				logElement(p, 'despawns_in');

				fs.appendFileSync(dataFile, '\n');

			}
		}
		catch(err){
			console.log('error logging data ' + err)
		}

		// console.log(typeof(pokemon[0]));
	});
}

scan(0);
// console.log(scale, rotate);

// console.log(list.length * .5 / 60);

// pokegoScan(PaloAlto, (err, pokemon)=>{
// 	if (err) throw err;
// 	console.log(pokemon);
// });
