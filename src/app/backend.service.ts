import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private backendUrl = 'http://localhost:3000'; // Replace with your actual backend URL
  user = new BehaviorSubject<User | null>(null) 
  constructor(private http: HttpClient) { }

  //  username ,frist name, last name, password, confirmpassword and token
  saveData(data: any) {
    return this.http.post(`${this.backendUrl}/save`, data); // Adjust endpoint as necessary
  }

  // username nad password
  login(credentials: { username: string, password: string }) {
    return this.http.post(`${this.backendUrl}/login`, credentials);
  }

  // username ,frist name, last name, password, confirmpassword
  register(userInfo: { firstName: string; lastName: string; username: string; password: string; }) {
    return this.http.post(`${this.backendUrl}/register`, userInfo).pipe(
      tap((response: any) => {
        console.log(response);
        if (response) {
          const user = new User(
            response.firstName,
            response.lastName,
            response.username,
            response.token, 
            response.tokenExpiry 
          );
          this.user.next(user); 
        }
      })
    );
  }

  

}
