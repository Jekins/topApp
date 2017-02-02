import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { LoadingService } from './loading.service';

@Injectable()
export class BackendService {
  private moviesUrl = 'http://topkino.tv/modules/json-db/json-db.php';
  private videoUrl = 'http://topkino.tv/modules/get-video/get-video.php';
  private moonUrl = 'http://topkino.tv/modules/moon/moon.php';

  constructor (
    private http: Http,
    private loadingService: LoadingService
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
    loading = true
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
    } else if (type == 'movies') {
      url = this.moviesUrl;
    } else if (type == 'moon') {
      url = this.moonUrl;
    }

    if (loading) {
      this.loadingService.showLoading();
    }
    
    return this.http.get(url + '?' + str)
      .map((res: Response) => res.json());
  }
}
