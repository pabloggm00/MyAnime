import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-anime-list',
  templateUrl: './anime-list.component.html',
  styleUrl: './anime-list.component.css'
})
export class AnimeListComponent implements OnInit{

  animes: any[] = [];
  query: string = ''; // Variable para almacenar la consulta de búsqueda
  currentPage: number = 1; // Variable para almacenar el número de página actual
  totalPages: number = 0;
  statusSelected: string = 'complete';


  constructor(private apiService: ApiService){}

  ngOnInit(): void {
    this.fetchAnimes();
  }

  fetchAnimes() {
    
    
    this.getAnimes(this.statusSelected, true);
    
  }

  getAnimes(status: string, isNewStatus: boolean){
    this.statusSelected = status;

    //Para poder movernos desde distintos status sin importar en la página donde estemos
    if (isNewStatus){
      this.currentPage = 1;
    }
   
    this.apiService.getAnimesStatus(status ,this.query, this.currentPage, 20).subscribe(
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
