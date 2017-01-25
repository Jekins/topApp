import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Filter } from '../../shared/filter.mock';
import { BackendService } from '../../shared/backend.service';
import { FilterData } from '../../shared/filter.data';

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
    private backendService: BackendService,
    private filterData: FilterData,
    public loadingCtrl: LoadingController
  ) {
    this.pageTitle = this.navParams.get('title');
    this.pageCategory = this.navParams.get('category');

    this.resetListMovies();
    this.goMovies();
  }

  goMovies() {
    // this.toggleLoading();

    this.backendService.getData(this.newFilter, 'movies').subscribe(data => {

      if (!this.movies) {
        this.movies = data;
      } else {
        this.movies = this.movies.concat(data);
      }

      
      if (data.length < this.filterData.filter.rows) {
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
        // console.log(this.fromFilter);
        this.newFilter = this.fromFilter;
        this.newFilter.offset = this.filterData.filter.offset;
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
      this.newFilter.sorts = this.filterData.filter.sorts[3]['val'];
  
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
    this.newFilter.sorts = this.filterData.filter.sorts[0]['val'];
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
