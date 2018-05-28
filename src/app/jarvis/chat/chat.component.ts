import {
    AfterViewChecked, Component, ComponentFactoryResolver, ElementRef, OnInit, ViewChild,
    ViewContainerRef
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageComponent} from '../message/message.component';
// import {HttpService} from '../../services/http.service';
// import {HeaderService} from './../../services/header.service';
import {messageData} from "./message.dummy_data";

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked {

    @ViewChild('inputMessage') inputEl: ElementRef;
    @ViewChild('container', {read: ViewContainerRef}) container;
    @ViewChild('chatScroll') private myScrollContainer: ElementRef;
    public message: string;


    constructor(private router: Router, private route: ActivatedRoute, private resolver: ComponentFactoryResolver) {
       // this.headerService.setHeader('Jarvis');
    }

    ngOnInit() {
        this.addToMessagesList({
            text: 'Hi there! Welcome to Jarvis. Please start by typing something in the input box to get results.For starters, you can try with the keyword "help".',
            isIncoming: true
        });
    }

    ngAfterViewChecked() {
        this.scrollToBottom();
    }

    scrollToBottom(): void{
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch (err) { }
    }

    sendMessage() {
        if (this.message === '' || this.message === undefined) {
            return;
        } else {
            this.addToMessagesList({
                text: this.message,
                isIncoming: false
            });
            if (this.message.toUpperCase() === 'DEMO') {
                const randomMessage: any[] = messageData[Math.floor(Math.random() * messageData.length)];
                randomMessage['isIncoming'] = true;
                this.addToMessagesList(randomMessage);
            } else {
                // this.httpService.getResponseMessage(this.message).subscribe(response => {                     
                //     if(!response){
                //         this.addToMessagesList({
                //             text: 'Oops. An error occured. Please try again',
                //             isIncoming: true
                //         });
                //     } else if(!response['attachments']) {
                //         response['isIncoming'] = true;                    
                //         this.addToMessagesList({
                //             text: "Sorry, this keyword hasn't been integrated in our system",
                //             isIncoming: true
                //         });
                //     } else {
                //         response['isIncoming'] = true;
                //         this.addToMessagesList(response);
                //     }           
                // });
            }
        }
        this.message = '';   
    }

    addToMessagesList(data: Object) {
        const componentFactory = this.resolver.resolveComponentFactory(MessageComponent);
        const dynamicComponent = <MessageComponent>this.container.createComponent(componentFactory).instance;
        dynamicComponent.message = data;
        dynamicComponent.getButtonCommand().subscribe(command => {
            if (command !== '') {
                this.message = command;
                this.inputEl.nativeElement.focus();
            } else {
                return;
            }
        });
    }
}
