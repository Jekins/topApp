import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MoviesService } from '../../shared/movies.service';

@Component({
  selector: 'page-movies',
  templateUrl: 'movies.html'
})
export class MoviesPage {

  movies: Object[];
  searchShowen: boolean = false;
  xfields: string;
  params: Object;
  thisIsAll: string = '';
  pageTitle: string = '';

  category: string;
  offset: number = 0;
  rows: number = 30;
  title: string;
  years: string[];
  genres: string[];
  rating: number;
  sorts: string = 'date';
  quality: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private moviesService: MoviesService
  ) {}

  ionViewDidLoad() {
    this.pageTitle = this.navParams.get('title');
    this.category = this.navParams.get('category');

    this.goMovies();
  }

  goMovies() {
    this.moviesService.getMovies(
      this.category,
      this.offset,
      this.rows,
      this.title,
      this.years,
      this.genres,
      this.rating,
      this.sorts,
      this.quality
    ).subscribe(data => {
      if (!this.movies) {
        this.movies = data;
      } else {
        this.movies = this.movies.concat(data);
      }

      this.offset = this.movies.length + 1;

      if (data.length == 0) {
        this.thisIsAll = 'Это все результаты';
      } else {
        this.thisIsAll = '';
      }
     });
  }

  doInfinite(infiniteScroll) {
    if (this.thisIsAll == '') {
      setTimeout(() => {
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
      this.pageTitle = '';
      this.goMovies();
    }

    this.searchShowen = !this.searchShowen;
  }

  onSearch(ev: string) {
    this.resetListMovies();
    this.pageTitle = ev;
    this.category = '19|3|15|16';
    this.goMovies();
  }

  resetListMovies() {
    this.movies = [];
    this.offset = 0;
  }

  onFilters(filter: any) {
    this.resetListMovies();

    this.offset = 0;
    this.years = filter.years; 
    this.genres = filter.genres;
    this.rating = filter.rating;
    this.sorts = filter.sorts;
    this.quality = filter.quality;

    this.goMovies();
  }

}
