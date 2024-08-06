import { Component, computed, Injectable, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { RotasSideNavComponent } from "./components/rotas-side-nav/rotas-side-nav.component";



@Injectable()
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, MatIconModule, MatSidenavModule, MatToolbarModule, MatListModule, CommonModule, RotasSideNavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  titulo = 'Retaguarda';
  collapsed = signal(false);
  sideNavWidth = computed(() => this.collapsed() ? '65px' : '250px');

}
