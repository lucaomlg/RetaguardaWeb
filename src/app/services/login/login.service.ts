import { inject, Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service';
import { AuthData } from '../../interfaces/auth-data';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

interface UserInfo {
  accessToken: string;
  userName: string;
  recursos: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginServiceURL = environment.apiUrl + 'token';
  private userInfo: UserInfo | null = null;
  authData: AuthData = {
    authenticationData: {
      IsAuthenticated: false,
      userName: '',
      recursos: [],
      accessToken: ''
    }
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(AuthService) private authenticationService: AuthService
  ) {
    if (typeof localStorage !== 'undefined') {
      const tokenInfo = localStorage.getItem('TokenInfo');
      if (tokenInfo) {
        try {
          this.userInfo = JSON.parse(tokenInfo);
          this.authenticationService.setTokenInfo(this.userInfo);
          this.authData.authenticationData.IsAuthenticated = true;
          this.authData.authenticationData.userName = this.userInfo?.userName || '';
          this.authData.authenticationData.recursos = this.userInfo?.recursos ? JSON.parse(this.userInfo.recursos) : [];
          this.authData.authenticationData.accessToken = this.userInfo?.accessToken || '';
        } catch (error) {
          console.error('Error parsing TokenInfo from localStorage:', error);
          localStorage.removeItem('TokenInfo');
        }
      }
    }
}

  login(userName: string, password: string): Observable<any> {
    const data = `grant_type=password&username=${userName}&password=${encodeURIComponent(password)}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this.http.post<any>(this.loginServiceURL, data, { headers }).pipe(
      map(response => {
        if (response) {
          this.userInfo = {
            accessToken: response.access_token,
            userName: response.userName,
            recursos: response.recursos
          };
          this.authData.authenticationData.IsAuthenticated = true;
          this.authData.authenticationData.userName = response.userName;
          this.authData.authenticationData.recursos = JSON.parse(response.recursos);
          this.authenticationService.setTokenInfo(this.userInfo);
          localStorage.setItem('TokenInfo', JSON.stringify(this.userInfo));

          // Redirecionar para a página /home após login bem-sucedido
          if (this.authData.authenticationData.IsAuthenticated) {
            this.router.navigate(['/home']);
          }
        } else {
          throw new Error('Invalid response structure');
        }

        console.log('Login successful:', response);
        var retorno: any = { Mensagem: 'Login efetuado com sucesso!', data: response, erro: false };
        console.log(retorno);
        return [retorno];
      }),
      catchError(error => {
        console.error('Login error:', error);
        localStorage.removeItem('TokenInfo');
        var retorno: any = { Mensagem: 'Usuário ou senha incorretos!', data: error, erro: true };
        return [retorno];
      }));
  }

  logOut(): void {
    this.authenticationService.removeToken();
    this.authData.authenticationData.IsAuthenticated = false;
    this.authData.authenticationData.userName = '';
    this.authData.authenticationData.recursos = [];
    localStorage.removeItem('TokenInfo');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('TokenInfo') !== null;
  }
}