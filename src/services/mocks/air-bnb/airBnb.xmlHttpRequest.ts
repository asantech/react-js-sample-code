const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener('readystatechange', function () {
	if (this.readyState === this.DONE) {
		console.log(this.responseText);
	}
});

console.log("RAPID_API_AIR_BNB_MOCK_API_KEY",process.env.RAPID_API_AIR_BNB_MOCK_API_KEY)

xhr.open('GET', 'https://airbnb-listings.p.rapidapi.com/v2/avgPricesByLatLng?lat=28.0852473&lng=-16.7349705&year=2024&month=1&range=500&bedrooms=1&maxGuestCapacity=4&bedroomsFrom=1&bedroomsTo=4&maxGuestCapacityFrom=1&maxGuestCapacityTo=1');
xhr.setRequestHeader('x-rapidapi-key', 'f0658bf7fcmshbee59d6959fbf69p15114bjsn8f27c297d147');
xhr.setRequestHeader('x-rapidapi-host', 'airbnb-listings.p.rapidapi.com');

xhr.send(data);