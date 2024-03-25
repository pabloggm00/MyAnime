import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  searchQuery: string = '';
  placeholder: string = 'Search by name...';


  constructor(private router: Router) {}

  searchAnime() {
    // Navegar a la página de resultados con el parámetro de búsqueda
    this.router.navigate(['/anime-results'], { queryParams: { query: this.searchQuery } });
    this.searchQuery = '';
  }


}
