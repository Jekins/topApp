import { Injectable } from '@angular/core';

import { Filter } from './filter.mock';

@Injectable()
export class FiltersService {

  constructor() {
  }

  filters = {
      
    category: Filter['category'],
    title: Filter['title'],
    offset: Filter['offset'] = 0,
    rows: Filter['rows'] = 30,
    years: Filter['years'] = [
      '2017',
      '2016',
      '2015',
      '2014',
      '2013',
    ],
    genres: Filter['genres'] = [
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
    ],
    rating: Filter['rating'] = 0,
    sorts: Filter['sorts'] = [
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
    ],
    quality: Filter['quality'] = false
  };

}
