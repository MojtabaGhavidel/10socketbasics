//process bekhatere heroku hast
var PORT = process.env.PORT || 3000;

var express = require('express');
//1 app e express jadid misazim
var app = express();

//server e HTTP ma.aval mazhole http farakhni mishe.methode server farakahni mishe va appe express ro behesh midim.
//be node migim 1 servere jadid ejra kun va az app be onvane "boilrplate" estefade kun yani harchizi ke appe express behesh gosh bede
//server ham bayad behesh gosh bede
var http = require('http').Server(app);

//1 poshe ro expose mikunim
//static 1 argoman migire : masire poshe
//__dirname posheye jari hast
app.use(express.static(__dirname + '/public'));

//server ro ejra mikune
//function, call backi hast k bad az ejrae server return mishe

http.listen(PORT, function(){
	console.log('server started');
});