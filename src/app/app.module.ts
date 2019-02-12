import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BaseService } from './services/base.services';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import  {  NgxEmojiPickerModule  }  from  'ngx-emoji-picker';


const routes: Routes = [
  { path: '', loadChildren: './jarvis/jarvis.module#JarvisModule' }
];


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    NgbModule.forRoot(),
    HttpClientModule,
    HttpClientJsonpModule,
    NgxEmojiPickerModule.forRoot()
  ],
  providers: [BaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
