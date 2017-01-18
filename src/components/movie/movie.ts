import { Component, Input } from '@angular/core';

@Component({
  selector: 'movie',
  templateUrl: 'movie.html'
})
export class MovieComponent {
  @Input() movie: Array<Object>;
  @Input('xfields') xfields: Object;
}
