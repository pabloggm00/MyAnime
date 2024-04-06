import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-anime-list-top',
  templateUrl: './anime-list-top.component.html',
  styleUrl: './anime-list-top.component.css'
})
export class AnimeListTopComponent {
  animes: any[] = [];
  query: string = ''; // Variable para almacenar la consulta de búsqueda
  currentPage: number = 1; // Variable para almacenar el número de página actual
  totalPages: number = 0;
  statusSelected: string = 'airing';


  constructor(private route: ActivatedRoute, private apiService: ApiService){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
        
      this.query = params.get('filter')!;
      console.log(this.query);

    this.fetchAnimes();
    })
  }

  fetchAnimes() {
    
    this.getAnimes(this.statusSelected, true);
    
    
  }

  getAnimes(filter: string, isNewStatus: boolean){
    this.statusSelected = filter;
    this.query = this.statusSelected;

    //Para poder movernos desde distintos status sin importar en la página donde estemos
    if (isNewStatus){
      this.currentPage = 1;
    }
   
    this.apiService.getAnimesTopByFilter(this.query, this.currentPage, 20).subscribe(
      (data) => {
        this.animes = data.data;
        this.totalPages = data.pagination.last_visible_page;
      },
      (error) => {
        console.log('Error fetching anime list:', error);
      }
    );
  }

  goToPage(pageNumber: number): void {
    // Verifica si el número de página está dentro de los límites y actualiza la página actual
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
      this.getAnimes(this.statusSelected, false);
      // Desplaza la ventana al principio de la página
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
