import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  items: string[];
  email = "kamlesh@iitk.ac.in"
  data:any[]
  obj = {}
  courses  = new Array()
  course_key=[]
  i:number
  user_no:number
  constructor(public navCtrl: NavController,
    private alertCtrl: AlertController,
    private db:AngularFireDatabase,
     public navParams: NavParams) {
    this.selectedItem = navParams.get('item');
    this.items = ['CS101', 'CS102', 'CS103', 'CS104', 'CS105', 'CS106',
    'CS107', 'CS108', 'CS109', 'CS110','MSO201','MSO202','MSO203'];
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

    
  }

  initializeItems(){
    this.items = ['CS101', 'CS102', 'CS103', 'CS104', 'CS105', 'CS106',
    'CS107', 'CS108', 'CS109', 'CS110','MSO201','MSO202','MSO203'];
  }
  getItems(ev) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
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
          name: 'course code',
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
          }
        }
      ]
    });
    alert.present();
  }

  likeUnlike(item){
    if (this.course_key.indexOf(item)>=0){
      this.db.list('/users/user'+this.user_no+'/courses').remove(item).then(x =>{
        console.log("deleted")
      })
    }
    else{
      // console.log('/users/user'+this.user_no+'/courses')
      // this.db.list('/users/user'+this.user_no+'/courses/'+item+'/noti' ).push(true)
      let newcrc = this.db.database.ref('/users/user'+this.user_no);
      newcrc.child('/courses/'+item).update({noti:true});
    }
  }

}
