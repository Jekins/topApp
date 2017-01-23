import { Component, Output, EventEmitter } from '@angular/core';
import { FiltersService } from '../../shared/filters.service';

@Component({
  selector: 'filters',
  templateUrl: 'filters.html'
})
export class FiltersComponent {
  @Output() getFiltering = new EventEmitter();

  constructor(
    public filtersService: FiltersService
  ) {
  }

  filters = this.filtersService.filters;

  sorts = this.filters.sorts[0].val;

  submitted: boolean = false;

  onSubmit(ev: any) {
    this.submitted = true;
    this.getFiltering.emit(ev);
  }

}
