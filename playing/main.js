// query selector all returns node list, looks like array but its not. therefore you cannot run methods on this return. you can convert nodelist to array
const inputs = document.querySelectorAll('.controls input')

// loops over node list
function handleUpdate() {
	console.log('in function');
	// data will take any data you add and make an object for you
	const suffix = this.dataset.sizing || '';
	// this.name replaces the variable name (base or blur or color) and set to value, plus suffix to add pixels
	document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}


inputs.forEach(input => input.addEventListener('change', handleUpdate));
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));
inputs.forEach(input => input.addEventListener('hover', handleUpdate));

console.log('end')