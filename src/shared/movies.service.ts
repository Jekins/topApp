import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class MoviesService {
  private moviesUrl = 'http://topkino.tv/modules/json-db/json-db.php';

  constructor (
    private http: Http
  ) {}

  clean(obj) {
    for (var propName in obj) { 
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
  }

  getMovies(
    filters
  ) {
    this.clean(filters);

    var obj = filters;

    var str = "";
    for (var key in obj) {
        if (str != "") {
            str += "&";
        }
        str += key + "=" + obj[key];
    }
    
    return this.http.get(this.moviesUrl+'?'+str)
      .map((res:Response) => res.json());
  }
}
