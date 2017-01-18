import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// shared
import { MoviesService } from '../shared/movies.service';

// components
import { MoviesListComponent } from '../components/movies-list/movies-list';
import { MovieComponent } from '../components/movie/movie';
import { SearchBarComponent } from '../components/search-bar/search-bar';

// pages
import { HomePage } from '../pages/home/home';
import { MoviesPage } from '../pages/movies/movies';

@NgModule({
  declarations: [
    MyApp,
    MoviesListComponent,
    MovieComponent,
    SearchBarComponent,
    MoviesPage,
    HomePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MoviesListComponent,
    MovieComponent,
    SearchBarComponent,
    MoviesPage,
    HomePage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MoviesService
  ]
})
export class AppModule {}
