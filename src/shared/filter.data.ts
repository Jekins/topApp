import { Injectable } from '@angular/core';

import { Filter } from './filter.mock';

@Injectable()
export class FilterData {

  filter = new Filter();

  constructor() {
    this.filter.offset = 0;
    this.filter.rows = 30;
    this.filter.years = [
      '2017',
      '2016',
      '2015',
      '2014',
      '2013',
    ];
    this.filter.genres = [
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
    this.filter.rating = 0;
    this.filter.sorts = [
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
    ]
    this.filter.quality = false;
  }

}
