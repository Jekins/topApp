import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-movie',
  templateUrl: 'movie.html'
})
export class MoviePage {

  movie: any;
  xfields: any;
  movieInfo = 'params';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.movie = navParams.get('movie');
    this.xfields = navParams.get('xfields');
  }

  getBg() {
    let bg = 'background-image: url(http://topkino.tv/uploads/posts/posters/iphone360_' + this.movie.id + '.jpg)';
    return bg
  }

}