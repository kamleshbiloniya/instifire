import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
<<<<<<< HEAD
=======
import { Firebase } from '@ionic-native/firebase/ngx';
import { Platform } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
>>>>>>> b4db0caa92decce855a1b529d624458adc0f989f

/*
  Generated class for the FcmProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FcmProvider {

<<<<<<< HEAD
  constructor(public http: HttpClient) {
    console.log('Hello FcmProvider Provider');
  }

=======
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
>>>>>>> b4db0caa92decce855a1b529d624458adc0f989f
}
