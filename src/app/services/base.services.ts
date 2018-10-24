import { Injectable } from '@angular/core';
import { Headers, Http, Request, RequestOptions, Response, XHRBackend } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';


@Injectable()
export class BaseService {

   private baseUrl:string = `${environment.serverUrl}api/savour`;
   constructor(public http: HttpClient) {
      this.http = http;
   }

   get(bookId) {
      return this.http.get(this.baseUrl + '/draft/' + bookId);
   }

   post(body:any, bookId:String) {
      if (bookId !== '') {
         return this.put(bookId, body);
      } else {
         return this.http.post(this.baseUrl + '/draft', body, {});
      }
   }

   delete(bookId) {
      return this.http.delete(this.baseUrl + "/draft/" + bookId);
   }

   put(bookId, putData) {
      const url = this.baseUrl + "/draft/" + bookId;
      return this.http.put(url, putData);
   }
}