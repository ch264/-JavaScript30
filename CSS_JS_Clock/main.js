
const secondHand = document.querySelector('.second')

function setDate() {
	const now = new Date();
	// gets seconds of current minute
	const seconds = now.getSeconds();
	// caclulates degree angle and offsets default 90 degrees
	const secondsDegrees = (seconds / 60) * 360 + 90
	secondHand.style.transform = `rotate(${secondsDegrees})`;
}

setInterval(setDate, 1000);