import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// shared
import { FiltersService } from '../shared/filters.service';
import { MoviesService } from '../shared/movies.service';

// components
import { FiltersComponent } from '../components/filters/filters';
import { MoviesListComponent } from '../components/movies-list/movies-list';
import { MovieComponent } from '../components/movie/movie';
import { SearchBarComponent } from '../components/search-bar/search-bar';
import { TabsMovieComponent } from '../components/tabs-movie/tabs-movie';

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
    TabsMovieComponent
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
    TabsMovieComponent
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FiltersService,
    MoviesService
  ]
})
export class AppModule {}
