import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { ChatWindowComponent } from '../chat-window/chat-window.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ChatWindowComponent,LoginComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  showChatWindow: boolean = false;
  showLoginWindow: boolean = false;
  loggedIn: boolean = false;
  userName: string = '';

  toggleChatWindow() {
    this.showChatWindow = !this.showChatWindow;
  }

  toggleLoginWindow() {
    this.showLoginWindow = !this.showLoginWindow;
  }

  handleLogin(userData: any) {
    this.loggedIn = true;
    this.userName = userData.name;
  }

  logout(){
    this.loggedIn = false;
    this.userName = '';
  }
}
