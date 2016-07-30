var pokegoScan = require('pokego-scanner');
var usng = require('./usng.js');
var converter = new usng.Converter();

var SiliconValleyArea = [
	{latitude:37.510457, longitude:-122.233641},
	{latitude:37.525674, longitude:-122.194256},
	{latitude:37.496262, longitude:-122.128338},
	{latitude:37.435767, longitude:-122.039074},
	{latitude:37.323017, longitude:-122.132360},
	{latitude:37.463568, longitude:-122.315792},
];

var PaloAlto = {latitude:37.441883, longitude:-122.143019};
var PA = [PaloAlto['latitude'], PaloAlto['longitude']];

// console.log(converter.LLtoUSNG(PA[0], PA[1], 6))
// console.log(converter.USNGtoLL("10S EG 75808 44239", true))

var radius = 200;

// pokegoScan(PaloAlto, (err, pokemon)=>{
// 	if (err) throw err;
// 	console.log(pokemon);
// });
