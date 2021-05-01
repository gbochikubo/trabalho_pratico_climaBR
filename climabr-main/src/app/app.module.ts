import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SearchCityService } from 'src/domain/services/search-city.service';
import { LoadWeatherService } from 'src/domain/services/load-weather.service';
import { LocalCityRepository } from 'src/data/local-city-repository';
import { ApiWeatherRepository } from 'src/data/api-weather-repository';
import { StoreModule } from '@ngrx/store';
import { Geolocation } from '@ionic-native/geolocation';
import { GeolocalizationSearch } from 'src/domain/services/geolocalization';


const createSearchCityService = () => {
  return new SearchCityService(new LocalCityRepository());
};

const createLoadWeatherService = (http: HttpClient) => {
  return new LoadWeatherService(
    new LocalCityRepository(),
    new ApiWeatherRepository(http)
  );
};

const createGeolocalizationSearch= () =>{
  return new GeolocalizationSearch(new Geolocation);
}

const createLocalCityRepository= () =>{
  return new LocalCityRepository();
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({}, {})
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: SearchCityService,
      useFactory: createSearchCityService,
    },
    {
      provide: LoadWeatherService,
      useFactory: createLoadWeatherService,
      deps: [HttpClient],
    },
    {
      provide: GeolocalizationSearch,
      useFactory: createGeolocalizationSearch
    },
    {
      provide: LocalCityRepository,
      useFactory: createLocalCityRepository
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
