import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { BackendService } from '../../shared/backend.service';
import { Moon } from '../../shared/moon.mock';

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

  constructor(
    public paramsCtrl: NavParams,
    public viewCtrl: ViewController,
    public backendService:BackendService
  ) {
    this.xfields = paramsCtrl.get('xfields');
    this.params.kinopoisk_id = this.xfields['kinopoisk_id'];

    this.getData();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  getData() {
    this.backendService.getData(this.params, 'moon').subscribe(data => {
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
        this.serial = data;

        this.seasons = this.serial['season_episodes_count'];
        console.log(this.serial);
      });
    }
  }

}
