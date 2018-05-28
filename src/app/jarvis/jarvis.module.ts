import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message/message.component';
import { ChatComponent } from './chat/chat.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{ path: 'dashboard', component: ChatComponent },
	{ path: '', redirectTo: 'dashboard', pathMatch: 'full'}
];

@NgModule({
  imports: [
    CommonModule,
	RouterModule.forChild(routes)
  ],
  declarations: [MessageComponent, ChatComponent],
  entryComponents: [MessageComponent]
})
export class JarvisModule { }
