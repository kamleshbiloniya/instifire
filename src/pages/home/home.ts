import { Component } from '@angular/core';
import { NavController, Platform, ToastController} from 'ionic-angular';
import { RegisterPage } from '../register/register';
// import { AdMobFree, AdMobFreeBannerConfig} from '@ionic-native/admob-free/ngx';
import { GlobalProvider } from '../../providers/global/global';
import { AngularFireDatabase } from 'angularfire2/database';
import { CourseNotificationPage } from '../course-notification/course-notification';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  email:string
  password:string
  name:string
  data : any;
  courses:any;
  college : string;
  course_key:{}
  start_date= new Date()
  connected:false;
  ref:any
  // Create the network check technology
  constructor(public navCtrl: NavController,
    private toast:ToastController,
    // private admobFree:AdMobFree,
<<<<<<< HEAD
    
    private db:AngularFireDatabase,
=======
    private fireStore:AngularFirestore,
>>>>>>> 39ca733c7e5bea8dad4809cfa89364089213bb3d
    public gvar:GlobalProvider,
    private platform:Platform) {
    this.email = this.gvar.getcurrentstudent()
    this.email = "kamlesh@iitk.ac.in"
    // let datax: any;
    fireStore.collection<any>('users').doc(this.email).valueChanges().subscribe(data =>{
      this.data = data
<<<<<<< HEAD
      // console.log(data)
      this.i = -1
      do {
        this.i ++
      }while (data[this.i]['email'] != this.email && data[this.i] != undefined)
  
      this.name = data[this.i]['name']
      if(data[this.i]['courses'] != undefined){
        this.courses = data[this.i]['courses']
        this.course_key = []
        this.course_key = Object.keys(this.courses)
        console.log("your are " + this.course_key)
      }
      else{
        this.course_key = []
      }
      
      this.user_no = this.i + 10001
    })
    db.list('/college/'+this.yourclg+'/courses').valueChanges().subscribe(data=>{
      this.data_c = data
      //console.log(this.data_c)
=======
      try{
        this.name = this.data['name']
        this.courses = this.data['courses']
        this.course_key = Object.keys(this.courses)
        this.college = this.data['college']
        console.log('email ',this.email)
        console.log('college',this.college)
        console.log('subsribed courses ',this.course_key)
        console.log('courses',this.courses)
      }
      catch(e){
        this.toast.create({
          message : e+"or\nCheck your network connectivity!",
          duration:3000
        }).present();
      }
>>>>>>> 39ca733c7e5bea8dad4809cfa89364089213bb3d
    })
  }

  ionViewDidLoad() {
    // this.navCtrl.push(RegisterPage);

    // if(this.platform.is('cordova')){
    //   const bannerConfig: AdMobFreeBannerConfig = {
    //     id:'ca-app-pub-5072323905656927/1247306752',
    //     isTesting: false,
    //     autoShow: true
    //   };
    //   this.admobFree.banner.config(bannerConfig);
      
    //   this.admobFree.banner.prepare()
    //     .then(() => {
    //     })
    //     .catch(e => console.log(e));
    // }

  }

  changeNotification(item){
    this.data['courses'][item] = !this.data['courses'][item]
    let user_data =this.fireStore.doc<any>('users/'+this.email)
    user_data.update({'courses':this.data['courses']}).catch(error =>{
      console.log('unable to update:',error)
    })
    console.log('item val', {'courses':{[item]:this.data['courses'][item]}})
  }
  openNotification(event,course_code){
    this.navCtrl.push(
      CourseNotificationPage,{
        'course':course_code,
        'user':this.email,
        'college':this.college
      }
    );
  }
}
