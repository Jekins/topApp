import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { StreamingMedia, StreamingVideoOptions } from 'ionic-native';
import { BackendService } from '../../shared/backend.service';
import { LoadingService } from '../../shared/loading.service';
import { Moon } from '../../shared/moon.mock';
import { Params } from '../../shared/params.mock';

@Component({
  selector: 'seasons',
  templateUrl: 'seasons.html'
})
export class SeasonsComponent {

  xfields: Object[];
  params = new Moon();
  video: string[];
  serial: string[];
  translators: string;
  seasons: string[];
  token: string;
  currentSeason: number;
  currentEpisode: number;
  currentVideo: string;

  constructor(
    public paramsCtrl: NavParams,
    public viewCtrl: ViewController,
    public backendService: BackendService,
    private loadingService: LoadingService
  ) {
    this.xfields = paramsCtrl.get('xfields');
    this.params.kinopoisk_id = this.xfields['kinopoisk_id'];

    this.loadingService.showLoading();
    this.getData();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  getData() {
    this.backendService.getData(this.params, 'moon').subscribe(data => {
      this.loadingService.hideLoading();
      this.loadingService.hideLoading();
      
      this.video = data;
      this.video.sort(function (a, b) {
          return a['translator_id'] - b['translator_id'];
      });
      // this.video.sort(function (a, b) {
      //     return a['episodes_count'] - b['episodes_count'];
      // });
      this.translators = this.video[0]['translator_id'];
      this.getTranslatorEpisodes(this.video[0]['translator_id']);
    });
  }

  getTranslatorEpisodes(val: number) {
    if (val) {
      this.params.type = 'serial';
      this.params.translator_id = val;

      this.backendService.getData(this.params, 'moon').subscribe(data => {
        this.loadingService.hideLoading();

        this.serial = data;
  
        this.serial['season_episodes_count'].sort(function (a, b) {
            return a['season_number'] - b['season_number'];
        });
        this.seasons = this.serial['season_episodes_count'];
        this.token = this.serial['serial']['token'];
        console.log(this.serial);
      });
    }
  }

  showEpisode(episode: number, season: number) {
    let params = new Params();
    params.type = 'serial';
    params.key = this.token;
    params.retrans = false;
    params.episode = episode;
    params.season = season;

    this.backendService.getData(params, 'video').subscribe(data => {
      this.loadingService.hideLoading();

      this.currentSeason = season;
      this.currentEpisode = episode;
      this.currentVideo = data.manifest.m3u8;
    });
  }

  goVideo() {

    let options: StreamingVideoOptions = {
      successCallback: () => { console.log('Video played') },
      errorCallback: (e) => { console.log('Error streaming') },
      orientation: 'landscape'
    };
    StreamingMedia.playVideo(this.currentVideo, options);
    
  }

}
