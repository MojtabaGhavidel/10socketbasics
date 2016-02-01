//process bekhatere heroku hast
var PORT = process.env.PORT || 3000;

var express = require('express');
//1 app e express jadid misazim
var app = express();

//server e HTTP ma.aval mazhole http farakhni mishe.methode server farakahni mishe va appe express ro behesh midim.
//be node migim 1 servere jadid ejra kun va az app be onvane "boilrplate" estefade kun yani harchizi ke appe express behesh gosh bede
//server ham bayad behesh gosh bede
var http = require('http').Server(app);

//ezafe kardane SOCKET.bejaye guzashte sim calon k bad az express ,on ro mastaghim ba servere http farakhani mikunim
//http bad az socket,formati hast ke socket.io entezar dare
var io = require('socket.io')(http);



//1 poshe ro expose mikunim
//static 1 argoman migire : masire poshe
//__dirname posheye jari hast
app.use(express.static(__dirname + '/public'));

//server ro ejra mikune
//function, call backi hast k bad az ejrae server return mishe

//in khat ro zire app.use gharar dadim
//ON montazere events mimone.avalin argoman esme event hast.
io.on('connection', function (socket) {
	console.log('User connected via socket.io!');


	//message = esme event,function = callback
	//message(narenji/daron function) object hast
	//in bakhsh montazere event mimone va on ro be tamame connection ha emit mikne
	//in bakhsh dar SERVER log mikune faghat
	socket.on('message', function (message){
		console.log('Message recieved' + message.text);

		//in bakhsh baraye CLIENT emit mikune
		//io.emit = baraye khode ersal kunande ham mire
		socket.broadcast.emit('message', message)
	})



	//objecte so socket va methode emit ke 1 event ro emit mikune
	//emit 1 argoman migire 1:esme event(harchi ke mikhaim) 2:data ke mifrestim.1 argoman inja mitonim estedae kunim
	//pas behtare OBJECT be kar bebarim

	socket.emit('message', {
		text :'Welcome to the cht application!'
	});

});

http.listen(PORT, function(){
	console.log('server started');
});