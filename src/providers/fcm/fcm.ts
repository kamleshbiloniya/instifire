import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase/ngx';
import { Platform } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';

/*
  Generated class for the FcmProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FcmProvider {

  constructor(public http: HttpClient,
    public firebaseNative:Firebase,
    private afs: AngularFirestore,
    private platform:Platform
    ) {
    console.log('Hello FcmProvider Provider');
  }
  async getTolen(){
    let token;
    if (this.platform.is('android')){
      token = await this.firebaseNative.getToken()
    }
    if (this.platform.is('ios')){
      token = await this.firebaseNative.getToken();
      await this.firebaseNative.grantPermission();
    }
    // # PWA
    return this.saveTtoFS(token);
  }
  private saveTtoFS(token){

  }
}
