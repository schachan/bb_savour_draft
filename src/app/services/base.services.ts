import { Injectable } from '@angular/core';
import { Headers, Http, Request, RequestOptions, Response, XHRBackend } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class BaseService {

   private baseUrl: string = 'https://bookbhook.in/api/savour';
   constructor(public http: HttpClient) {}

   get(bookId) {
      return this.http.get(this.baseUrl + '/draft/' + bookId);
   }

   post(postBody: any, bookId) {
      if (bookId != "") {
         return this.put(bookId, postBody);
      } else {
         return this.http.post(this.baseUrl + "/draft", postBody, {});
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