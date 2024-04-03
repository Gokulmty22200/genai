import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private apiURL: string = ''; // API URL Here

  constructor(
    private httpService: HttpClient
  ) { }

  getHeaders(): HttpHeaders {
    const currentUserData = localStorage.getItem('currentUser');
    const currentUser = currentUserData ? JSON.parse(currentUserData) : null;
    const token = currentUser ? currentUser.token : null;
    const headers = new HttpHeaders();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }


  sendUserMessage(message: string){
    const headers = this.getHeaders();
    return this.httpService.post(this.apiURL, {message}, {headers});
  }

  loginUser(userName: string, password: string){
    const loginCred = {userName,password};
    const headers = this.getHeaders();
    return this.httpService.post(this.apiURL,loginCred, {headers});
  }
}
