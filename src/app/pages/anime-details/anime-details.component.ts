import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-anime-details',
  templateUrl: './anime-details.component.html',
  styleUrl: './anime-details.component.css'
})
export class AnimeDetailsComponent implements OnInit{

  animeId: number = 1;
  animeDetails: any;

  constructor(private route: ActivatedRoute, private apiService: ApiService){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.animeId = params['id'];
      this.fetchAnimeDetails();
    });

    this.fetchGetNaruto();
  }

  fetchAnimeDetails(){
    this.apiService.getAnimeById(1).subscribe(
      (data) => {
      this.animeDetails = data;
      console.log(this.animeDetails)
      },
      (error) => {
        console.log("Error JAJJ: ", error);
      }
      )
  }

  fetchGetNaruto(){
    this.apiService.getNaruto().subscribe(
      (data) => {
      this.animeDetails = data;
      console.log(this.animeDetails)
      },
      (error) => {
        console.log("Error JAJJ: ", error);
      }
      )
  }
  
}
