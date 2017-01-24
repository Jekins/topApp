import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class MoviesService {
  private moviesUrl = 'http://topkino.tv/modules/json-db/json-db.php';
  private videoUrl = 'http://topkino.tv/modules/get-video/get-video.php';

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
    filters,
    videoUrl: boolean = false
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

    let url: string;

    if (videoUrl) {
      url = this.videoUrl;
    } else {
      url = this.moviesUrl;
    }
    
    return this.http.get(url+'?'+str)
      .map((res:Response) => res.json());
  }
}
