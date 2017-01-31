import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// shared
import { FilterData } from '../shared/filter.data';
import { BackendService } from '../shared/backend.service';
import { MoviesService } from '../shared/movies.service';
import { FilterService } from '../shared/filter.service';

// components
import { FiltersComponent } from '../components/filters/filters';
import { MoviesListComponent } from '../components/movies-list/movies-list';
import { MovieComponent } from '../components/movie/movie';
import { SearchBarComponent } from '../components/search-bar/search-bar';
import { SeasonsComponent } from '../components/seasons/seasons';

// pages
import { HomePage } from '../pages/home/home';
import { MoviesPage } from '../pages/movies/movies';
import { MoviePage } from '../pages/movie/movie';

@NgModule({
  declarations: [
    MyApp,
    MoviesListComponent,
    MovieComponent,
    SearchBarComponent, 
    MoviesPage,
    HomePage,
    FiltersComponent,
    MoviePage,
    SeasonsComponent
  ],
  imports: [
    FormsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MoviesListComponent,
    MovieComponent,
    SearchBarComponent,
    MoviesPage,
    HomePage,
    FiltersComponent,
    MoviePage,
    SeasonsComponent
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FilterData,
    BackendService,
    MoviesService,
    FilterService
  ]
})
export class AppModule {}
