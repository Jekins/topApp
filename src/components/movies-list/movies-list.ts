import { Component, Input } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { BackendService } from '../../shared/backend.service';

@Component({
  selector: 'movies-list',
  templateUrl: 'movies-list.html'
})
export class MoviesListComponent {
  @Input() movies: Object[];

  category: number = 19;
  title: string;
  xfields: string;
  params: Object;

  constructor(
    private backendService: BackendService,
    private navParams: NavParams
  ) {
    this.category = navParams.get('category');
    this.title = navParams.get('title');
  }

  arrXfields(xfields: string) {
    let xfieldsRep0 = xfields.replace('iframe|', 'iframe');
    let xfieldsRep1 = xfieldsRep0.replace('iframe|', 'iframe||');
    let xfieldsRep2 = xfieldsRep1.replace(/\|\|[a-zA-Z_]+\|\|\|/g, '||');
    let xfieldsSrc: string[] = xfieldsRep2.split('||');
    let movieXfieldsStr: string;
    let i: number;

    for (i = 0; i < xfieldsSrc.length; i++) {
      let replaceParams: string = xfieldsSrc[i].replace(/(.*)\|(.*)/g, '"$1": "$2"');
      movieXfieldsStr = movieXfieldsStr + ', ' + replaceParams;
    }
    
    let stringConv: string = "{" + movieXfieldsStr + "}";
    let undefinedRep: string = stringConv.replace('undefined, ', '');
    this.params = JSON.parse(undefinedRep);

    return this.params;
  }
}
