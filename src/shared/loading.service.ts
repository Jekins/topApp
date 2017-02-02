import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class LoadingService {

	loading;

	constructor(
		public loadingCtrl: LoadingController
	) { }

	showLoading() {
		this.loading = this.loadingCtrl.create({
			content: "Загрузка...",
			// dismissOnPageChange: true,
			spinner: 'crescent'
		});

		this.loading.present();
	}
	hideLoading() {
		this.loading.dismiss();
	}
}