import { Component, OnInit , Input, Output, EventEmitter } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Filter } from '../../shared/filter.mock';
import { FilterData } from '../../shared/filter.data';
import { FilterService } from '../../shared/filter.service';

@Component({
  selector: 'filters',
  templateUrl: 'filters.html'
})
export class FiltersComponent implements OnInit {
  @Input() afterSearch: Filter[];
  @Output() filterGo = new EventEmitter();

  constructor(
    public navParams: NavParams,
    public filterData: FilterData,
    public filterService: FilterService
  ) {
  }

  model = this.filterService.getFilter();
  filter = this.filterData.filter;

  years = this.filter.years;
  genres = this.filter.genres;
  sorts = this.filter.sorts;

  ngOnInit() {
    this.model.rating = 0;
    this.model.sorts = this.sorts[0]['val'];
    this.model.quality = false;

    this.onSubmit();
  }

  onSubmit() {
    this.model.offset = 0;
    this.model.title = undefined;
    this.model.category = this.navParams.get('category');
    this.filterGo.emit(this.model);
  }

}
