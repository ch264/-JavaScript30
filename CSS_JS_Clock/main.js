
const secondHand = document.querySelector('.second')
const minuteHand = document.querySelector('.minute');
const hourHand = document.querySelector('.hour')

function setDate() {
	const now = new Date();

	// gets seconds of current minute
	const seconds = now.getSeconds();
	// caclulates degree angle and offsets default 90 degrees
	const secondsDegrees = ((seconds / 60) * 360) + 90
	secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

	const minutes = now.getMinutes();
	const minDegrees = ((minutes / 60) * 360) + 90 ;
	minuteHand.style.transform = `rotate(${minDegrees}deg)`;

	const hour = now.getHours();
	const hourDegrees = ((hour / 12) * 360) +((minutes / 60 ) * 30) + 90 ;
	hourHand.style.transform = `rotate(${hourDegrees}deg)`;
}


setInterval(setDate, 1000);

setDate();