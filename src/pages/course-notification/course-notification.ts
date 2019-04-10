import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database'
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
  collegeId : 'iitk';
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
      console.log('sdsd',navParams);
      console.log('sdsd',this.userId,this.collegeId,this.courseNo);
      let payload = '/college/'+this.collegeId+'/'+this.courseNo+'/'+this.courseNo;
      console.log('payload',payload)
      this.fireStore.doc(payload).valueChanges().subscribe(data=>{
        this.creator = data['creator']
        console.log('data_c_n:',this.creator)
        Object.assign(this.notifications,data['notification'])
        this.notifications.sort((a, b) => a['from'] <= b['from'] ? -1 : 1);
        for(let i = 0; i< this.notifications.length;i++){
          this.notifications[i]['expanded'] = false
          let tmp =''
          let from = this.notifications[i]['from'].toDate()
          console.log('f---------',from)
          tmp = this.weekday[from.getDay()]+'\t'+from.getDate()+'\t'+this.month[from.getMonth()]+'\t'+from.getFullYear()
          this.notifications[i]['from'] =tmp
          from =  this.notifications[i]['upto'].toDate()
          tmp = this.weekday[from.getDay()]+'\t'+from.getDate()+'\t'+this.month[from.getMonth()]+'\t'+from.getFullYear()
          this.notifications[i]['upto'] =tmp
        }
        if (this.notifications.length == 0){
          this.emptyMsg =true;
        }else{
          this.emptyMsg = false;
        }
        // console.log(this.notifications.length)

      })
      // db.list(payload).valueChanges().subscribe(data=>{
      //   console.log('data...........',data);
      //   data.sort((a, b) => a['date'] <= b['date'] ? -1 : 1);
      //   for(let i = 1;i<data.length;i++){
      //     let p_data = JSON.stringify(data[i]);
      //     console.log('data...........',p_data);
      //     // data[i].expanded = false;
      //     this.notifications.push(
      //       {
      //         'date':data[i]['date'],
      //         'expr':data[i]['expr'],
      //         'msg':data[i]['msg'],
      //         'sub':data[i]['sub'],
      //         expanded:false
      //       }
      //     );
      //   }
      //   // if (data.length < 2)
      // });
      console.log(this.notifications);
      // .then(
      //     // date => console.log('Got date: ', date),
      //     err => console.log('Error occurred while getting date: ', err)
      //   );  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CourseNotificationPage');
  }
  addNotification(){
   this.navCtrl.push(AddNotificationPage)
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
  