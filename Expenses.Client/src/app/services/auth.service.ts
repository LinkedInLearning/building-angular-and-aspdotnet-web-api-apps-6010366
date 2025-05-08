import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, tap } from 'rxjs';
import { AuthResponse } from '../models/authresponse';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://localhost:7145/api/Auth';

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: User): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(this.apiUrl+"/Login", credentials)
                    .pipe(
                      tap((response) => {
                        localStorage.setItem('token', response.token);
                      })
                    )
  }

  register(credentials: User): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(this.apiUrl+"/Register", credentials)
                    .pipe(
                      tap((response) => {
                        localStorage.setItem('token', response.token);
                      })
                    )
  }
  
  logout():void {
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
  }

}
