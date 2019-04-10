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
  subject:string = null;
  desc:string= null;
  uptoD:string = null;
  uptoT:string = null;
  courseNo:string;
  userId:string;
  collegeId:string;
  current_date_time = new Date()
  today_d:number
  today_m:number
  today_y:number
  today_hr:number
  today_min:number
  today_date:string
  today_time:string 
  data:any;
  format:any;
  notif
  flag = 1;
  x = {}
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
    
    console.log(this.current_date_time)
    this.today_d = this.current_date_time.getDate()
    this.today_m = this.current_date_time.getMonth() + 1
    this.today_y = this.current_date_time.getFullYear()
    this.today_hr = this.current_date_time.getHours()
    this.today_min = this.current_date_time.getMinutes()
    this.today_date = this.today_y + '/'+ this.today_m +'/'+this.today_d
    this.today_time = this.today_hr +':'+this.today_min
    console.log(this.today_date)
    console.log(this.today_time)
  }
  validate_date_time(){
    let arr = this.uptoD.split('-')
    let t = this.uptoT.split(':')
    if (Number(arr[0]) != this.today_y){
      return Number(arr[0]) > this.today_y ? true : false
    }
    else if(Number(arr[1]) != this.today_m){
      return Number(arr[1]) > this.today_m ? true : false 
    }
    else if(Number(arr[2]) != this.today_d){
      return Number(arr[2]) > this.today_d ? true : false 
    }
    else if(Number(t[0]) != this.today_hr){
      return Number(t[0]) > this.today_hr ? true : false
    }
    else if(Number(t[1]) != this.today_min){
      return Number(t[1]) > this.today_min ? true : false
    }
    else{
      return false
    }
    
  }
 addNewNotification(){
   this.flag = 1
    console.log('subject: ',this.subject);
    console.log('desc: ',this.desc);
    console.log('date:',this.uptoD);
    console.log('time:',this.uptoT);
    console.log('current: ',this.current_date_time)
    this.fireStore.doc('/college/'+this.collegeId+'/courses/'+this.courseNo).valueChanges().subscribe(x=>{
      if(this.subject == null || this.desc == null || this.uptoD == null || this.uptoT == null){
        this.toast.create({
          message :"All the fields are required !!",
          duration:3000
        }).present();
      }
      else if(!this.validate_date_time()){
        this.toast.create({
          message :"Sorry...You can't travel back in time !!",
          duration:3000
        }).present();
        return
      }
      else{
        let notification = []
        let payload = '/college/'+this.collegeId+'/courses/'+this.courseNo
        console.log(payload)
        let ref = this.fireStore.doc(payload)
        ref.valueChanges().subscribe(data=>{
          this.x = data
          console.log('_++_+_+_+_',this.x)
          notification = this.x['notification']
          let end_date= new Date(this.uptoD+"T"+this.uptoT)
          if(this.flag){
              this.flag = 0
              notification.push({
              'creator':this.userId,
              'desc':this.desc,
              'subject':this.subject,
              'from' :( new Date()).getTime(),
              'upto': end_date.getTime()
              })
            console.log('notifications ---> ' + notification)
            ref.update({'notification':notification}).catch(error =>{
              console.log('unable to update:',error)
            }).then(x=>{
              this.toast.create({
                message :"New notification created !!",
                duration:3000
              }).present();
              this.navCtrl.pop()
            })
          }
        })
      }
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
