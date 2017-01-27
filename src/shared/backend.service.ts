import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class BackendService {
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

  getData(
    params,
    type?,
  ) {
    this.clean(params);

    var str = "";
    for (var key in params) {
      if (str != "") {
          str += "&";
      }
      str += key + "=" + params[key];
    }

    let url: string;
    if (type == 'video') {
      url = this.videoUrl;
      console.log(url);
    } else if (type == 'movies') {
      url = this.moviesUrl;
    }
    
    return this.http.get(url+'?'+str)
      .map((res:Response) => res.json());
  }
}
