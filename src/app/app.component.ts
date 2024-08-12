import { Component, computed, Injectable, signal, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { RotasSideNavComponent } from "./components/rotas-side-nav/rotas-side-nav.component";
import { NgxSpinnerModule } from 'ngx-spinner';



@Injectable()
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, MatIconModule, MatSidenavModule, MatToolbarModule, MatListModule, CommonModule, RotasSideNavComponent, NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  titulo = 'Retaguarda';
  collapsed = signal(false);
  sideNavWidth = computed(() => this.collapsed() ? '72px' : '250px');
  constructor(private router: Router) {}

  isLoginRoute(): boolean {
    return this.router.url === '/login';
  }

}
