import { Component } from '@angular/core';
import { NavController, Platform} from 'ionic-angular';
import { RegisterPage } from '../register/register';
// import { AdMobFree, AdMobFreeBannerConfig} from '@ionic-native/admob-free/ngx';
import { GlobalProvider } from '../../providers/global/global';
import { AngularFireDatabase } from 'angularfire2/database';
import { CourseNotificationPage } from '../course-notification/course-notification';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  email:string
  name:string
  data : any[];
  data_c : any[]
  i:number
  user_no:number
  courses;
  yourclg = "iitk"
  course_key:{}
  start_date= new Date()
  time_date:number
  constructor(public navCtrl: NavController,
    // private admobFree:AdMobFree,
    private db:AngularFireDatabase,
    public gvar:GlobalProvider,
    private platform:Platform) {
    this.email = this.gvar.getcurrentstudent()
    this.email = "kamlesh@iitk.ac.in"
    db.list("/users").valueChanges().subscribe(data =>{
      this.data = data
      // console.log(data)
      this.i = -1
      do {
        this.i ++
      }while (data[this.i]['email'] != this.email && data[this.i] != undefined)
  
      this.name = data[this.i]['name']
      this.courses = data[this.i]['courses']
      this.course_key = Object.keys(this.courses)
      console.log("your are " + this.course_key)
      this.user_no = this.i + 10001
    })
    db.list('/college/'+this.yourclg+'/courses').valueChanges().subscribe(data=>{
      this.data_c = data
      //console.log(this.data_c)
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  changeNotification(item){
    let flag = 1
    this.db.list('/users/user'+this.user_no+'/courses/'+item).valueChanges().subscribe(data=>{
      if (data[0] == true && flag){
        let newcrc = this.db.database.ref('/users/user'+this.user_no);
        newcrc.child('/courses/'+item).update({noti:false});
        flag = 0
      }
      else if(data[0] == false && flag){
        let newcrc = this.db.database.ref('/users/user'+this.user_no);
        newcrc.child('/courses/'+item).update({noti:true});
        flag =0
      }
    })
    
  }
  openNotification(event,course_code){
    this.navCtrl.push(
      CourseNotificationPage,{
        'course':course_code,
        'user':this.email,
        'college':this.yourclg
      }
    );
  }
}
