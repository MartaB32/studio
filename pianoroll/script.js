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

function onButtonClickA(character) {
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






frameTimeout = 500;

stopped = false;
rowsCount = 20;
instruments = 'ABC';
A = document.getElementById("kick");
B = document.getElementById("snare");
C = document.getElementById("hat");

function changeTime() {
	let value = document.getElementById("time").value;
	if (value <= 10) {
		alert('Value too low');
	} else {
		frameTimeout = value
	}
}

function playSampleInstant(sample) {
	var audio = new Audio();
	audio.src = sample.src;
	audio.play();
}

function playInstrument(instrument) {
	switch (instrument) {
		case 'A':
			playSampleInstant(A);
			break;
		case 'B':
			playSampleInstant(B);
			break;
		case 'C':
			playSampleInstant(C);
			break;
		default:
			console.log('instrument ' + instrument + ' not supported'); 
	}
}

function playFromArray() {
	stopped = false;
	playRowRecursive(0, true);
}

function stop() {
	stopped = true;
}

function clearIndicator () {
	for(let i = 0; i < rowsCount; i++) {
		document.getElementById("row" + i + "-current").checked = false;
	}
}

function moveIndicator(index) {
	clearIndicator();
	document.getElementById("row" + index + "-current").checked = true;
}

function playRowRecursive(whichRow) {
	if (whichRow >= rowsCount) {
		if(document.getElementById("loopEnabled").checked) {
			setTimeout(playRowRecursive, frameTimeout, 0);
		} else {
			clearIndicator();
			return true;
		}
	}
	
	moveIndicator(whichRow);
	
	let rowValues = getRowValues(whichRow, false);
	for(let i = 0; i < rowValues.length; i++) {
		playInstrument(rowValues[i]);
	}
	if (!stopped) {
		setTimeout(playRowRecursive, frameTimeout, whichRow + 1);
	} else {
		clearIndicator();
		stopped = false;
	}
}

function getRowValues(row, clearAfterPlay) { // row = ktora kolumna, np. 1, 4..., zwraca co tam jest zaznaczone w postaci np. 'AB', 'C', ''
	let values = '';

	for(let i = 0; i < instruments.length; i++) {
		let selected = document.getElementById("row" + row + instruments[i]);
		if (selected.checked) {
			values = values + instruments[i];
		}
		if (clearAfterPlay) {
			selected.checked = false;
		}
	}
	return values;
}