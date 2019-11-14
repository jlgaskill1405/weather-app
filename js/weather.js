class Weather {
    constructor(city, state){
        this.darkSkyAPIKey = '273e76ab5fb2d5fc7df163ebc7df94d3'
        this.city = city;
        this.state = state;
        this.longitude;
        this.latitude;
    }

    async getCoordinates(city, state){

        const coordinateReponse = await fetch(`https://geocode.xyz/${city},${state}?json=1`);
        const coordinates = await coordinateReponse.json();

        return{
            longitude: coordinates.longt,
            latitude: coordinates.latt
        }
    }

    async getWeather(){


        // Get the coordinates for the location
        await this.getCoordinates(this.city, this.state).then(location => {
            this.latitude = location.latitude;
            this.longitude = location.longitude;
        });
        
        const proxy = 'https://cors-anywhere.herokuapp.com/'; //Bypassing CORS error by using a proxy
        const apiUrl = `https://api.darksky.net/forecast/${this.darkSkyAPIKey}/${this.latitude},${this.longitude}`;
        console.log(`${proxy}${apiUrl}`);
        const reponse = await fetch(`${proxy}${apiUrl}`);
        const weatherStats = await reponse.json();
        console.log(weatherStats);
        return weatherStats;
    }
}