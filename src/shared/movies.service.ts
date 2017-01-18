import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class MoviesService {
  private moviesUrl = 'http://topkino.tv/modules/json-db/json-db.php';

  constructor (
    private http: Http
  ) {}

  getMovies(category: number, offset: number, rows: number) {
    let categoryStr: string = 'category=' + category;
    let offsetStr: string = 'offset=' + offset;
    let rowsStr: string = 'rows=' + rows;

    return this.http.get(this.moviesUrl + '?' + categoryStr + '&' + offsetStr + '&' + rowsStr)
      .map((res:Response) => res.json());
  }
}
