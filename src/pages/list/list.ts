import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  items: any[];
  items_all :any[]
  email = "kamlesh@iitk.ac.in"
  clg_name = "iitk"
  data:any[]
  data_clg :any[]
  obj = {}
  courses  = new Array()
  course_key=[]
  i:number
  user_no:number
  constructor(public navCtrl: NavController,
    private alertCtrl: AlertController,
    private db:AngularFireDatabase,
    private toast:ToastController,
     public navParams: NavParams) {
    this.selectedItem = navParams.get('item');

    db.list('/users').valueChanges().subscribe(data=>{
      this.data = data
      this.i = -1
      do {
        this.i ++
      }while (data[this.i]['email'] != this.email && data[this.i] != undefined)
      this.course_key =  Object.keys(this.data[this.i]['courses'])
      console.log("keys ->"+ this.course_key)

      this.user_no = this.i + 10001
    })
    db.list('/college/'+this.clg_name).valueChanges().subscribe(data=>{
      this.data_clg = data
      this.items_all = Object.keys(this.data_clg[0])
      this.items = this.items_all
      // console.log()
    })
    
  }

  getItems(ev) {
    // Reset items back to all of the items
    this.items = this.items_all
    // set val to the value of the ev target
    var val = ev.target.value;
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  addCourse(){
    let alert = this.alertCtrl.create({
      title: 'Add New Course',
      inputs: [
        {
          type:'text',
          name: 'code',
          placeholder: 'Course Code',
          
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
            console.log(data.code)
            if (this.items_all.indexOf(data.code) < 0){
              let newcrc = this.db.database.ref('/college/'+this.clg_name);
              newcrc.child('/courses/'+data.code).update({by:this.email});
            }
            else{
                this.toast.create({
                  message :'This course already exist !!',
                  duration:3000
                }).present();
            }
          }
        }
      ]
    });
    alert.present();
  }

  likeUnlike(item){
    if (this.course_key.indexOf(item)>=0){
      this.db.list('/users/user'+this.user_no+'/courses').remove(item).then(x =>{
        this.toast.create({
          message :'Course removed from your Home page',
          duration:3000
        }).present();
      })
    }
    else{
      // console.log('/users/user'+this.user_no+'/courses')
      // this.db.list('/users/user'+this.user_no+'/courses/'+item+'/noti' ).push(true)
      let newcrc = this.db.database.ref('/users/user'+this.user_no);
      newcrc.child('/courses/'+item).update({noti:true}).then(x=>{
        this.toast.create({
          message :'Course added to your home page',
          duration:3000
        }).present();
      })
    }
  }

}
