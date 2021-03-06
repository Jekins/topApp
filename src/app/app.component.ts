import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { MoviesPage } from '../pages/movies/movies';
import { FilterData } from '../shared/filter.data';
import { FilterService } from '../shared/filter.service';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any, category: number}>;

  constructor(
    public platform: Platform,
    private filterData: FilterData,
    private filterService: FilterService
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Главная', component: HomePage, category: this.filterData.filter.category['main'] },
      { title: 'Фильмы', component: MoviesPage, category: this.filterData.filter.category['films'] },
      { title: 'Сериалы', component: MoviesPage, category: this.filterData.filter.category['serials'] },
      { title: 'Мультфильмы', component: MoviesPage, category: this.filterData.filter.category['mult'] },
      { title: 'Аниме', component: MoviesPage, category: this.filterData.filter.category['anime'] }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // StatusBar.styleLightContent();
      StatusBar.backgroundColorByHexString('#387ef5');
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.filterService.resetFilter();
    this.nav.setRoot(page.component, {
      category: page.category,
      title: page.title
    });
  }
}
