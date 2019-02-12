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

    public messageLeft: string = "";
    public messageHeading: string = "";
    public messageRight: string = "";
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
    public msgTypeLeft: string = "Text";
    public msgTypeRight: string = "Text";
    public msgTypeEdit: string;
    public modalHeader: string = "Update Message";
    public btnText: string = "Update";
    toggledmessageHeading: boolean = false;
    toggledmessageRight: boolean = false;
    toggledmessageLeft: boolean = false;
    noScroll : boolean =false;

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
        
    }

    scrollToBottom(): void {
        try {
            if(!this.noScroll){
            this.myScrollContainer.nativeElement.scrollIntoView(false);
            }
        } catch (err) { }
    }

    openModal() {
        this.display = 'block';
    }

    handleSelectionHeading(event) {
        this.messageHeading += event.char;
    }

    handleSelectionRight(event) {
        this.messageRight += event.char;
    }

    handleSelectionLeft(event) {
        this.messageLeft += event.char;
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
        this.noScroll = false;
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

            var data = {
                messageNumber: this.bookContent.length == 0 ? 1 : (this.bookContent[this.bookContent.length - 1]["messageNumber"] + 1),
                author: TextAuthor,
                left: directionLeft || false,
                heading: heading || false,
                value: TextMessage,
            };
            if (containerId == 1) {
                data["msgType"] = this.msgTypeLeft;
                if (this.msgTypeLeft == "GIF") {
                    data["gif"] = true;
                    data["imgUrl"] = TextMessage;
                }
                if (this.msgTypeLeft == "Image") {
                    data["gif"] = false;
                    data["imgUrl"] = TextMessage;
                }
                if (this.msgTypeLeft == "Video") {
                    data["videoId"] = TextMessage;
                }
                if (this.msgTypeLeft == "Text") {
                    data["message"] = TextMessage;
                }
            }

            if (containerId == 2) {
                data["msgType"] = "Text";
                data["message"] = TextMessage;
            }

            if (containerId == 3) {
                data["msgType"] = this.msgTypeRight;
                if (this.msgTypeRight == "GIF") {
                    data["gif"] = true;
                    data["imgUrl"] = TextMessage;
                }
                if (this.msgTypeRight == "Image") {
                    data["gif"] = false;
                    data["imgUrl"] = TextMessage;
                }
                if (this.msgTypeRight == "Video") {
                    data["videoId"] = TextMessage;
                }
                if (this.msgTypeLeft == "Text") {
                    data["message"] = TextMessage;
                }
            }

            this.addToMessagesList(data);
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
        this.scrollToBottom();
    }

    addToMessagesList(data: Object) {
        let componentFactory = this.resolver.resolveComponentFactory(MessageComponent);
        this.dynamicComponentRef = this.container.createComponent(componentFactory);
        this.dynamicComponentRef.instance.message = data;
        this.dynamicComponentRef.instance._ref = this.dynamicComponentRef;
        this.bookContent.push(data);
        this.countBookContent();
        this.dynamicComponentRef.instance.deleteMessageFromJson.subscribe((value: any) => {
            this.deleteMessages(value);
        });
        this.dynamicComponentRef.instance.editMessageFromJson.subscribe((value: any) => {
            this.editMessage(value.messageNumber, value.isNewMsg);
        });
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
        this.noScroll = true;
        this.isNewMsg = isNewMsg;
        if (isNewMsg) {
            this.modalHeader = "Insert New Message";
            this.btnText = "Insert";
        } else {
            this.modalHeader = "Update Message";
            this.btnText = "Update";
        }
        this.openEditModal();
        this.bookContent.forEach((element, index) => {
            if (element["messageNumber"] == messageNumber) {
                this.messageId = messageNumber;
                if (element["heading"]) {
                    this.isHeading = true;
                    this.editheading = true;
                    this.editTextMessage = element["value"];
                    this.msgTypeEdit = "Text";
                } else {
                    if (element["left"]) {
                        this.isHeading = false;
                        this.isLeftDirection = true;
                        this.editleft = true;
                        this.editAuthor = element["author"];
                        this.editTextMessage = element["value"];
                    }
                    else {
                        this.isHeading = false;
                        this.isLeftDirection = false;
                        this.editleft = false;
                        this.editAuthor = element["author"];
                        this.editTextMessage = element["value"];
                        this.msgTypeEdit = "Text"
                        if (element["videoId"]) {
                            this.msgTypeEdit = "Video";
                        } else if (element["gif"]) {
                            this.msgTypeEdit = "GIF";
                        } else {
                            this.msgTypeEdit = "Image";
                        }
                    }
                    if (element["videoId"]) {
                        this.msgTypeEdit = "Video";
                    } else if (element["gif"]) {
                        this.msgTypeEdit = "GIF";
                    } else if (element["imgUrl"]) {
                        this.msgTypeEdit = "Image";
                    } else {
                        this.msgTypeEdit = "Text";
                    }
                }
            }
        });
        this.countBookContent();
        this.scrollToBottom();
    }

    changeMessage() {
        this.isHeading = !this.isHeading;
    }

    changeDirection() {
        this.isLeftDirection = !this.isLeftDirection;
    }

    updateMessage(messageId: number) {
        let updatedData = Object.assign([], this.bookContent);
        this.bookContent.forEach((element, index) => {
            if (element["messageNumber"] == messageId) {
                if (!this.isNewMsg) {
                    var msgNo = element["messageNumber"];
                    element = {
                        messageNumber: msgNo
                    };

                    if (this.isHeading) {
                        element["heading"] = true;
                        element["left"] = false;
                        element["author"] = "";
                        element["value"] = this.editTextMessage;
                    } else {
                        if (this.isLeftDirection) {
                            element["heading"] = false;
                            element["left"] = true;
                            element["author"] = this.editAuthor;
                            element["value"] = this.editTextMessage;
                        }
                        else {
                            element["heading"] = false;
                            element["left"] = false;
                            element["author"] = this.editAuthor;
                            element["value"] = this.editTextMessage;
                        }
                    }
                    element["msgType"] = this.msgTypeEdit;
                    if (this.msgTypeEdit == "GIF") {
                        element["gif"] = true;
                        element["imgUrl"] = this.editTextMessage;
                    }
                    if (this.msgTypeEdit == "Image") {
                        element["imgUrl"] = this.editTextMessage;
                        element["gif"] = false;
                    }
                    if (this.msgTypeEdit == "Video") {
                        element["videoId"] = this.editTextMessage;
                        element["gif"] = false;
                    }
                    if (this.msgTypeEdit == "Text") {
                        element["gif"] = false;
                        element["message"] = this.editTextMessage;
                    }
                    this.bookContent[index] = element;

                } else {
                    var content = {
                        messageNumber: index != 0 ? ((this.bookContent[index - 1]["messageNumber"] + messageId) / 2) : (messageId / 2),
                        author: this.editAuthor,
                        value: this.editTextMessage,
                        left: this.isLeftDirection,
                        heading: this.isHeading,
                        msgType: this.msgTypeEdit
                    };
                    if (this.msgTypeEdit == "GIF") {
                        content["gif"] = true;
                        content["imgUrl"] = this.editTextMessage;
                    }
                    if (this.msgTypeEdit == "Image") {
                        content["imgUrl"] = this.editTextMessage;
                        content["gif"] = false;
                    }
                    if (this.msgTypeEdit == "Video") {
                        content["videoId"] = this.editTextMessage;
                        content["gif"] = false;
                    }
                    if (this.msgTypeEdit == "Text") {
                        content["gif"] = false;
                        content["message"] = this.editTextMessage;
                    }
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
                    left: element["left"],
                    heading: element["heading"],
                    msgType: element["msgType"]
                };
                if (element["heading"]) {
                    content["value"] = element["value"];
                    content["message"] = element["value"];
                }

                if (element.msgType == "GIF") {
                    content["gif"] = true;
                    content["imgUrl"] = element["imgUrl"];
                    content["value"] = element["imgUrl"];
                }
                if (element.msgType == "Image") {
                    content["imgUrl"] = element["imgUrl"];
                    content["value"] = element["imgUrl"];
                    content["gif"] = false;
                }
                if (element.msgType == "Video") {
                    content["videoId"] = element["videoId"];
                    content["value"] = element["videoId"];
                }
                if (element.msgType == "Text") {
                    content["message"] = element["value"];
                    content["value"] = element["value"];
                }
                this.addToMessagesList(content);
            });
        } else {
            this.container.clear();
            this.bookContent.forEach((element, index) => {
                let componentFactory = this.resolver.resolveComponentFactory(MessageComponent);
                this.dynamicComponentRef = this.container.createComponent(componentFactory);
                this.dynamicComponentRef.instance.message = element;
                this.dynamicComponentRef.instance.deleteMessageFromJson.subscribe((value: any) => {
                    this.deleteMessages(value);
                });
                this.dynamicComponentRef.instance.editMessageFromJson.subscribe((value: any) => {
                    this.editMessage(value.messageNumber, value.isNewMsg);
                });
                this.dynamicComponentRef.instance._ref = this.dynamicComponentRef;
            });
        }
        this.countBookContent();
        this.scrollToBottom();
    }

    open(content) {
        this.responseMessage = "";
        this.openResponseMessage = "";
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
        this.openResponseMessage = "";
        this.baseService.get(this.bookId).subscribe(
            res => {
                if (res["success"]) {
                    this.bookId = res["data"]._id;
                    this.bookName = res["data"].title;
                    this.bookWriter = res["data"].submitted_by;
                    var data = res["data"].summary.content;
                    data.forEach((element, index) => {
                        var type = element.msgType || 'Text';
                        var content = {
                            messageNumber: element.messageNumber || (index + 1),
                            author: element.author,
                            left: element.left,
                            heading: element.heading,
                            msgType: type
                        };
                        if (type == "GIF") {
                            content["gif"] = true;
                            content["imgUrl"] = element.imgUrl;
                            content["value"] = element.imgUrl;
                        }
                        if (type == "Image") {
                            content["imgUrl"] = element.imgUrl;
                            content["value"] = element.imgUrl;
                            content["gif"] = false;
                        }
                        if (type == "Video") {
                            content["videoId"] = element.videoId;
                            content["value"] = element.videoId;
                        }
                        if (type == "Text") {
                            content["message"] = element.message || "";
                            content["value"] = element.message || "";
                        }
                        this.addToMessagesList(content);
                    });
                    var msg = "Your chat story has been opened successfuly.";
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
                    var msg = "Your chat story is saved successfuly.You can use the below book id for editing and future references. \nBook Id =" + res["data"];
                    this.responseMessage = msg;
                    // this.wordCount = 0;
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
            if ("message" in element) {
                words += element["message"].split(' ').length;
            }
        });
        this.wordCount = words;
    }
}