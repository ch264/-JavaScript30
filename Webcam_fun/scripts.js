const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');

const ctx = canvas.getContext('2d');

const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');


function getVideo() {
	navigator.mediaDevices.getUserMedia({ video: true, audio: false})
	.then(localMediaStream => {
		// console.log(localMediaStream);
		// convert object into URL
		// video.src = window.URL.createObjectURL(localMediaStream);
		video.srcObject = localMediaStream;
		video.play();
	})
	.catch(err => {
		console.error(`error here, turn webcam on`, err)
	});
}

function paintToCanvas() {
	const width = video.videoWidth;
	const height = video.videoHeight;
	canvas.width = width;
	canvas.height = height;

	// take image from webcam and set to canvas, starting at top left hand cornerand paint width and height. return the interval so that you have access to it and you can stop it from paining.
	return setInterval(() => {
		ctx.drawImage(video, 0, 0, width, height);
		// add filters and use let to reassign pixels when they are taken out of the canvas
		let pixels = ctx.getImageData(0, 0, width, height)
		
		// //mess with pixels ///////////////////////////////
		// pixels = redEffect(pixels);
		// pixels = rgbSplit(pixels);
		// ghosting effect
		// ctx.globalAlpha = 0.1;
		pixels = greenScreen(pixels);

		// put pixels back
		ctx.putImageData(pixels, 0, 0);
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

function redEffect(pixels) {
	// pixels is not an array, therefore use data.length
	for (let i = 0; i < pixels.data.length; i+=4) {
		pixels.data[i + 0] = pixels.data[i+0] + 100;  // red
		pixels.data[i + 1] = pixels.data[i+1] - 50; // green
		pixels.data[i + 2] = pixels.data[i+2] * 0.5; // blue
	}
	return pixels;
}

function rgbSplit(pixels) {
	for (let i = 0; i < pixels.data.length; i+=4) {
		pixels.data[i - 150] = pixels.data[i+0] + 100;  // red
		pixels.data[i + 100] = pixels.data[i+1] - 50; // green
		pixels.data[i - 500] = pixels.data[i+2] * 0.5; // blue
	}
	return pixels;
};

function greenScreen(pixels) {
	// holde minimum and maximum green. give me all the colors between this rgb value and take them out
	const levels = {};

	// grab every rgb input sliders
	document.querySelectorAll('.rgb input').forEach((input) => { levels[input.name] = input.value;
	});
	// loops over every single pixel
	for (i = 0; i < pixels.data.length; i = i + 4) {
		red = pixels.data[i + 0];
		green = pixels.data[i + 1];
		blue = pixels.data[i + 2];
		alpha = pixels.data[i + 3];

		// if pixels are inbetween min and max values, take it out.
		if (red >= levels.rmin
			&& green >= levels.gmin
			&& blue >= levels.bmin
			&& red <= levels.rmax
			&& green <= levels.gmax
			&& blue <= levels.bmax) {
				pixels.data[i + 3] = 0;
			}
	}
	return pixels;
}

getVideo();

// once the video is played, it will emit an event called canplay, which in turn canvas takes to paintToCanvas
video.addEventListener('canplay', paintToCanvas)