
const secondHand = document.querySelector('.second')
const minuteHand = document.querySelector('.minutes');
const hourHand = document.querySelector('.hour')

function setDate() {
	const now = new Date();

	// gets seconds of current minute
	const seconds = now.getSeconds();
	// caclulates degree angle and offsets default 90 degrees
	const secondsDegrees = (seconds / 60) * 360 + 90
	secondHand.style.transform = `rotate(${secondsDegrees})`;

	const minutes = now.getMinutes();
	const minDegrees = (minutes / 60) * 360 + 90 ;
	minuteHand.style.transform = `rotate(${minDegrees})`;
}


setInterval(setDate, 1000);