import { Component } from '@angular/core';

/*
  Generated class for the Movie component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'movie',
  templateUrl: 'movie.html'
})
export class MovieComponent {

  text: string;

  constructor() {
    console.log('Hello Movie Component');
    this.text = 'Hello World';
  }

}
