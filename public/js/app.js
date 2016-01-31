
	//vasl shudan be server.
		//io dar inja function hast va tavasote ma ijad nashude.
		//vaghti library socket io ro load kardim define shud.
var socket = io();

//vaghti be server vasl shudim dar developer tools console mikunim
//parametre aval esme event parametre  function i ke mikhaim rokh bede
socket.on('connect', function(){
console.log('msg from FronEnd : User connected');
});