import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class MoviesService {
  private moviesUrl = 'http://topkino.tv/modules/json-db/json-db.php';

  constructor (
    private http: Http
  ) {}

  getMovies(
    category: string,
    offset: number,
    rows: number,
    title: string,
    years?: string[],
	  genres?: string[],
    rating?: number,
    sorts?: string,
    quality?: boolean
  ) {
    let categoryStr: string = '? cat=' + category;
    let offsetStr: string = '& offset=' + offset;
    let rowsStr: string = '& rows=' + rows;
    let titleStr: string = title == undefined ? '' : '& title=' + title;
    let yearsStr: string = years == undefined ? '' : '& year=' + years;
    let genresStr: string = genres == undefined ? '' : '& zhanr=' + genres;
    let ratingFromStr: string = rating == undefined ? '' : '& from-kinopoisk=' + rating;
    let ratingToStr: string = rating == undefined ? '' : '& to-kinopoisk=10';
    let sortsStr: string = sorts == undefined ? '' : '& order_by=' + sorts;
    let sortsToStr: string = sorts == undefined ? '' : '& order=desc';
    let qualityStr: string = quality == undefined ? '' : '& quality=' + quality;

    return this.http.get(this.moviesUrl +
      categoryStr +
      offsetStr +
      rowsStr +
      titleStr +
      yearsStr +
      genresStr +
      ratingFromStr +
      ratingToStr +
      sortsStr +
      sortsToStr /*+
      qualityStr*/
    )
      .map((res:Response) => res.json());
  }
}
