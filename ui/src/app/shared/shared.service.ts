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

  sendUserMessage(message: string){
    return this.httpService.post(this.apiURL, {message});

    // For Using API Call with headers use below.
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization': 'token......'
    // });

    // return this.httpService.post(this.apiURL, {message}, {headers});
  }
}
