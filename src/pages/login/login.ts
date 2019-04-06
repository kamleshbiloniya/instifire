import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { HomePage } from '../home/home';
import { GlobalProvider } from '../../providers/global/global';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email:string=null
  password:string=null
  // lock = 0
  constructor(public navCtrl: NavController,
    private afAuth:AngularFireAuth,
    private toast:ToastController,
    private db:AngularFireDatabase,
    private alertCtrl: AlertController,
    public gvar:GlobalProvider,
    // private storage: Storage,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async login(){
    // this.lock = 1;
    console.log("user : " +this.email);
    console.log("passwd : "+this.password);
    try{
     const result = await this.afAuth.auth.signInWithEmailAndPassword(this.email,this.password).then((user) => {
      if(user.user.emailVerified) {
        this.gvar.setcurrentstudent(this.email);
        this.navCtrl.push(HomePage)
       
      } else {
        this.toast.create({
          message : "Email is not verified. Please check inbox",
          duration:3000
        }).present();
      }
    });
    }
    catch(e){
      this.toast.create({
        message : e.message,
        duration:3000
      }).present();
      console.error(e);
    }
  }
  
  goToRegister(){
    this.navCtrl.push(RegisterPage)
  }
  async ForgotPasswd(){
    let alert = this.alertCtrl.create({
    title: 'Reset Password',
    inputs: [
      {
        name: 'email',
        placeholder: 'Email address'
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'OK',
        handler: data => {
          this.afAuth.auth.sendPasswordResetEmail(data.email).then(()=>{
            this.toast.create({
              message : "Mail has been sent. Please check inbox!",
              duration:3000
            }).present();
          })
        }
      }
    ]
  });
  alert.present();
  }
  ResendLink(){

  }

}
