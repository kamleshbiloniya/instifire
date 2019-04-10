import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import { empty } from 'rxjs';
import { AddNotificationPage } from '../add-notification/add-notification';
/**
 * Generated class for the CourseNotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-course-notification',
  templateUrl: 'course-notification.html',
})
// interface 
export class CourseNotificationPage {
  collegeId ;
  creator:string;
  courseNo :any;
  userId:any;
  data:any[];
  noti :any;
  notifications: any=[];
  weekday = {
  0 :  "Sunday",
  1 : "Monday",
  2 : "Tuesday",
  3 : "Wednesday",
  4 : "Thursday",
  5 : "Friday",
  6 : "Saturday"
  }
  month ={
    0 : "January",
    1 : "February",
    2 : "March",
    3 : "April",
    4 : "May",
    5 : "June",
    6 : "July",
    7 : "August",
    8 : "September",
    9 : "October",
    10 : "November",
    11 : "December"
  }
  emptyMsg =false;
  // itemRef:AngularFireDatabase.database.ref;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private fireStore:AngularFirestore,
    private alertCtrl: AlertController
    ) {
      // this.collegeId = 'iitk'
      console.clear();
      this.userId = (navParams.get('user'));
      this.collegeId = (navParams.get('college'));
      this.courseNo = (navParams.get('course'));
      console.log('sdsd',this.userId,this.collegeId,this.courseNo);
      let payload = '/college/'+this.collegeId+'/courses/'+this.courseNo;
      console.log('payload',payload)
      this.fireStore.doc(payload).valueChanges().subscribe(data=>{
        this.creator = data['by']
        console.log('data_c_n:',data)
        Object.assign(this.notifications,data['notification'])
        this.notifications.sort((a, b) => a['from'] <= b['from'] ? -1 : 1);
        for(let i = 0; i< this.notifications.length;i++){
          this.notifications[i]['expanded'] = false
          let tmp =''
          let from = this.notifications[i]['from']
          from = new Date(from);
          tmp = "\t"+this.weekday[from.getDay()]+'\t'+from.getDate()+'\t'+this.month[from.getMonth()]+'\t'+from.getFullYear()
          this.notifications[i]['from'] =from.toLocaleString()
          from =  this.notifications[i]['upto']
          from = new Date(from);
          tmp = "\t"+this.weekday[from.getDay()]+'\t'+from.getDate()+'\t'+this.month[from.getMonth()]+'\t'+from.getFullYear()
          this.notifications[i]['upto'] =from.toLocaleString()
          
        }     
        console.log('-=-=-=-=-=-=-',this.notifications);
        if (this.notifications.length == 0){
          this.emptyMsg =true;
        }else{
          this.emptyMsg = false;
        }   
      })    
       
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CourseNotificationPage');
  }
  addNotification(){
    this.navCtrl.push(AddNotificationPage,{
      'course':this.courseNo,
      'college':this.collegeId,
      'user':this.userId,
      'notifications':this.notifications
    })
  }
  expandItem(item){

    this.notifications.map((listItem) => {

        if(item == listItem){
            listItem['expanded'] = !listItem['expanded'];
        } else {
            listItem['expanded'] = false;
        }

        return listItem;

    });

}
}
  