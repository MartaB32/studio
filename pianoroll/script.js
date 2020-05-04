function sample_play(sample,timeout) {
	var audio = new Audio();
	audio.src = sample.src;
	setTimeout(function() {
		audio.play();
		setTimeout(function (){sample.currentTime=0;},timeout);
		console.log(dupa[i]);
	},i*timeout);
}

var dupa = '';

function onButtonClick(character) {
	dupa = dupa + character;
	updateDisplayElement();
}

function removeByIndex(index) {
	var array = dupa.split('');
	array.splice(index, 1);
	dupa = array.join('');
}

function onRemoveButtonClick(index) {
	var index = document.getElementById("user-input").value;
	removeByIndex(index);
	updateDisplayElement();
}

function onRemoveLastButtonClick() {
	removeByIndex(dupa.length - 1);
	updateDisplayElement();
}

function updateDisplayElement() {
	document.getElementById("display-object-id").innerHTML = dupa;
}

function onDisplayButtonClick() {
	let sample = document.getElementById("kick");
	let sample1 = document.getElementById("snare");
	let sample2 = document.getElementById("hat");
	let timeout = 500;

	for (i = 0; i < dupa.length; ++i) {
		switch (dupa[i]) {
			case 'A':
				sample_play(sample,timeout);
				break;
			case 'B':
				sample_play(sample1,timeout);
				break;
			case 'C':
				sample_play(sample2,timeout);
				break;
			default:
				sample_play
		}
		
	}
}