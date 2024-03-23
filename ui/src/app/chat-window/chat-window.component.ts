import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [CommonModule, FormsModule  ],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss'
})
export class ChatWindowComponent {
  showChat: boolean = true;
  message: string = '';

  toggleChat() {
    this.showChat = !this.showChat;
  }

  sendMessage() {
    // Implement sending message functionality here
    console.log('Message sent:', this.message);
    this.message = '';
  }
}
