import { Component, Input, Output, EventEmitter, ViewChild} from '@angular/core';

@Component({
  selector: 'search-bar',
  templateUrl: 'search-bar.html'
})
export class SearchBarComponent {
  @Input() toggleSearch: boolean;
  @Output() searchMovies = new EventEmitter();
  @ViewChild('searchInput') input;

  searchQuery: string = '';

  constructor() {
    if (this.toggleSearch) {
      this.input.focus();
    }
  }

  getMovies(ev: any, tog) {
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
