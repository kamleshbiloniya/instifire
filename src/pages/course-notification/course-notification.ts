import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database'
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
  courseNo :any;
  userId:any;
  data:any[];
  noti :any;
  notifications: any=[];
  // itemRef:AngularFireDatabase.database.ref;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private db:AngularFireDatabase,
    private alertCtrl: AlertController
    ) {
      // this.collegeId = 'iitk'
      console.clear();
      this.userId = (navParams.get('user'));
      this.collegeId = (navParams.get('college'));
      this.courseNo = (navParams.get('course'));
      console.log('sdsd',navParams);
      console.log('sdsd',this.userId,this.collegeId,this.courseNo);
      let payload = '/college/'+this.collegeId+'/courses/'+this.courseNo;
      console.log('payload',payload)
      db.list(payload).valueChanges().subscribe(data=>{
        console.log('data...........',data);
        data.sort((a, b) => a['date'] <= b['date'] ? -1 : 1);
        for(let i = 1;i<data.length;i++){
          let p_data = JSON.stringify(data[i]);
          console.log('data...........',p_data);
          // data[i].expanded = false;
          this.notifications.push(
            {
              'date':data[i]['date'],
              'expr':data[i]['expr'],
              'msg':data[i]['msg'],
              'sub':data[i]['sub'],
              expanded:false
            }
          );
        }
        // if (data.length < 2)
      });
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
    let alert = this.alertCtrl.create({
      title: 'Add New Notification',
      inputs: [
        {
          type:'text',
          name: 'subject',
          placeholder: 'Title here',
          
        },
        {
         type : 'text',
         name:'msg',
         placeholder:'Detailed Description' 
        },
        {
          type:'date',
          name:'start_date',
          placeholder:'Start Date here'
        },
        {
          type:'date',
          name:'end_date',
          placeholder:'End Date(Deadline) Here'
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
          text: 'save',
          handler: data => {
            console.log(data)
            //Validation here
            let validated=true;
            // if (this.items_all.indexOf(data.code) < 0){
            //   let newcrc = this.db.database.ref('/college/'+this.clg_name);
            //   newcrc.child('/courses/'+data.code).update({by:this.email});
            // }
            // else{
            //     this.toast.create({
            //       message :'This course already exist !!',
            //       duration:3000
            //     }).present();
            // }
          }
        }
      ]
    });
    alert.present();
  }
  expandItem(item){

    this.notifications.map((listItem) => {

        if(item == listItem){
            listItem.expanded = !listItem.expanded;
        } else {
            listItem.expanded = false;
        }

        return listItem;

    });

}
}
  