import {
    AfterViewChecked, Component, ComponentFactoryResolver, ElementRef, OnInit, ViewChild, ComponentRef,
    ViewContainerRef, HostListener
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageComponent } from '../message/message.component';
import { BaseService } from '../../services/base.services';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked {

    @ViewChild('inputMessage') inputEl: ElementRef;
    @ViewChild('container', { read: ViewContainerRef }) container;
    @ViewChild('chatScroll') private myScrollContainer: ElementRef;
    private dynamicComponentRef: ComponentRef<MessageComponent>;

    public messageLeft: string;
    public messageHeading: string;
    public messageRight: string;
    public author: string;
    public authorLeft: string;
    public authorRight: string;
    public left: boolean;
    public heading: boolean;
    closeResult: string;
    public bookName: string = "";
    public bookWriter: string = "";
    public bookId: string = "";
    public bookContent: Array<object> = [];
    public responseMessage: string = "";
    public openResponseMessage: string = "";
    public newInnerHeight: any;
    public newInnerWidth: any;
    public IsMobile: boolean = false;

    constructor(private router: Router, private route: ActivatedRoute, private resolver: ComponentFactoryResolver, private modalService: NgbModal, private baseService: BaseService) {
        // User screen size
        const screenWidth = window.screen.width;
        if (screenWidth < 768) {
            this.IsMobile = true;
        }
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.newInnerWidth = event.target.innerWidth;
        if (this.newInnerWidth < 768) {
            this.IsMobile = true;
        } else {
            this.IsMobile = false;
        }
    }

    ngOnInit() {

    }

    ngAfterViewChecked() {
        this.scrollToBottom();
    }

    scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollIntoView(false);
        } catch (err) { }
    }

    sendMessage(containerId) {
        var TextMessage = '';
        var TextAuthor = '';
        var directionLeft = false;
        var heading = false;
        if (containerId == 1) {
            TextMessage = this.messageLeft;
            TextAuthor = this.authorLeft;
            directionLeft = true;
        }
        if (containerId == 2) {
            TextMessage = this.messageHeading;
            heading = true;
        }
        if (containerId == 3) {
            TextMessage = this.messageRight;
            TextAuthor = this.authorRight;
        }
        if (TextMessage === '' || TextMessage === undefined) {
            return;
        } else {
            if (this.left && !this.heading) {
                this.author = this.authorLeft;
            }
            else {
                this.author = this.authorRight;
            }
            this.addToMessagesList({
                messageNumber: this.bookContent.length == 0 ? 0 : (this.bookContent[this.bookContent.length - 1]["messageNumber"] + 1),
                author: TextAuthor,
                message: TextMessage,
                left: directionLeft || false,
                heading: heading || false
            });
            if (containerId == 1) {
                this.messageLeft = "";
            }
            if (containerId == 2) {
                this.messageHeading = "";
            }
            if (containerId == 3) {
                this.messageRight = "";
            }
        }
    }

    addToMessagesList(data: Object) {
        let componentFactory = this.resolver.resolveComponentFactory(MessageComponent);
        this.dynamicComponentRef = this.container.createComponent(componentFactory);
        this.dynamicComponentRef.instance.message = data;
        this.dynamicComponentRef.instance.deleteMessageFromJson.subscribe((value: any) => {
            this.deleteMessages(value);
        });
        this.dynamicComponentRef.instance._ref = this.dynamicComponentRef;
        this.bookContent.push(data);
    }

    deleteMessages(messageNumber: number) {
        this.bookContent.forEach((element, index) => {
            if (element["messageNumber"] == messageNumber) {
                this.bookContent.splice(index, 1);
            }
        });
    }

    open(content) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    getBookDetail() {
        this.baseService.get(this.bookId).subscribe(
            res => {
                if (res["success"]) {
                    this.bookId = res["data"]._id;
                    this.bookName = res["data"].title;
                    this.bookWriter = res["data"].submitted_by;
                    var data = res["data"].summary.content;
                    data.forEach((element, index) => {
                        var content = {
                            messageNumber: index,
                            author: element.author,
                            message: element.message,
                            left: element.left,
                            heading: element.heading
                        };
                        this.addToMessagesList(content);
                    });
                    var msg = "Your book has been opened successfuly.";
                    this.openResponseMessage = msg;
                }
            },
            err => {
                console.log(err);
            }
        );
    }

    saveBookDetails() {
        var jsonData: Object = {
            "title": this.bookName,
            "author": this.bookWriter,
            "content": this.bookContent
        };

        this.baseService.post(jsonData, this.bookId).subscribe(
            res => {
                if (res["success"]) {
                    this.bookId = res["data"];
                    var msg = "Your book has been saved/updated successfuly.You can use the below book id for edit and other purpose. Book Id = " + res["data"];
                    this.responseMessage = msg;
                }
            },
            err => {
                console.log(err);
            }
        );
    }

}
