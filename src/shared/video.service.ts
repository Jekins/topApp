import { Injectable } from '@angular/core';
import { Jsonp, URLSearchParams, Response } from '@angular/http';

@Injectable()
export class VideoService {
  constructor(private jsonp: Jsonp) {}

  search (term: string) {

    let wikiUrl = 'http://topkino.tv/player/face.json';

    let params = new URLSearchParams();
    params.set('search', 'type=video&key=0cbb5532bdf4fa50&season=&episode=&nocontrolasons=&nocontrols_translations=&retrans='); // the user's search value
    params.set('action', 'opensearch');
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');

    // TODO: Add error handling
    return this.jsonp
               .post(wikiUrl, { search: params })
		.map(response => <string[]>response.json()[1]);
	  
	// return this.jsonp.get('http://topkino.tv/player/face.json?type=video&key=0cbb5532bdf4fa50&season=&episode=&nocontrolasons=&nocontrols_translations=&retrans=')
    //   .map((res:Response) => res.json());
			   
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/