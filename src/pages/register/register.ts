import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFireDatabase } from 'angularfire2/database'
import { AngularFirestore } from 'angularfire2/firestore';
import { LoginPage } from '../login/login';
// import { Firebase } from '@ionic-native/firebase/ngx';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  name:string=null
  email:string=null
  password:string=null
  confpassword:string=null
  selectedclg = null

  constructor(public navCtrl: NavController,
    private fbdb:AngularFireDatabase,
    private afs : AngularFirestore,
    private afAuth:AngularFireAuth,
    private toast:ToastController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
verify(){
  let clg = this.email.split('@')[1].split('.')[0]
  if(clg != this.selectedclg){
    return false
  }
}
async register(){
    if(this.selectedclg != null && this.name != null && this.email != null && this.password != null && this.confpassword != null){
      if(!this.verify){
        this.toast.create({
          message : 'Please use you college email Id ',
          duration:3000
         }).present();
        return;
      }
      if(this.password == this.confpassword){
        const result = await this.afAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(this.email,this.password);
        this.afAuth.auth.currentUser.sendEmailVerification().then(()=>{
          this.toast.create({
            message : 'Verification Link sent',
            duration:3000
           }).present();
           this.navCtrl.setRoot(LoginPage)
          })  
      }
      else{
        this.toast.create({
          message:"password and confirm password should be same!",
          duration:3000
        }).present();  
      }
    }
    else{
      console.log(this.selectedclg + " "+this.name + " "+this.email + " "+this.password + " "+ this.confpassword)
      this.toast.create({
        message:"All  fields are required",
        duration:3000
      }).present();
    }
  }
  goToLogin(){
    this.navCtrl.pop()
  }
}
