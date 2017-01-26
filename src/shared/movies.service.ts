import { Injectable } from '@angular/core';
import { FilterData } from './filter.data';
import { BackendService } from './backend.service';
import { FilterService } from './filter.service';

@Injectable()
export class MoviesService {
	movies: string[];
	filter = this.filterService.getFilter();

	constructor(
		public backendService: BackendService,
		public filterService: FilterService,
		public filterData: FilterData
	) {}

	getMovies(data: string[]) {
		if (!this.movies) {
			this.movies = data;
		} else {
			this.movies = this.movies.concat(data);
		}

		this.filter.offset = this.movies.length + 1;
		this.filterService.setFilter(this.filter);

		console.log(this.filterService.getFilter());

		return this.movies;
	}
	resetMovies() {
		this.movies = [];
	}
	searchMovies(title?: string) {
		this.resetMovies();
		this.filterService.resetFilter();
		this.filter.sorts = this.filterData.filter.sorts[3]['val'];
		title ? this.filterService.filter.title = title : undefined;
	}
}
