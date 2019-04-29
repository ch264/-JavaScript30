
window.addEventListener('keyup', function(e) {
	const audio = document.querySelector(`audio[data-key="${e.keykode}"]`);

	console.log(audio)
});