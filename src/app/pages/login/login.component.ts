import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { MenuItem } from '../../components/rotas-side-nav/rotas-side-nav.component';
import { ToastrService } from 'ngx-toastr';
import { NavMenuService } from '../../services/navMenu/nav-menu.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginService = inject(LoginService);
  router = inject(Router);
  toastr = inject(ToastrService);
  navMenuService = inject(NavMenuService);
  

  protected loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });



   onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.loginService.login(this.loginForm.value.username!, this.loginForm.value.password!)
        .subscribe(response => {
          // Atualize os itens do menu após login bem-sucedido
          console.log('Depois do subscribe: ', response);
      
          if(response.erro)
            {
              this.toastr.error(response.Mensagem, 'Erro ao efetuar login');
              return;
            }

          var listaRecursos: MenuItem[] = [];

          const recursosArray = JSON.parse(response[0].data.recursos);


          if (Array.isArray(recursosArray)) {
            recursosArray.forEach((recurso: any) => {
              listaRecursos.push({
                icone: 'dashboard',
                recurso: 'login',
                titulo: recurso.Menu
              });
            });
          }

          NavMenuService.setListaRecursos(listaRecursos);

          console.log(response);
        });
    }
  }
}