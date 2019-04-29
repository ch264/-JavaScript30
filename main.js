
window.addEventListener('keydown', function(e) {
	let audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
	let key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
	// stops function from running if no audio is found
	if(!audio) return;
	// rewinds audio to start
	audio.currentTime = 0;
	audio.play();
	// add class
	key.classList.add('playing');
	// remove class with transition end event

});

function removeTransition(e) {
	// skips if not transform
	if (e.propertyName !== 'transform') return;
	this.classList.remove('playing');
}

// grabs all keys
const keys = document.querySelectorAll('.key')
// loop over every key element and attach an event listener
keys.forEach(key => key.addEventListener('transitionend', removeTransition));

