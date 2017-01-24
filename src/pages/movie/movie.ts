import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { StreamingMedia, StreamingVideoOptions } from 'ionic-native';
import { Params } from '../../shared/params.mock';
import { MoviesService } from '../../shared/movies.service';

@Component({
  selector: 'page-movie',
  templateUrl: 'movie.html'
})
export class MoviePage {

  movie: any;
  xfields: any;
  movieInfo = 'params';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public moviesService: MoviesService
  ) {
    this.movie = navParams.get('movie');
    this.xfields = navParams.get('xfields');
  }

  goTrailer(link: string) {
    let options: StreamingVideoOptions = {
      successCallback: () => { console.log('Video played') },
      errorCallback: (e) => { console.log('Error streaming') },
      orientation: 'landscape'
    };
    
    StreamingMedia.playVideo('http://kp.cdn.yandex.net/' + link, options);
  }
  goVideo() {
    var getLocation = function(href) {
      var l = document.createElement("a");
      l.href = href;
      return l;
    };
    var link = getLocation(this.xfields.player);

    if (this.xfields.format === 'Полнометражный') {
    
    } else {
      
    }
    

    let params = new Params();
    params.type = link.pathname.split('/')[1];
    params.key = link.pathname.split('/')[2];
    params.retrans = false;

    let options: StreamingVideoOptions = {
      successCallback: () => { console.log('Video played') },
      errorCallback: (e) => { console.log('Error streaming') },
      orientation: 'landscape'
    };
    console.log();

    this.moviesService.getMovies(params, true).subscribe(data => {
      StreamingMedia.playVideo(data.manifest.m3u8, options);
    });
    
  }

}