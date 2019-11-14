const weather = new Weather('Pearland', 'TX');
const ui = new UI();

weather.getWeather()
    .then(results => {

        ui.displayResults(results, weather.city, weather.state);
    })
    .catch(error => {console.log(error)});