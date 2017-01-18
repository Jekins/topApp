import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-movies',
  templateUrl: 'movies.html'
})
export class MoviesPage {

  title: string;
  category: number;
  searchShowen: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {}

  ionViewDidLoad() {
    this.title = this.navParams.get('title');
    this.category = this.navParams.get('category');
  }

  showSearch() {
    this.searchShowen = !this.searchShowen;
  }

}
