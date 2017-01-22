import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { MoviesService } from '../../shared/movies.service';
import { Filter } from '../../shared/filter.mock';
import { FiltersService } from '../../shared/filters.service';

@Component({
  selector: 'page-movies',
  templateUrl: 'movies.html'
})
export class MoviesPage {

  newFilter = new Filter();
  fromFilter: Filter;

  movies: Object[];
  searchShowen: boolean = false;
  filtersUsed: boolean = false;
  loadingShowen: boolean = false;
  xfields: string;
  thisIsAll: string;
  pageTitle: string;
  pageCategory: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private moviesService: MoviesService,
    private filtersService: FiltersService,
    public loadingCtrl: LoadingController
  ) {
    this.pageTitle = this.navParams.get('title');
    this.pageCategory = this.navParams.get('category');

    this.resetListMovies();
    this.goMovies();
  }

  goMovies() {
    // this.toggleLoading();

    this.moviesService.getMovies(this.newFilter).subscribe(data => {

      if (!this.movies) {
        this.movies = data;
      } else {
        this.movies = this.movies.concat(data);
      }

      
      if (data.length < this.filtersService.filters.rows) {
        this.thisIsAll = 'Это все результаты';
      } else {
        this.thisIsAll = '';
      }
    });
  }

  doInfinite(infiniteScroll) {
    if (this.thisIsAll == '') {
      setTimeout(() => {
        
        this.newFilter.offset = this.movies.length + 1;
        this.goMovies();
  
        infiniteScroll.complete();
      }, 500);
    } else {
      infiniteScroll.complete();
    }
  }

  toggleSearch() {
    if (this.searchShowen) {
      this.resetListMovies();
      if (this.filtersUsed) {
        this.newFilter = this.fromFilter;
      }
      this.goMovies();
    }

    this.searchShowen = !this.searchShowen;
  }

  onSearch(ev: string) {
    this.resetListMovies();

    if (ev) {
      this.newFilter.category = undefined;
      this.newFilter.title = ev;
      this.newFilter.sorts = this.filtersService.filters.sorts[3].val;
  
      this.goMovies();
    }
  }

  onFilters(filter: Filter[]) {
    this.resetListMovies();
    
    this.newFilter = Object.assign(this.newFilter, filter);
    this.fromFilter = this.newFilter;
    this.filtersUsed = !this.filtersUsed;

    this.goMovies();
  }

  resetListMovies() {
    this.movies = [];
    this.newFilter = new Filter();
    this.newFilter.category = this.navParams.get('category');
    this.newFilter.sorts = this.filtersService.filters.sorts[0].val;
  }

  toggleLoading() {
    if (this.loadingShowen) {
      this.loadingCtrl.create({
      }).dismiss();
    } else {

      this.loadingCtrl.create({
        content: 'Снимаем фильмы...',
        // duration: 3000,
        dismissOnPageChange: true
      }).present();
    }
  }

}
