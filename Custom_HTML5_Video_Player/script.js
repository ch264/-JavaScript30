// / //////////////////////////////////////////////////////////
// get elements
// / //////////////////////////////////////////////////////////
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


// / //////////////////////////////////////////////////////////
// build functions
// //////////////////////////////////////////////////////////

// play and pause the video
function togglePlay() {
	if(video.paused) {
		video.play();
		console.log('play')
	} else {
		video.pause();
		console.log('pause')
	}
}
// ternary Operator
// function togglePlay() {
// 	const method = video.paused ? 'play' : 'pause';
// 	video[method]();
// }

// change icon on play/pause button
function updateButton() {
	console.log('update Button')
	// 'this' is bound to video itself. paused is a property on the video
	const icon = this.paused ? '►' : '❚ ❚';
	// 'toggle' is the class from the button 
	toggle.textContent = icon;
}

// skip controls
function skip() {
	console.log(this.dataset.skip)
	// convert string into full number
	video.currentTime += parseFloat(this.dataset.skip)
}

// volume and speed controls
function handleRangeUpdate() {
	console.log(this.value);
	console.log(this.name);
	video[this.name] = this.value;
}

// progressbar updates
function handleProgress() {
	// how long is the video and where are we now? currentTima and duration are properties on video
	const percent = (video.currentTime / video.duration) * 100;
	// update the flexBasis Value of the progressbar in CSS with the percentage by appending style
	progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
	console.log(e)
	// offsetWidth is the entire width of the progress bar
	const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
	// then update the video runtime to where you clicked
	video.currentTime = scrubTime;
}

// / //////////////////////////////////////////////////////////
// hook eventlisteners
// / //////////////////////////////////////////////////////////

// play and pause on click on play button
toggle.addEventListener('click', togglePlay);

video.addEventListener('click', togglePlay);
// when click play, update button icon
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);


// add eventlistener to all buttons 
skipButtons.forEach(button => button.addEventListener('click', skip));

// listen to change in range setters
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate)
);
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate))

// update video with progressbar on timeupdate event
video.addEventListener('timeupdate', handleProgress);


let mousedown = false;
// moves progressbar and video runtime to same spot when clicked
progress.addEventListener('click', scrub)

// when someone moves their mouse, it checks if mousedown variable is true and if yes it moves on to scrub. pass in the event to arrow function so that the scrub function can use the event
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

