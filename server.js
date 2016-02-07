//process bekhatere heroku hast
var PORT = process.env.PORT || 3000;
var moment = require('moment');
var express = require('express');
//1 app e express jadid misazim
var app = express();

//server e HTTP ma.aval mazhole http farakhni mishe.methode server farakahni mishe va appe express ro behesh midim.
//be node migim 1 servere jadid ejra kun va az app be onvane "boilerplate" estefade kun yani harchizi ke 
//appe express behesh gosh mide
//server ham bayad behesh gosh bede
var http = require('http').Server(app);

//ezafe kardane SOCKET.bejaye guzashte sim calon k bad az express ,on ro mastaghim ba servere http farakhani mikunim
//http bad az socket,formati hast ke socket.io entezar dare
var io = require('socket.io')(http);


var clientInfo = {

};

//1 poshe ro expose mikunim
//static 1 argoman migire : masire poshe
//__dirname posheye jari hast
app.use(express.static(__dirname + '/public'));



//server ro ejra mikune
//function, call backi hast k bad az ejrae server return mishe
//in khat ro zire app.use gharar dadim
//ON montazere events mimone.avalin argoman esme event hast ke dar 'socket.emit' sakhtim
//'socket' dar inja 1 computeri hast ke vasl shude na chand computer.
io.on('connection', function (socket) {
	console.log('User connected via socket.io!');



	// [list all connected sockets]
	//The Object.keys() method returns an array of a given object's own enumerable
	//properties, in the same order as that provided
	// by a for...in loop (the difference being that a for-in loop enumerates properties in the prototype chain as well)
	var list = Object.keys(io.sockets.sockets);
	console.log("ALL Connected sockets:")
	list.forEach(function(id) {
    console.log("ID:",id)  // socketId
})


	if(io.sockets.adapter.rooms) {
		console.log(io.sockets.adapter.rooms);
	} else {
		console.log('NO ROOMS');
	}
	//Object.keys(io.sockets.adapter.rooms["LOTR"].sockets);






	//
	socket.on('disconnect', function(){

		var userData = clientInfo[socket.id];

		//check mikunim ke aya baraye in user DATA darim (karbar ozve chatroom hast?)
		if (typeof clientInfo[socket.id] !== 'undefined'){
			//larbar az room leave mishe
			socket.leave(userData.room);

			//paya,e leave
			io.to(userData.room).emit('message',{
				name: 'System',
				text: userData.name + ' hast left!',
				timestamp: moment().valueOf()
			});
			//pak kardane data az CLIENT INFO
			//'delete' ejaze mide attribute ro az 1 object pak kunim
			delete clientInfo[socket.id];
		}
	});

	//req = objecti ke dar app.js dar 'joinRoom" sakhtim {name:name, room :room}
	//server REQUEST ro migire
	socket.on('joinRoom', function (req){
		// az [] estefade mikunim chun 
		//req object hast

		//req = objecti ke dar app.js dar 'joinRoom" sakhtim {name:name, room :room}
 		clientInfo[socket.id] = req;
		//socket.join 1 built in metho hast ke be socket mige ta in socket ro be rome khasi vasl kune
		socket.join(req.room);

		//payami ro be hame juz karbar midim.to = ersal be roome khasi 
		socket.broadcast.to(req.room).emit('message',{
			name : 'system',
			text : req.name + ' has joined',
			timeStamp : moment().valueOf()
		});
	});

	//mikham payam ha ro vase hame befrestim
	//message = esme event,function = callback
	//message(narenji/daron function) object hast
	//in bakhsh montazere event mimone va on ro be tamame connection ha emit mikne
	//in bakhsh dar SERVER log mikune faghat
	socket.on('message', function (message){
		console.log('Message recieved :' + message.text);

		//value of timestamp e JS ro barmigardone
		message.timestamp = moment().valueOf();


		//in bakhsh baraye CLIENT emit mikune nabashe payam ha send neishan
		//io.emit = baraye khode ersal kunande ham mire
		//socket.broadcast.emit('message', message)
		//payam tanha be afradi ke to roome shuma hastand ersal mishe
		io.to(clientInfo[socket.id].room).emit('message', message);
	});

	//objecte so socket va methode emit ke 1 event ro emit mikune
	//emit 1 argoman migire 1:esme event(harchi ke mikhaim) 2:data ke mifrestim.1 argoman inja mitonim estedae kunim
	//pas behtare OBJECT be kar bebarim
	//in bakhsh ro dar DEV CONSOLE bezarim payam ro mifreste

	socket.emit('message', {
		name : 'System ',
		text :'Welcome to the chat application!',
		timestamp: moment().valueOf()
	});

});

http.listen(PORT, function(){
	console.log('server started');
});