import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ChatService} from "../../services/chat.service";
import {MessageClass} from "../../shared/message/message-class.model";

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {
  @ViewChild('messageInput') messageInput: ElementRef;
  responses: MessageClass[] = [];
  error: string = '';

  ngOnInit(): void {
  }

  constructor(private chatService: ChatService) {
    this.messageInput = new ElementRef(null);
  }

  sendMessage() {
    const messageText = this.messageInput.nativeElement.value;
    this.responses.push(new MessageClass('user', messageText));
    this.chatService.generateContent(messageText).subscribe(response => {
      this.responses.push(new MessageClass('ai', response.choices[0].text.toString()));
        this.error = '';
    },
      error => {
        console.log(error.message);
        this.error = error.message;
      }
    );
  }

  copyMessage(val: string){
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

}
