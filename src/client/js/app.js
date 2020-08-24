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
        }, 2000);

        // user information
        let city = document.getElementById('city').value;
        let startDate = document.getElementById('startDate').value;
        let endDate = document.getElementById('endDate').value;
        // main app data storage
        appStorage.city = city;

        // get image from api and post it to server
        getImage(city)
            .then(data => {
                let image = data.hits[0].pageURL
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
                setTimeout(() => {
                    postData('/appStorage', { city: appStorage.city, image: appStorage.image, temp: appStorage.temp });
                }, 2000)
            })
        setTimeout(() => {
            console.log(appStorage)
        }, 2000)
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
let getWeather = async (lat, lon, startDate) => {
    let apiKey = 'ca3dc503fc9749e3bd5ce1859ee62e4d'
    // let url = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lon}
    // &key=${apiKey}`;
    let url = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${apiKey}`

    const response = await fetch(url);
    try {
        const receivedData = await response.json();
        appStorage.temp = receivedData.data[0].app_temp;
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

// Add end date and display length of trip.
// TODO