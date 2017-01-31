import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { StreamingMedia, StreamingVideoOptions } from 'ionic-native';
import { Params } from '../../shared/params.mock';
import { BackendService } from '../../shared/backend.service';
import { SeasonsComponent } from '../../components/seasons/seasons';

@Component({
  selector: 'page-movie',
  templateUrl: 'movie.html'
})
export class MoviePage {

  movie: any;
  xfields: any;
  movieInfo = 'params';
  serial: boolean;
  moon: Object[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public backendService: BackendService,
    public modalCtrl: ModalController
  ) {
    this.movie = navParams.get('movie');
    this.xfields = navParams.get('xfields');
    this.serial= this.xfields.format == 'Многосерийный' ? true : false;
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
    let params = new Params();
    params.type = link.pathname.split('/')[1];
    params.key = link.pathname.split('/')[2];
    params.retrans = false;

    let options: StreamingVideoOptions = {
      successCallback: () => { console.log('Video played') },
      errorCallback: (e) => { console.log('Error streaming') },
      orientation: 'landscape'
    };
    
    this.backendService.getData(params, 'video').subscribe(data => {
        StreamingMedia.playVideo(data.manifest.m3u8, options);
    });
    
  }

  goSeasons() {
    let modal = this.modalCtrl.create(SeasonsComponent, {xfields: this.xfields});
    modal.present();
  }

}