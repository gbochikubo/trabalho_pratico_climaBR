import { Geolocation } from '@ionic-native/geolocation';

export class GeolocalizationSearch {

  constructor(private geolocation: Geolocation) {}
    
    async buscaGeolocalizacao(){
       return this.geolocation.getCurrentPosition().then((resp) => {
            // resp.coords.latitude
            return resp.coords;
            // resp.coords.longitude
           }).catch((error) => {
             console.log('Error getting location', error);
           });
    }
}



