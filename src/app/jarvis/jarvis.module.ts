import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message/message.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MessageComponent, ChatComponent]
})
export class JarvisModule { }
