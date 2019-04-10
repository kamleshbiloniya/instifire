import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';

/**
 * Generated class for the AddNotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-notification',
  templateUrl: 'add-notification.html',
})
export class AddNotificationPage {
  subject:string;
  desc:string;
  uptoD:string;
  uptoT:string;
  courseNo:string;
  userId:string;
  collegeId:string;
  data:any;
  constructor(public navCtrl: NavController,
     private fireStore:AngularFirestore,
     public navParams: NavParams) {
    this.userId = (navParams.get('user'));
    this.collegeId = (navParams.get('college'));
    this.courseNo = (navParams.get('course'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddNotificationPage');
  }
  goToRegister(){
    console.log('subject: ',this.subject);
    console.log('desc: ',this.desc);
    console.log('date:',this.uptoD);
    console.log('time:',this.uptoT);
    console.log('current: ',Date.now())
    this.fireStore.doc('/college/'+this.collegeId+'/courses/'+this.courseNo).valueChanges().subscribe(x=>{
      
    })
  }
}
