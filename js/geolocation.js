class Geolocation{

    constructor(){

        this.locationIqAPIKey = '9eba45a057297c'
        this.latitude = 'defaultValue';
        this.longitude = 'defaultValue';

        this.getLocalCoordinates();
    }


     getLocalCoordinates() {

        return new Promise((resolve, reject) =>{

            navigator.geolocation.getCurrentPosition(resolve, reject);
        });      
    }

    async getCityByCoordinates(latitude, longitude){        

        const url = `https://us1.locationiq.com/v1/reverse.php?key=${this.locationIqAPIKey}&lat=${latitude}&lon=${longitude}&format=json`
        const locationResponse = await fetch(url);
        const location = await locationResponse.json(); 
        // console.log(url);
        // console.log(location);     

        return {

            city: location.address.city,
            state: location.address.state
        }
        
    }

}