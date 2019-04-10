import { Component } from '@angular/core';
import { NavController, Platform} from 'ionic-angular';
import { RegisterPage } from '../register/register';
// import { AdMobFree, AdMobFreeBannerConfig} from '@ionic-native/admob-free/ngx';
import { GlobalProvider } from '../../providers/global/global';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  email:string
  password:string
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
  
}
