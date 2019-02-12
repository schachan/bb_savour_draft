import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageComponent } from './message/message.component';
import { ChatComponent } from './chat/chat.component';
import { RouterModule, Routes } from '@angular/router';
import  {  NgxEmojiPickerModule  }  from  'ngx-emoji-picker';

const routes: Routes = [
	{ path: '', component: ChatComponent }
	// { path: '', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
     NgxEmojiPickerModule
  ],
  declarations: [MessageComponent, ChatComponent],
  entryComponents: [MessageComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class JarvisModule { }
