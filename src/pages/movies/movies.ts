import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Filter } from '../../shared/filter.mock';
import { FilterData } from '../../shared/filter.data';
import { BackendService } from '../../shared/backend.service';
import { MoviesService } from '../../shared/movies.service';
import { FilterService } from '../../shared/filter.service';

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
    private filterData: FilterData
  ) {
    this.pageTitle = this.navParams.get('title');
  }

  showMovies() {
    // this.moviesService.getMovies().then(function(data){
      
    //   this.movies = data;

    //   // if (data.length < this.filterData.filter.rows) {
    //   //   this.thisIsAll = 'Это все результаты';
    //   // } else {
    //   //   this.thisIsAll = undefined;
    //   // }
    // });
    this.backendService.getData(this.filterService.getFilter(), 'movies').subscribe(data => {
      this.movies = this.moviesService.getMovies(data);
		
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
        this.showMovies();
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
    this.showMovies();
  }

  onFilter(filter: Filter) {
    this.moviesService.resetMovies();
    this.filterService.setFilter(filter);
    this.showMovies();
  }

}
