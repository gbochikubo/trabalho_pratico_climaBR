import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { City } from 'src/domain/entities/city';
import { SearchCityService } from 'src/domain/services/search-city.service';
import { GeolocalizationSearch } from 'src/domain/services/geolocalization';
import * as haversine from 'haversine-distance'
import { LocalCityRepository } from 'src/data/local-city-repository';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  cities: City[];
  hasError: boolean = false;
  errorMessage: string;

  constructor(
    private readonly searchService: SearchCityService,
    private readonly localCityRepository: LocalCityRepository,
    private readonly geolocalizationSearch: GeolocalizationSearch,
    private readonly router: Router
  ) {}

  async onSearch(query: string) {
    try {
      this.hasError = false;
      this.cities = await this.searchService.search(query);
    } catch (error) {
      this.hasError = true;
      this.errorMessage = error.message;
    }
  }

  onSelectCity(cityId: string) {
    this.router.navigateByUrl(`/weather/${cityId}`);
  }

  async buscaLocalizacao(){
    var coordenadas: any = await this.geolocalizationSearch.buscaGeolocalizacao();
    var minhaLocalizacao = {latitude: coordenadas.latitude, longitude:coordenadas.longitude};
    var cidades: any = await this.localCityRepository.getAll().then((e)=>{
        return e.map((cidade) => {
          return {
          id: cidade.id,
          longitude: cidade.coord.longitude,
          latitude: cidade.coord.latitude
          }
        });
    });

    var menorValor = haversine(minhaLocalizacao,cidades[0]);
    var idCidade = cidades[0].id;
    cidades.forEach(cidade => {
      const haversineValue = haversine(minhaLocalizacao,cidade);
      if(haversineValue < menorValor){
        menorValor = haversineValue;
        idCidade = cidade.id;
      }
    });

    this.cities = [await this.localCityRepository.getById(idCidade)];
  }
}
