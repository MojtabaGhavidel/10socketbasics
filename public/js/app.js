var name = getQueryVariable('name') || 'Nashenas ';
var room =  getQueryVariable('room');
	//vasl shudan be server.
		//io dar inja function hast va tavasote ma ijad nashude.
		//vaghti library socket io ro load kardim define shud.
var socket = io();

console.log(name + ' joined room : ' +room);

//UPDATE  H1 TAG
 jQuery('.room-title').text(room);



//vaghti be server vasl shudim dar developer tools console mikunim
//parametre aval esme event parametre  function i ke mikhaim rokh bede
//function inja CALL BACK be hesab miad.
socket.on('connect', function(){
	console.log('msg from FronEnd : User connected');
	//'joinRoom' ro khudemon neveshtim.special nist
	//bade 	joinRoom 1 object misazim {}
	//darkhast etesal be roomi ke karbar entekhab karde
	socket.emit('joinRoom',{
		name : name,
		room : room
	});

});

//tabE call back data ro migire ke dar inja 'message' object hast dar server.js sakhte shude
//dar inja frontEnd muntazere event hast va vaghti rokh mide on ro migire va print mikune
//har bar ke messag i miyad ejra mishe
socket.on('message', function (message){

	var momentTimestamp = moment.utc(message.timestamp);
	//.messageSSSS kelase div dar index hast
	var $message = jQuery('.messages');

	console.log('New message:');
	console.log(message.text); 

	//ezafe kardane payame jadid be html
	$message.append('<p><strong>' + message.name + momentTimestamp.local().format('h mm:a')  + '</strong></p>');
	$message.append('<p>' + message.text  + '</p>');

});

//Handles submiting of new message 
//(in bakhsh daryaft va ersal payam ro az tarigh form anjam mide)<<<<<<<
//dalile gozashtane alamate $ in hast ke vegim in motaghyer 1morede JQ ro dar khodesh dare.yani be methodhaye JQ dastresi dare
var $form = jQuery('#message-form');

$form.on('submit', function (event) {
	//baraye raveshe sabte foorm hast va az refresh safhe jelo giri mikune
	event.preventDefault();

	//ersale payam be server.noE event = message
	socket.emit('message', {

		//esme kenare payam.name 2vom moteghayer hast
		name : name,

		//.val = method
		text: $form.find('#text-box').val()

	});
			///matne dakhele text ro pak kun
			$('#text-box').val('');
			$('#text-box').disabled = true;



});