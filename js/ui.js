class UI {

    constructor(){

        this.location = document.getElementById('w-location');
        this.desc = document.getElementById('w-desc');
        this.string = document.getElementById('w-string');
        this.details = document.getElementById('w-details');
        this.icon = document.getElementById('w-icon');
        this.humidity = document.getElementById('w-humidity');
        this.feelsLike = document.getElementById('w-feels-like');
        this.dewpoint = document.getElementById('w-dewpoint');
        this.wind = document.getElementById('w-wind');
        this.date = document.getElementById('w-date');
        this.forecastUl = document.getElementById('w-forecast');

    }

    displayResults(weather, city, state){
        
        this.location.textContent = `${city[0].toUpperCase() + city.slice(1).toLowerCase()}, ${state.toUpperCase()}`;
        this.desc.textContent = weather.currently.summary;
        this.string.innerHTML = `<div>${Math.round(weather.currently.temperature)}&deg;F / ${this.getCelsius(weather.currently.temperature)}&deg;C</div>`;

        this.setIcons(weather.currently.icon, this.icon);
        this.humidity.textContent = `Relative Humidity: ${weather.currently.humidity * 100}%`;
        this.feelsLike.innerHTML = `<div>Feel Like: ${Math.round(weather.currently.apparentTemperature)}&deg;F / ${this.getCelsius(weather.currently.apparentTemperature)}&deg;C</div>`;
        this.wind.textContent = `Wind: ${weather.currently.windSpeed}  mph`;
        this.dewpoint.textContent = `Dew Point: ${weather.currently.dewPoint}`;
        this.date.textContent = this.getDateFromUTC(weather.currently.time).toLocaleString();

        this.displayForecast(weather.daily.data);

    }

    getCelsius(temp){
        
        return Math.round((temp - 32) * (5/9));
    }

    setIcons(icon, iconId){
        const skycons = new Skycons({color:"white"});
        const currentIcon = icon.replace(/-/g ,"_").toUpperCase();
        skycons.play();
    
        return skycons.set(iconId, Skycons[currentIcon]);
    }

    displayForecast(forecast){

        // Make sure the forecast UL is empty before appending the forcast items
        this.forecastUl.innerHTML = '';

        forecast.forEach((day,index) =>{
            const item = document.createElement('li');
            item.classList.add("list-inline-item", "mr-2", "ml-2");

            const forecastDateTime = this.getDateFromUTC(day.time);
            item.innerHTML = `<div id="dayOfWeek" class="mb-1">${forecastDateTime.toString().split(' ')[0]}</div>
                                <canvas id="icon${index}" width="30" height="30" class="mb-1"></canvas>
                                <div id="forecast-hi">H: ${Math.round(day.temperatureHigh)}&deg;F / ${this.getCelsius(day.temperatureHigh)}&deg;C</div>
                                <div id="forecast-hi">L: ${Math.round(day.temperatureLow)}&deg;F / ${this.getCelsius(day.temperatureLow)}&deg;C</div>`;

            this.forecastUl.appendChild(item);

            this.setIcons(day.icon, `icon${index}`);

        });

    }

    getDateFromUTC(utcSeconds){

        return new Date(utcSeconds * 1000);
    }


}