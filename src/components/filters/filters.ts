import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Filter } from '../../shared/filter.mock';
import { FilterData } from '../../shared/filter.data';

@Component({
  selector: 'filters',
  templateUrl: 'filters.html'
})
export class FiltersComponent {
  @Input() afterSearch: Filter[];
  @Output() getFiltering = new EventEmitter();

  constructor(
    public filterData: FilterData
  ) {
  }

  filters = this.filterData.filter;

  sorts = this.filters.sorts[0]['val'];

  submitted: boolean = false;

  onSubmit(ev: any) {
    this.submitted = true;
    this.getFiltering.emit(ev);
  }

}
