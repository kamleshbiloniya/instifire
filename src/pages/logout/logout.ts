import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
/**
 * Generated class for the LogoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  constructor(public navCtrl: NavController,public loadingCtrl: LoadingController,private storage: Storage, private afAuth:AngularFireAuth, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogoutPage');
  }
  signout(){
    this.storage.remove('email');
    this.storage.remove('passwd');
    this.afAuth.auth.signOut();
    this.navCtrl.setRoot(LoginPage);
  }

}
