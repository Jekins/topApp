import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Filter } from '../../shared/filter.mock';
import { FilterData } from '../../shared/filter.data';
import { BackendService } from '../../shared/backend.service';
import { MoviesService } from '../../shared/movies.service';
import { FilterService } from '../../shared/filter.service';
import { LoadingService } from '../../shared/loading.service';

@Component({
  selector: 'page-movies',
  templateUrl: 'movies.html'
})
export class MoviesPage {

  movies: string[];
  searchShowen: boolean = false;
  thisIsAll: string;
  pageTitle: string;

  constructor(
    public navParams: NavParams,
    private backendService: BackendService,
    private moviesService: MoviesService,
    private filterService: FilterService,
    private filterData: FilterData,
    private loadingService: LoadingService
  ) {
    this.pageTitle = this.navParams.get('title');
  }

  showMovies(loading: boolean = true) {
    this.backendService.getData(this.filterService.getFilter(), 'movies', loading).subscribe(data => {
      this.movies = this.moviesService.getMovies(data);

      if (loading) {
        this.loadingService.hideLoading();
      }
		
      if (data.length < this.filterData.filter.rows) {
        this.thisIsAll = 'Это все результаты';
      } else {
        this.thisIsAll = undefined;
      }
    });
  }

  doInfinite(infiniteScroll) {
    if (!this.thisIsAll) {
      setTimeout(() => {
        this.showMovies(false);
        infiniteScroll.complete();
      }, 500);
    } else {
      infiniteScroll.complete();
    }
  }

  toggleSearch() {
    this.searchShowen = !this.searchShowen;
  }

  onSearch(title: string) {
    this.moviesService.searchMovies(title);
    this.showMovies(false);
  }

  onFilter(filter: Filter) {
    this.moviesService.resetMovies();
    this.filterService.setFilter(filter);
    this.showMovies();
  }

}
