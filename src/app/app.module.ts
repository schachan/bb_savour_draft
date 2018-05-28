import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { JarvisModule } from './jarvis/jarvis.module';
import { MarkdownModule } from 'ngx-markdown';

import { ChatComponent } from './jarvis/chat/chat.component';
import { MessageComponent } from './jarvis/message/message.component';

const routes: Routes = [
    // { path: '', loadChildren: 'app/jarvis/jarvis.module#JarvisModule' }
    { path: '', component: ChatComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    MarkdownModule.forRoot()
    // JarvisModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [MessageComponent]
})
export class AppModule { }
