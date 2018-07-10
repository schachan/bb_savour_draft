import { Injectable } from '@angular/core';
import { Headers, Http, Request, RequestOptions, Response, XHRBackend } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class BaseService {
    constructor(public http: HttpClient) {
    }

    get(bookId) {
        return this.http.get('https://bookbhook.in/api/savour/draft/' + bookId);
    }

    post(postBody: any, bookId) {
        if (bookId != "") {
            return this.put(bookId, postBody);
        } else {
            return this.http.post("https://bookbhook.in/api/savour/draft", postBody, {});
        }
    }

    delete(bookId) {
        return this.http.delete("https://bookbhook.in/api/savour/draft/" + bookId);
    }

    put(bookId, putData) {
        const url = "https://bookbhook.in/api/savour/draft/" + bookId;
        return this.http.put(url, putData);
    }
}