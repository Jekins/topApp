import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FilterService } from '../../shared/filter.service';

@Component({
  selector: 'search-bar',
  templateUrl: 'search-bar.html'
})
export class SearchBarComponent {
  // @Input() toggleSearch: boolean;
  @Output() searchMovies = new EventEmitter();
  @ViewChild('searchInput') input;

  searchQuery: string = '';

  constructor(
    private filterService: FilterService
  ) {
    // if (this.toggleSearch) {
    //   this.input.focus();
    // }
  }

  onSearching(ev: any) {
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
  }

}
