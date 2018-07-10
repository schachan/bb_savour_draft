import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BaseService } from './services/base.services';
import { RouterModule, Routes } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

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
    MarkdownModule.forRoot(),
    NgbModule.forRoot(),
    HttpClientModule,
    HttpClientJsonpModule
  ],
  providers: [BaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
