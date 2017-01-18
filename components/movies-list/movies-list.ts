import { Component } from '@angular/core';
import { MoviesService } from '../../shared/movies.service';

@Component({
  selector: 'movies-list',
  templateUrl: 'movies-list.html'
})
export class MoviesListComponent {

  movies: Array<Object>;

  constructor(
    private moviesService: MoviesService
  ) {
    this.goMovies(19, 1);
  }

  goMovies(category :number, offset: number) {
    this.moviesService.getMovies(category, offset, 30).subscribe(data => {
      if (!this.movies) {
        this.movies = data;
      } else {
        this.movies = this.movies.concat(data);
      }
    });
  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      this.goMovies(19, this.movies.length + 1);

      infiniteScroll.complete();
    }, 500);
  }

}
