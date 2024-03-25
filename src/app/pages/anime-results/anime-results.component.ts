import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-anime-results',
  templateUrl: './anime-results.component.html',
  styleUrl: './anime-results.component.css'
})
export class AnimeResultsComponent implements OnInit {
  searchQuery: string = '';
  searchResults: any[] = [];

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    // Obtener el parámetro de búsqueda de la URL
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['query'];
      // Realizar la búsqueda con el parámetro de búsqueda recibido
      this.searchAnime();
    });
  }

  searchAnime() {
    this.apiService.searchAnimeByName(this.searchQuery).subscribe(
      (data: any) => {
        this.searchResults = data.data; // Asignar los resultados de la búsqueda a la propiedad searchResults
      },
      (error) => {
        console.log('Error searching anime:', error);
      }
    );
  }
}
