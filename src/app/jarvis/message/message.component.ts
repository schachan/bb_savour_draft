import { AfterViewChecked, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from "rxjs/Observable";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.css']
})

export class MessageComponent implements OnInit {
    _ref: any;
    private _buttonCommand: BehaviorSubject<any>;
    @Input() message: any;
    @Output() deleteMessageFromJson = new EventEmitter();
    @Output() editMessageFromJson = new EventEmitter();
    @Input()
    public youtubeurl: string = 'https://www.youtube.com/embed/';
    urlSafe: SafeResourceUrl;

    constructor(public sanitizer: DomSanitizer) {
        this._buttonCommand = new BehaviorSubject("");
    }

    ngOnInit() {
        if (this.message["videoId"] && this.message["videoId"] != '') {
            return this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.youtubeurl + this.message["videoId"]);
        }else{
            return this.urlSafe;
        }
    }

    deleteMessage(messageNumber: number) {
        this._ref.destroy();
        this.deleteMessageFromJson.emit(messageNumber);
    }

    editMessage(messageNumber: number, isNewMsg: boolean) {
        var data = {
            messageNumber: messageNumber,
            isNewMsg: isNewMsg
        };
        this.editMessageFromJson.emit(data);
    }

    // removeObject() {
    //     this._ref.destroy();
    // }

    getButtonCommand(): Observable<any> {
        return this._buttonCommand.asObservable();
    }

    setButtonCommand(command: any) {
        this._buttonCommand.next(command);
    }

    sendButtonCommand(command) {
        this.setButtonCommand(command);
    }

}
