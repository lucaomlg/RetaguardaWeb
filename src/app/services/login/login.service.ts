import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service';
import { AuthData } from '../../interfaces/auth-data';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
      recursos: '',
      accessToken: ''
    }
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(AuthService) private authenticationService: AuthService,
    @Inject(ToastrService) private toastr: ToastrService) {
    if (typeof sessionStorage !== 'undefined') {
      const tokenInfo = sessionStorage.getItem('TokenInfo');
      if (tokenInfo) {
        try {
          this.userInfo = JSON.parse(tokenInfo);
          this.authenticationService.setTokenInfo(this.userInfo);
          this.authData.authenticationData.IsAuthenticated = true;
          this.authData.authenticationData.userName = this.userInfo?.userName || '';
          this.authData.authenticationData.recursos = this.userInfo?.recursos ? JSON.parse(this.userInfo.recursos) : [];
          this.authData.authenticationData.accessToken = this.userInfo?.accessToken || '';
        } catch (error) {
          console.error('Error parsing TokenInfo from sessionStorage:', error);
          sessionStorage.removeItem('TokenInfo');
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
          const { access_token, userName, recursos } = response;
          this.userInfo = {
            accessToken: access_token,
            userName: userName,
            recursos: typeof recursos === 'string' ? JSON.parse(recursos) : recursos
          };
          this.authData.authenticationData = {
            IsAuthenticated: true,
            userName: userName,
            recursos: this.userInfo.recursos
          };
          this.authenticationService.setTokenInfo(this.userInfo);
          sessionStorage.setItem('TokenInfo', JSON.stringify(this.userInfo));

          if (this.authData.authenticationData.IsAuthenticated) {
            AuthService.isLoggedIn = true
            this.router.navigate(['/home']);
          }
        } else {
          throw new Error('Invalid response structure');
        }

        console.log('Login successful:', response);
        const retorno = { Mensagem: 'Login efetuado com sucesso!', data: response, erro: false };
        console.log(retorno);
        return [retorno];
      }),
      catchError(error => {
        console.error('Login error:', error);
        // localStorage.removeItem('TokenInfo');
        this.toastr.error('Usuário ou senha incorretos!', 'Erro!');
        const retorno = { Mensagem: 'Usuário ou senha incorretos!', data: error, erro: true };
        return [retorno];
      })
    );
  }

  static isLoggedIn(): boolean {
    if (typeof sessionStorage !== 'undefined') {
      return sessionStorage.getItem('TokenInfo') !== null;
    } else return false;
  }

  logOut(): void {
    this.authenticationService.removeToken();
    this.authData.authenticationData.IsAuthenticated = false;
    this.authData.authenticationData.userName = '';
    this.authData.authenticationData.recursos = '';
    sessionStorage.removeItem('TokenInfo');
  }

}