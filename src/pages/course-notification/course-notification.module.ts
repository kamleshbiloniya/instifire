import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CourseNotificationPage } from './course-notification';

@NgModule({
  declarations: [
    CourseNotificationPage,
  ],
  imports: [
    IonicPageModule.forChild(CourseNotificationPage),
  ],
})
export class CourseNotificationPageModule {}
