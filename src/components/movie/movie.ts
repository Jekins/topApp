import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MoviePage } from '../../pages/movie/movie';

@Component({
  selector: 'movie',
  templateUrl: 'movie.html'
})
export class MovieComponent {
  @Input() movie: Array<Object>;
  @Input('xfields') xfields: Object;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
  ) {
  }

  getMore(movie: Object, xfields: Object) {
    console.log(xfields);
    this.navCtrl.push(MoviePage, {
      movie: movie,
      xfields: xfields
    });
  }
}
