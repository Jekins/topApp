import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'search-bar',
  templateUrl: 'search-bar.html'
})
export class SearchBarComponent {
  @Output() searchMovies = new EventEmitter();

  searchQuery: string = '';

  constructor() {}
  
  getMovies(ev: any) {
    if (ev != undefined) {
      let val: string = ev.target.value;
      
      if (val != undefined) {
        this.searchMovies.emit(val);
      } else {
        this.searchMovies.emit('');
      }
    }
  }

  onCancel(ev: any) {
    this.searchMovies.emit(ev);
  }

}
