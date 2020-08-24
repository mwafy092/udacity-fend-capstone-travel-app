let appStorage = {};
export function travelAppFunc() {
    let btn = document.querySelector('#btn');
    let overlay = document.querySelector('#overlay');

    btn.addEventListener('click', () => {
        // add grid to display and animations
        overlay.style.display = "grid";
        overlay.classList.add('overlay-animation');

        // set display to none after 3 seconds 
        setTimeout(function () {
            overlay.style.display = "none";
        }, 3000);

        // user information
        let city = document.getElementById('city').value;
        let startDate = document.getElementById('startDate').value;
        let endDate = document.getElementById('endDate').value;
        // main app data storage
        appStorage.city = city;

        duration(startDate, endDate);
        // get image from api and post it to server
        getImage(city)
            .then(data => {
                let image = data.hits[0].largeImageURL
                // console.log(data);
                appStorage.image = image;
            })

        geoLocation(city)
            .then(data => {
                const newData = { lat: data.lat, lng: data.lng };
                return newData;
            })
            .then(cityData => {
                getWeather(cityData.lat, cityData.lng, startDate)
            })
            .then(() => {

                postData('/appStorage', { city: appStorage.city, image: appStorage.image, temp: appStorage.temp });

            })
            .then(() => {
                setTimeout(() => {
                    updateUI(startDate, endDate);
                })
            })
    });

}

// calling main function
travelAppFunc();


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
    // let url = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lon}
    // &key=${apiKey}`;
    let url = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${apiKey}`

    const response = await fetch(url);
    try {
        const receivedData = await response.json();
        appStorage.temp = receivedData.data[0].app_temp;
        document.getElementById('temperature').innerHTML = receivedData.data[0].app_temp;
        return receivedData;
    }
    catch (error) {
        console.log('error:', error);
    }

}

// pixabay api
let getImage = async (searchItem) => {
    let apiKey = '18025631-21fc69eb9242d4f0ccc554e3b'
    let url = `https://pixabay.com/api/?key=${apiKey}&q=${searchItem}&image_type=photo`;
    const response = await fetch(url);
    try {
        const data = await response.json();
        return data;
        // console.log(data);
    }
    catch (error) {
        console.log('error: ', error);
    }
}

// post data to server
const postData = async (url = '', data = {}) => {
    const request = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    try {
        const newData = await request.json();
        return newData
    }
    catch (error) {
        console.log('error', error)
    }
}
let duration = (startDate, endDate) => {
    let start = new Date(startDate);
    let end = new Date(endDate);
    let duration = Math.floor(end - start);
    let durationInDays = Math.floor(duration / (1000 * 60 * 60 * 24) + 1);
    document.getElementById('duration').innerHTML = durationInDays;
}

// get info and update UI
let updateUI = async (startDate, endDate) => {

    const response = await fetch('/serverData');
    try {
        const data = await response.json();
        document.getElementById('cityImage').innerHTML = `<img src="${data.image}" alt="city image">`;
        document.getElementById('destination').innerHTML = data.city;
        document.getElementById('stDate').innerHTML = startDate;
        document.getElementById('eDate').innerHTML = endDate;
    }
    catch (error) {
        console.log('error', error)
    }
}


