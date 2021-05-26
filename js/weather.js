class Weather {
    constructor(){
        this.darkSkyAPIKey = '273e76ab5fb2d5fc7df163ebc7df94d3'
        this.locationIqAPIKey = '9eba45a057297c'
        this.city = city;
        this.state = state;
        this.longitude;
        this.latitude;
    }

    changeLocation(city, state){
        this.city = city;
        this.state = state;
    }

    async getCoordinates(city, state){

        // console.log(`${city}, ${state}`);
        const coordinateReponse = await fetch(`https://us1.locationiq.com/v1/search.php?key=${this.locationIqAPIKey}&city=${city}&state=${state}&format=json`);
        const coordinates = await coordinateReponse.json();

        // console.log(coordinates);
        

        return{
            longitude: coordinates[0].lon,
            latitude: coordinates[0].lat
        }

    }

    async getWeather(){


        // Get the coordinates for the location
        await this.getCoordinates(this.city, this.state).then(location => {

            // console.log(`Getting coordinates for ${this.city}, ${this.state}`);
            
            this.latitude = location.latitude;
            this.longitude = location.longitude;
        });
        
        //const proxy = 'https://cors-anywhere.herokuapp.com/'; //Bypassing CORS error by using a proxy
        //Replaced cors anywhere proxy demo url with heroku hosted proxy
        const proxy = "https://arcane-badlands-53766.herokuapp.com/";
        const apiUrl = `https://api.darksky.net/forecast/${this.darkSkyAPIKey}/${this.latitude},${this.longitude}`;
        // console.log(`${proxy}${apiUrl}`);
        const reponse = await fetch(`${proxy}${apiUrl}`);
        const weatherStats = await reponse.json();
        // console.log(weatherStats);
        return weatherStats;
    }
}