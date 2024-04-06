import { NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AnimeListService } from '../../services/anime-list.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit{

  animeDetailsLink: string = "/anime-details";
  animesTopAiring: any[] = [];
  animesTopByPopularity: any[] = [];
  animesTop: any[] = [];
  animesRecent: any[] = [];

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router, private animeListCacheService: AnimeListService){}


  ngOnInit(): void {
    this.fetchAnimesTopAiring();
    this.fetchAnimesTopByPopularity();
    this.fetchAnimesTop();
    this.fetchAnimesRecent();
  }


  //Comprobamos si tenemos en el caché la lista de animes primero para ahorrar peticiones. Así con todas.
  fetchAnimesTopAiring(){

    console.log(this.animeListCacheService.hasAnimeList('topAiring'));
    if (this.animeListCacheService.hasAnimeList('topAiring')) {

      this.animesTopAiring = this.animeListCacheService.getAnimeList('topAiring')!;
      
    } else {

      this.apiService.getAnimesTopByFilter('airing', 1, 20).subscribe(
        (topAiringData) => {
          console.log("Estoy guardando en cache");
          this.animesTopAiring = topAiringData.data
          // Guardar en caché los datos obtenidos
          this.animeListCacheService.addAnimeList('topAiring', this.animesTopAiring);
        },
        (error) => {
          console.log('Error searching top anime:', error);
        }
      )
    }
  }

  fetchAnimesTopByPopularity() {
    // Comprobamos si la lista está en caché
    if (this.animeListCacheService.hasAnimeList('topByPopularity')) {
      // Si está en caché, la recuperamos
      this.animesTopByPopularity = this.animeListCacheService.getAnimeList('topByPopularity')!;
    } else {
      // Si no está en caché, hacemos la llamada a la API
      this.apiService.getAnimesTopByFilter('bypopularity', 1, 20).subscribe(
        (topPopularityData) => {
          // Guardamos los datos obtenidos en la variable y en caché
          this.animesTopByPopularity = topPopularityData.data;
          this.animeListCacheService.addAnimeList('topByPopularity', this.animesTopByPopularity);
        },
        (error) => {
          console.log('Error searching top anime by popularity:', error);
        }
      );
    }
  }

  fetchAnimesTop() {
    // Comprobamos si la lista está en caché
    if (this.animeListCacheService.hasAnimeList('top')) {
      // Si está en caché, la recuperamos
      this.animesTop = this.animeListCacheService.getAnimeList('top')!;
    } else {
      // Si no está en caché, hacemos la llamada a la API
      this.apiService.getAnimesTopByFilter('', 1, 20).subscribe(
        (topAnimeData) => {
          // Guardamos los datos obtenidos en la variable y en caché
          this.animesTop = topAnimeData.data;
          this.animeListCacheService.addAnimeList('top', this.animesTop);
        },
        (error) => {
          console.log('Error searching top anime:', error);
        }
      );
    }
  }


  fetchAnimesRecent() {
    // Comprobamos si la lista está en caché
    if (this.animeListCacheService.hasAnimeList('recent')) {
      // Si está en caché, la recuperamos
      this.animesRecent = this.animeListCacheService.getAnimeList('recent')!;
    } else {
      // Si no está en caché, hacemos la llamada a la API
      this.apiService.getAnimesRecent().subscribe(
        (recentAnimeData) => {
          // Guardamos los datos obtenidos en la variable y en caché
          this.animesRecent = recentAnimeData.data;
          this.animeListCacheService.addAnimeList('recent', this.animesRecent);
          
        },
        (error) => {
          console.log('Error searching top anime:', error);
        }
      );
    }
  }



}
