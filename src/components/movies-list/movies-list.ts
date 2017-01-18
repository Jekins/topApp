import { Component } from '@angular/core';
import { MoviesService } from '../../shared/movies.service';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'movies-list',
  templateUrl: 'movies-list.html'
})
export class MoviesListComponent {

  movies: Array<Object>;
  category: number = 19;
  title: string;
  xfields: string;
  params: Object;

  constructor(
    private moviesService: MoviesService,
    private navParams: NavParams
  ) {
    this.category = navParams.get('category');
    this.title = navParams.get('title');

    this.goMovies(this.category, 1);
  }

  goMovies(category :number, offset: number) {
    this.moviesService.getMovies(category, offset, 30).subscribe(data => {
      if (!this.movies) {
        this.movies = data;
        // console.log(this.movies);
      } else {
        this.movies = this.movies.concat(data);
      }
    });
  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      this.goMovies(this.category, this.movies.length + 1);

      infiniteScroll.complete();
    }, 500);
  }

  arrXfields(xfields: string) {
    let xfieldsRep = xfields.replace('iframe|', 'iframe');
    let xfieldsSrc: string[] = xfieldsRep.split('||');
    let movieXfieldsStr: string;
    let i: number;

    for (i = 0; i < xfieldsSrc.length; i++) {
      let replaceParams: string = xfieldsSrc[i].replace(/(.*)\|(.*)/g, '"$1": "$2"');
      movieXfieldsStr = movieXfieldsStr + ', ' + replaceParams;
    }
    
    let stringConv: string = "{" + movieXfieldsStr + "}";
    let undefinedRep: string = stringConv.replace('undefined, ', '');
    this.params = JSON.parse(undefinedRep);

    return this.params;
  }

}
