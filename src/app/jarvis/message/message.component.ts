import { AfterViewChecked, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from "rxjs/Observable";
import { MarkdownService } from 'ngx-markdown';

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.css']
})

export class MessageComponent implements OnInit {

    private _buttonCommand: BehaviorSubject<any>;
    @Input() message: any;

    constructor(private markdownService: MarkdownService) {
        this._buttonCommand = new BehaviorSubject("");
    }

    ngOnInit() {
        this.markdownService.renderer.paragraph = (text: string) => {
            return text;
        }
    }

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
