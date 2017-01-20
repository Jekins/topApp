import { Component, Output, EventEmitter } from '@angular/core';

import { Filter } from './filter';

@Component({
  selector: 'filters',
  templateUrl: 'filters.html'
})
export class FiltersComponent {
  @Output() getFiltering = new EventEmitter();
  
  rating = 0;
  years = [
    '2017',
    '2016',
    '2015',
    '2014',
    '2013',
  ];
  genres = [
    'комедия',
    'фантастика',
    'фэнтези',
    'боевик',
    'ужасы',
    'триллер',
    'мелодрама',
    'драма',
    'биография',
    'история',
  ];
  sorts = [
    {
      val: 'date',
      name: 'дате'
    },
    {
      val: 'rating',
      name: 'рейтингу'
    },
    {
      val: 'news_read',
      name: 'популярности'
    },
    {
      val: 'title',
      name: 'алфавиту'
    }
  ];

  model = new Filter(undefined, undefined, 0, "date", false);

  submitted: boolean = false;

  onSubmit(ev: any) {
    this.submitted = true;
    this.getFiltering.emit(this.model);
  }

  get diagnostic() { return JSON.stringify(this.model); }

}
