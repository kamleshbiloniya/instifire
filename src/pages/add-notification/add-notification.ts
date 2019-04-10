import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
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
  format:any;
  notif
  flag = 1;
  payload:string;
  constructor(public navCtrl: NavController,
     private fireStore:AngularFirestore,
     public toast:ToastController,
     public navParams: NavParams) {
    this.userId = (navParams.get('user'));
    this.collegeId = (navParams.get('college'));
    this.courseNo = (navParams.get('course'));
    // this.notif = (navParams.get('notification'))
    // if (typeof (this.notif) == 'undefined'){
    //   this.notif = new Array()
    // }
    this.payload = '/college/'+this.collegeId+'/courses/'+this.courseNo
    console.log('userId:',this.userId)
    console.log('college: ',this.collegeId)
    console.log('course: ',this.courseNo)
    // console.log('notif ',this.notif)
    this.flag = 1;
    // this.format = new SimpleDateFormat("yyyy-MM-dd");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddNotificationPage');
  }
  goToRegister(){
    let data :any;
    let end_date= new Date(this.uptoD+"T"+this.uptoT)
    
    console.log('payload',this.payload)
    this.fireStore.doc(this.payload).valueChanges().subscribe(data=>{
      console.log('datataarar\t',data)
      this.notif = data['notification']
      this.flag = 0;
    })
    // this.notif.push({
    //   'creator':this.userId,
    //   'desc':this.desc,
    //   'subject':this.subject,
    //   'from' :( new Date()).getTime(),
    //   'upto': end_date.getTime()
    // })
    // console.log('notifications',this.notif)
    // if (this.flag && !( this.notif == [] || this.notif=='undefined')){
    //   this.flag = 0;

    //   this.fireStore.doc('/college/'+this.collegeId+'/courses/'+this.courseNo).update({'notification':this.notif}).then(x =>{
    //     this.toast.create({
    //       message :'Notification added to your home page',
    //       duration:3000
    //     }).present();
    //     this.navCtrl.pop()
    //   }).catch(e => {
    //     this.toast.create({
    //       message :"Couldn't add the notification to your home page\n"+e,
    //       duration:3000
    //     }).present();
    //   })
    // }
  }
}
