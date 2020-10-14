let input_field = document.querySelector('.input_field');
let checkbox = document.querySelector('.checkbox');
let filter_by_length = document.querySelector('.filter_by_length');
let filter_by_substring = document.querySelector('.filter_by_substring');
let data_field = document.querySelector('.data_field');

getData = async () => {
	const res = await fetch('https://cors-anywhere.herokuapp.com/https://www.mrsoft.by/data.json');

	if (!res.ok) {
		throw new Error(`received ${res.status}`);
	}
	return await res.json();
};

getData().then((object) => {
	object.data.forEach((item) => {
		data_field.innerHTML += item + '<br>';
	});
});

filter_by_length.addEventListener('click', () => {
	let number = input_field.value;
	data_field.innerHTML = '';
	getData().then((object) => {
		object.data.forEach((item) => {
			if (item.length > number) {
				data_field.innerHTML += item + '<br>';
			}
		});
	});
});

filter_by_substring.addEventListener('click', () => {
	let flag = checkbox.checked;
	let string = input_field.value;
	data_field.innerHTML = '';
	getData().then((object) => {
		object.data.forEach((item) => {
			if (flag) {
				if (item.includes(string)) {
					data_field.innerHTML += item + '<br>';
				}
			} else {
				if (item.toLowerCase().includes(string.toLowerCase())) {
					data_field.innerHTML += item + '<br>';
				}
			}
		});
	});
});
