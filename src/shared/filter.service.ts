import { Injectable } from '@angular/core';
import { Filter } from './filter.mock';
import { FilterData } from './filter.data';

@Injectable()
export class FilterService {
	filter = new Filter();

	constructor(
		public filterData: FilterData
	) {}

	setFilter(filter: Filter) {
		this.filter = filter;
	}
	getFilter() {
		return this.filter;
	}
	resetFilter() {
		// this.filter = new Filter();
		this.filter.category = undefined;
		this.filter.genres = undefined;
		this.filter.offset = undefined;
		this.filter.quality = undefined;
		this.filter.rating = undefined;
		this.filter.rows = undefined;
		this.filter.sorts = undefined;
		this.filter.years = undefined;
		this.filter.title = undefined;
	}
}
