import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-anime-details',
  templateUrl: './anime-details.component.html',
  styleUrl: './anime-details.component.css'
})
export class AnimeDetailsComponent implements OnInit{

  animeId: string = "";
  animeDetails: any = {};
  studio: string = "";
  animeRecomendations: any[] = [];
  animes: any[] = [];

  // Comprobaremos si la url es segura
  trailerUrl: SafeResourceUrl | undefined;

  constructor(private route: ActivatedRoute, private apiService: ApiService, private sanitizer: DomSanitizer){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if(this.animeId != null){
        
        this.animeId = params.get('id')!;
      }
      this.fetchAnimeDetails();
      this.fetchAnimeRecommendation();

    });

  
  }

  fetchAnimeDetails(){
    this.apiService.getAnimeById(this.animeId).subscribe(
      (data) => {
      this.animeDetails = data.data;

      // Verifica si hay un trailer y marca la URL como segura si existe. NO FUNCIONA Y SIGUE DANDO ERROR
      /*if (this.animeDetails && this.animeDetails.trailer && this.animeDetails.trailer.embed_url) {
        console.log(this.animeDetails.trailer.embed_url);
        this.trailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.animeDetails.trailer.embed_url);
      }*/


      console.log(this.animeDetails);
      },
      (error) => {
        console.log("Error: ", error);
      }
      )
  }

  fetchAnimeRecommendation(){
    this.apiService.getAnimeByIdRecommendation(this.animeId).subscribe(
      (data) => {
      this.animeRecomendations = data.data.slice(0,5);

      /*for(let i = 0; i < 5; i++){
        const recommendation = this.animeRecomendations[i];
        const malId = recommendation.entry.mal_id;

        this.apiService.getAnimeById(malId).subscribe(
          (animeData) => {
          const anime = animeData.data;

          this.animes.push(anime);
          console.log("Se ha agregado: " + anime);
          },
          (error) => {
            console.log("Error: ", error);
          }
          )
      }*/

      
      },
      (error) => {
        console.log("Error: ", error);
      }
      )
  }


  getAnimeRecommendationById(id:string): any{
    console.log(this.animes.find(anime => anime.id === id));
    return this.animes.find(anime => anime.id === id);
  }

  getStudioNames(): string {
    if (this.animeDetails && this.animeDetails.studios) {
      return this.animeDetails.studios.map((studio: { name: any; }) => studio.name).join(', ');
    }
    return ''; // Si no hay estudios, devuelve una cadena vacía
  }

  getGenres(): string {
    if (this.animeDetails && this.animeDetails.genres) {
      return this.animeDetails.genres.map((genres: { name: any; }) => genres.name).join(', ');
    }
    return ''; // Si no hay estudios, devuelve una cadena vacía
  }

  getThemes(): string {
    if (this.animeDetails && this.animeDetails.themes) {
      return this.animeDetails.themes.map((themes: { name: any; }) => themes.name).join(', ');
    }
    return ''; // Si no hay estudios, devuelve una cadena vacía
  }

  getAiredDate(): string {
    if (this.animeDetails && this.animeDetails.aired) {
      const from = new Date(this.animeDetails.aired.from).toLocaleDateString('es-ES', {day: 'numeric', month: 'short', year: 'numeric' });
      const to = new Date(this.animeDetails.aired.to).toLocaleDateString('es-ES', {day: 'numeric', month: 'short',  year: 'numeric' });
      return `${from} to ${to}`;
    }
    return ''; // Retorna una cadena vacía si animeDetails o animeDetails.aired es null o undefined
  }
  
}
