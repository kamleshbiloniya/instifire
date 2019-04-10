import { Component, ɵConsole } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, Toast } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import { firestore } from 'firebase';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  items: any[];
  items_all :any[]
  email = "kamlesh@iitk.ac.in"
  emp = "ankitaks@iitk.ac.in"
  college = "iitk"
  data:any
  name:string
  data_clg :any[]
  obj = {}
  courses  = new Array()
  course_key=[]
  i:number
  user_no:number
  constructor(public navCtrl: NavController,
    private alertCtrl: AlertController,
    private fireStore: AngularFirestore,
    private db:AngularFireDatabase,
    private toast:ToastController,
     public navParams: NavParams) {
    this.selectedItem = navParams.get('item');
    // firestore.col
    fireStore.doc('college/'+this.college).valueChanges().subscribe(data=>{
      // console.clear()
      console.log('data___:',data)
      this.items = data['clist']
      this.items_all = this.items
    })
    fireStore.collection('users').doc(this.email).valueChanges().subscribe(data=>{
      this.data = data
      try{

        this.name = this.data['name']
        this.courses = this.data['courses']
        this.course_key = Object.keys(this.courses)
        this.college = this.data['college']
        console.log('=================')
        console.log('data',this.data)
        console.log('email ',this.email)
        console.log('college',this.college)
        console.log('subsribed courses ',this.course_key)
        console.log('courses',this.courses)
        console.log('=================')
      }
      catch(e){
        this.toast.create({
          message : e+"or\nCheck your network connectivity!",
          duration:3000
        }).present();
      }
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
            if (this.course_key.indexOf(data.code) < 0){
              console.log("before items" + this.items)
              this.items.push(data.code)
              console.log("new items"+this.items)
              this.fireStore.doc<any>('college/'+this.college).update({'clist':this.items})
              // let courseCode = data.code
              // this.fireStore.doc<any>('college/'+this.college+"/"+data.code+"/"+data.code).update({'creator':this.email})
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

  toggleLike(item){
    if (this.course_key.indexOf(item)>=0){
      delete this.data['courses'][item]
      console.log(this.data)
      this.fireStore.doc<any>('users/'+this.email).update({'courses':this.data['courses']}).then(x =>{
        this.toast.create({
          message :'Course '+item +' removed from your home page',
          duration:3000
        }).present();
      }).catch(e => {
        this.toast.create({
          message :"Couldn't remove the course from your home page\n"+e,
          duration:3000
        }).present();
      })
    }
    else{
      this.data['courses'][item]=true
      console.log(this.data)
      this.fireStore.doc<any>('users/'+this.email).update({'courses':this.data['courses']}).then(x =>{
        this.toast.create({
          message :'Course '+ item +' added to your home page',
          duration:3000
        }).present();
      }).catch(e => {
        this.toast.create({
          message :"Couldn't add the course to your home page\n"+e,
          duration:3000
        }).present();
      })
    }
  }

}
