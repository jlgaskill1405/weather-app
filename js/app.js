const weather = new Weather();
const ui = new UI();
const geoLocation = new Geolocation();


document.addEventListener('DOMContentLoaded', getInitialWeather);

// Change location event
document.getElementById('w-change-btn').addEventListener('click', (e) =>{
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;

    weather.changeLocation(city, state);

    getWeather();

    // close modal
    $('#locModal').modal('hide');
});


function getInitialWeather(){

    fetchCoords().then(async (position) => {

        if (typeof position != 'undefined') {

            const location = await geoLocation.getCityByCoordinates(position.latitude, position.longitude);
            // console.log(location);

            weather.changeLocation(location.city, location.state);

            getWeather();

        }
    });

}

// const fetchCoords = async() => {
async function fetchCoords() {

    try{

        const {coords} = await geoLocation.getLocalCoordinates();
        return {latitude, longitude} = coords;

    }catch(error){

        console.error(error);
    }

}

function getWeather(){

    weather.getWeather()
        .then(results => {

            ui.displayResults(results, weather.city, weather.state);
        })
        .catch(error => { console.log(error) });

}





