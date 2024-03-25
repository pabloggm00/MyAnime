import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { AnimeDetailsComponent } from './pages/anime-details/anime-details.component';
import { AnimeListComponent } from './pages/anime-list/anime-list.component';
import { AnimeResultsComponent } from './pages/anime-results/anime-results.component';

const routes: Routes = [
  { path: 'home', component: HomepageComponent },
  { path: 'anime-details', component: AnimeDetailsComponent },
  { path: 'anime-list', component: AnimeListComponent },
  { path: 'anime-results', component: AnimeResultsComponent },
  { path: '**', pathMatch:'full', redirectTo: 'home' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
