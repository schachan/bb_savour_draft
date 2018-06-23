import {
    AfterViewChecked, Component, ComponentFactoryResolver, ElementRef, OnInit, ViewChild,
    ViewContainerRef
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageComponent } from '../message/message.component';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked {

    @ViewChild('inputMessage') inputEl: ElementRef;
    @ViewChild('container', { read: ViewContainerRef }) container;
    @ViewChild('chatScroll') private myScrollContainer: ElementRef;
    public message: string;
    public author: string;
    public authorLeft: string;
    public authorRight: string;
    public left: boolean;
    public heading: boolean;

    constructor(private router: Router, private route: ActivatedRoute, private resolver: ComponentFactoryResolver) {
        // this.headerService.setHeader('Jarvis');
    }

    ngOnInit() {
        this.addToMessagesList({
            message: 'Hi there! Welcome to Bookbhook Chat Book Editor. Please start by typing something in the input box to get results.',
            left: true,
            heading: true,
            author: ''
        });
    }

    ngAfterViewChecked() {
        this.scrollToBottom();
    }

    scrollToBottom(): void {
        try {
            // this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
            this.myScrollContainer.nativeElement.scrollIntoView(false);
        } catch (err) { }
    }

    sendMessage() {
        debugger;
        if (this.message === '' || this.message === undefined) {
            return;
        } else {
            if (this.left && !this.heading) {
                this.author = this.authorLeft;
            }
            else {
                this.author = this.authorRight;
            }
            this.addToMessagesList({
                author: this.author,
                message: this.message,
                left: this.left || false,
                heading: this.heading || false
            });
            // if (this.message.toUpperCase() === 'DEMO') {
            //     const randomMessage: any[] = messageData[Math.floor(Math.random() * messageData.length)];
            //     randomMessage['left'] = true;
            //     this.addToMessagesList(randomMessage);
            // }
        }
        this.message = '';
    }

    addToMessagesList(data: Object) {
        const componentFactory = this.resolver.resolveComponentFactory(MessageComponent);
        const dynamicComponent = <MessageComponent>this.container.createComponent(componentFactory).instance;
        dynamicComponent.message = data;
    }
}
