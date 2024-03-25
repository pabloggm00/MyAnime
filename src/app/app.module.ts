import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { AnimeDetailsComponent } from './pages/anime-details/anime-details.component';
import { AnimeListComponent } from './pages/anime-list/anime-list.component';
import { HttpClientModule } from '@angular/common/http';
import { AnimeResultsComponent } from './pages/anime-results/anime-results.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomepageComponent,
    AnimeDetailsComponent,
    AnimeListComponent,
    AnimeResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
