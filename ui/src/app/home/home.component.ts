import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChatWindowComponent } from '../chat-window/chat-window.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ChatWindowComponent,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  showChatWindow: boolean = false;
  
  toggleChatWindow() {
    this.showChatWindow = !this.showChatWindow;
  }
}
