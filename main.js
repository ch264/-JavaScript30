
window.addEventListener('keydown', function(e) {
	let audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
	let key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
	// stops function from running if no audio is found
	if(!audio) return;
	// rewinds audio to start
	audio.currentTime = 0;
	audio.play();
	key.classList.add('playing');
	console.log(key)
});