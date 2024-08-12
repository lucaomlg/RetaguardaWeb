import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginService } from '../services/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenInfo: any;
  private headers: HttpHeaders;
  static isLoggedIn:boolean;

  constructor(private http: HttpClient, private router: Router) {
    this.headers = new HttpHeaders();
    AuthService.isLoggedIn = LoginService.isLoggedIn();
  }

  setTokenInfo(data: any): void {
    this.tokenInfo = data;
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('TokenInfo', JSON.stringify(this.tokenInfo));
    }
    this.setHeader();
  }

  getTokenInfo(): any {
    return this.tokenInfo;
  }

  removeToken(): void {
    this.headers = this.headers.delete('Authorization');
    this.headers = this.headers.delete('Content-Type');
    this.tokenInfo = null;
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.removeItem('TokenInfo');
    }
  }

  private setHeader(): void {
    if (this.tokenInfo && this.tokenInfo.token) {
      this.headers = this.headers.set('Authorization', `Bearer ${this.tokenInfo.token}`);
      this.headers = this.headers.set('Content-Type', 'application/json');
    }
  }

  // init(): void {
  //   if (typeof sessionStorage !== 'undefined') {
  //     const tokenInfo = sessionStorage.getItem('TokenInfo');
  //     if (tokenInfo && tokenInfo !== 'null') {
  //       this.setTokenInfo(JSON.parse(tokenInfo));
  //       if (location.href.includes('/login')) {
  //         this.router.navigate(['/home']);
  //       }
  //     } else {
  //       this.router.navigate(['/login']);
  //     }
  //   }
  // }

  clearHeaders(): void {
    this.headers = new HttpHeaders();
  }

}