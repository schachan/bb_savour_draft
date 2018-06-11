import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { JarvisModule } from './jarvis/jarvis.module';
import { MarkdownModule } from 'ngx-markdown';

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
    MarkdownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
