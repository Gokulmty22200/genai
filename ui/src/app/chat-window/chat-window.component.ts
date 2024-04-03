import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { SharedService } from '../shared/shared.service';
import { Message } from '../shared/message';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule ],
  providers: [DatePipe],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss'
})
export class ChatWindowComponent implements OnInit{
  showChat: boolean = true;
  messages: Message[] = [];
  chatForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private sharedService: SharedService
  ){}
  ngOnInit(): void {
    this.buildForm();
    this.setInitResponseMessage();
  }

  buildForm(): void{
    this.chatForm = this.formBuilder.group({
      message: ['']
    })
  }

  setInitResponseMessage(){
    const initMessageData = {
      message: 'Hi there! How can we assist you today?',
      time: this.datePipe.transform(new Date(), 'HH:mm'),
      isInput: false
    }
    this.messages.push(initMessageData)
  }

  toggleChat() {
    this.showChat = !this.showChat;
  }

  sendMessage() {
    const messageData = this.chatForm?.value.message;
    const currentDateAndTime = this.datePipe.transform(new Date(), 'HH:mm');
    if(messageData){
      this.messages.push({message:messageData,time:currentDateAndTime, isInput: true});
      this.sharedService.sendUserMessage(messageData)
      .subscribe((response: any) => {
        if(response){
          this.messages.push({message: response.message, time: response.time, isInput: false})
        }
      },
      error =>{
        //Error handling pending
        this.messages.push({message: 'Message not Sent', time: currentDateAndTime, isInput: false});
        console.log(error);
      })
    }
    console.log(this.messages);
    this.chatForm?.reset();
  }
}
