
export function appFunc() {
    let btn = document.querySelector('#btn');
    let overlay = document.querySelector('#overlay');

    btn.addEventListener('click', () => {
        // add grid to display and animations
        overlay.style.display = "grid";
        overlay.classList.add('overlay-animation');

        // set display to none after 3 seconds 
        setTimeout(function () {
            overlay.style.display = "none";
        }, 2000);

        // user information
        let city = document.getElementById('city').value;
        let startDate = document.getElementById('startDate').value;
        let endDate = document.getElementById('endDate').value;
        console.log(city, startDate, endDate)
        geoLocation(city)
            .then(data => {
                const newData = { lat: data.lat, lng: data.lng };
                return newData;
            })
            .then(cityData => {
                getWeather(cityData.lat, cityData.lng)
            })
    });
}

appFunc();


// Geo names api to get location
let geoLocation = async (city) => {
    let url = `http://api.geonames.org/searchJSON?q=${city}&maxRows=10&username=mwafy092`;
    const response = await fetch(url);
    try {
        const receivedData = await response.json();
        let lat = receivedData.geonames[0].lat;
        let lng = receivedData.geonames[0].lng;
        let data = { lat, lng };
        return data;
    }
    catch (error) {
        console.log('error:', error);
    }
}

// weather api
let getWeather = async (lat, lon) => {
    let apiKey = 'ca3dc503fc9749e3bd5ce1859ee62e4d'
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lon}
    &key=${apiKey}`
    const response = await fetch(url);
    try {
        const receivedData = await response.json();
        return receivedData;
    }
    catch (error) {
        console.log('error:', error);
    }

}