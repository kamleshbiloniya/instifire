import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GlobalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalProvider {
  currentstudent:string=null;

  constructor(
    //public http: HttpClient
    ) {
    console.log('Hello GlobalProvider Provider');
  }
  setcurrentstudent(student){
    this.currentstudent = student;

  }
  getcurrentstudent(){
    return this.currentstudent;
  }

}
