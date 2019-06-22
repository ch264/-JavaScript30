const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');

const ctx = canvas.getContext('2d');

const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');


function getVideo() {
	navigator.mediaDevices.getUserMedia({ video: true, audio: false}).then(localMediaStream => {
		// console.log(localMediaStream);
		// convert object into URL
		// video.src = window.URL.createObjectURL(localMediaStream);
		video.srcObject = localMediaStream;
		video.play();
	}).catch(err => {
		console.error('error here, turn webcam on', err)
	});
}

function paintToCanvas() {
	const width = video.videoWidth;
	const height = video.videoHeight;
	canvas.width = width;
	canvas.height = height;

	// take image from webcam and set to canvas, starting at top left hand cornerand paint width and height. return the interval so that you have access to it and you can stop it from paining.
	return setInterval(() => {
		ctx.drawImage(video, 0, 0, width, height)
	}, 16);
}

// audio when taking a picture
function takePhoto() {
	snap.currentTime = 0;
	snap.play();
	// take data out of the canvas
	const data = canvas.toDataURL('image/jpeg');
	const link = document.createElement('a');
	link.href = data;
	link.setAttribute('download', 'handsome');
	// link.textContent = 'Download Image';
	link.innerHTML = `<img src="${data}" alt="handsome" />`
	strip.insertBefore(link, strip.firstChild);
}

getVideo();

// once the video is played, it will emit an event called canplay, which in turn canvas takes to paintToCanvas
video.addEventListener('canplay', paintToCanvas)