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
    display = 'none';
    public editAuthor: string = "";
    public editTextMessage: string = "";
    public editleft: boolean = false;
    public editheading: boolean = false;
    public isHeading: boolean = false;
    public isLeftDirection: boolean = false;
    editDisplay = 'none';
    public messageId: number = 1;
    public wordCount: number = 0;
    public isNewMsg: boolean = false;


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
        this.openModal();
    }

    ngAfterViewChecked() {
        this.scrollToBottom();
    }

    scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollIntoView(false);
        } catch (err) { }
    }

    openModal() {
        this.display = 'block';
    }

    openEditModal() {
        this.editTextMessage = "";
        this.editAuthor = "";
        this.editDisplay = 'block';
    }

    onCloseHandledEdit() {
        this.editDisplay = 'none';
    }

    onCloseHandled() {
        this.display = 'none';
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
                messageNumber: this.bookContent.length == 0 ? 1 : (this.bookContent[this.bookContent.length - 1]["messageNumber"] + 1),
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
        this.dynamicComponentRef.instance.editMessageFromJson.subscribe((value: any) => {
            this.editMessage(value.messageNumber, value.isNewMsg);
        });
        this.dynamicComponentRef.instance._ref = this.dynamicComponentRef;
        this.bookContent.push(data);
        this.countBookContent();
    }

    deleteMessages(messageNumber: number) {
        this.bookContent.forEach((element, index) => {
            if (element["messageNumber"] == messageNumber) {
                this.bookContent.splice(index, 1);
                this.countBookContent();
            }
        });
    }

    editMessage(messageNumber: number, isNewMsg: boolean) {
        this.isNewMsg = isNewMsg;
        this.openEditModal();
        this.bookContent.forEach((element, index) => {
            if (element["messageNumber"] == messageNumber) {
                this.messageId = messageNumber;
                if (element["heading"]) {
                    this.isHeading = true;
                    this.editheading = true;
                    this.editTextMessage = element["message"];
                } else {
                    if (element["left"]) {
                        this.isHeading=false;
                        this.isLeftDirection = true;
                        this.editleft = true;
                        this.editAuthor = element["author"];
                        this.editTextMessage = element["message"];
                    }
                    else {
                        this.isHeading=false;
                        this.isLeftDirection = false;
                        this.editleft = false;
                        this.editAuthor = element["author"];
                        this.editTextMessage = element["message"];
                    }
                }
            }
        });
        this.countBookContent();
    }

    changeMessage() {
        this.isHeading = !this.isHeading;
    }

    changeDirection() {
        this.isLeftDirection = !this.isLeftDirection;
    }

    updateMessage(messageId: number) {
        let updatedData= Object.assign([], this.bookContent);
        this.bookContent.forEach((element, index) => {
            if (element["messageNumber"] == messageId) {
                if (!this.isNewMsg) {
                    if (this.isHeading) {
                        element["heading"] = true;
                        element["left"] = false;
                        element["author"] = "";
                        element["message"] = this.editTextMessage;
                    } else {
                        if (this.isLeftDirection) {
                            element["heading"] = false;
                            element["left"] = true;
                            element["author"] = this.editAuthor;
                            element["message"] = this.editTextMessage;
                        }
                        else {
                            element["heading"] = false;
                            element["left"] = false;
                            element["author"] = this.editAuthor;
                            element["message"] = this.editTextMessage;
                        }
                    }
                } else {
                    var content = {
                        messageNumber: index != 0 ? ((this.bookContent[index - 1]["messageNumber"] + messageId) / 2) : (messageId/2),
                        author: this.editAuthor,
                        message: this.editTextMessage,
                        left: this.isLeftDirection,
                        heading: this.isHeading
                    };
                    updatedData.splice(index, 0, content);
                }
                this.onCloseHandledEdit();
            }
        });
        if (this.isNewMsg) {
            this.container.clear();
            this.bookContent = [];
            updatedData.forEach((element, index) => {
                var content = {
                    messageNumber: element["messageNumber"],
                    author: element["author"],
                    message: element["message"],
                    left: element["left"],
                    heading: element["heading"]
                };
                this.addToMessagesList(content);
            });
        }
        this.countBookContent();
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
            "content": this.bookContent,
            "wordCount": this.wordCount
        };

        this.baseService.post(jsonData, this.bookId).subscribe(
            res => {
                if (res["success"]) {
                    this.bookId = res["data"];
                    var msg = "Your book has been saved/updated successfuly.You can use the below book id for edit and other purpose. Book Id = " + res["data"];
                    this.responseMessage = msg;
                    this.wordCount = 0;
                }
            },
            err => {
                console.log(err);
            }
        );
    }

    countBookContent() {
        var words = 0;
        this.bookContent.forEach((element, index) => {
            words += element["message"].split(' ').length;
        });
        this.wordCount = words;
    }

}
