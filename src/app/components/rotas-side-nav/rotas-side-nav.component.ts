import { CommonModule } from '@angular/common';
import { Component, computed, inject, Input, signal, Injectable, OnInit, OnDestroy } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { ItemMenuComponent } from "../item-menu/item-menu.component";
import { NavMenuService } from '../../services/navMenu/nav-menu.service';
import { Subscription } from 'rxjs';


export type MenuItem =
{
  id: string;
  idPai?: string;
  titulo: string;
  icone: string;
  recurso?: string;  
  filhos?: MenuItem[];
}

@Component({
  selector: 'app-rotas-side-nav',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, ItemMenuComponent],
  templateUrl: './rotas-side-nav.component.html',
  styleUrl: './rotas-side-nav.component.scss'
})

export class RotasSideNavComponent implements OnInit, OnDestroy {
  private subscription: Subscription | undefined;



  sideNavCollapsed = signal(false);

  @Input() set collapsed(val:boolean) {
    this.sideNavCollapsed.set(val);
  }

  
  menuItens = signal<MenuItem[]>([]);

  logoWidth = computed(()=> this.sideNavCollapsed()? '35px' : '100px');
  logoHeight = computed(()=> this.sideNavCollapsed()? 'auto' : 'auto');

  ngOnInit() {
    this.subscription = NavMenuService.listaRecursos$.subscribe(novosRecursos => {
      this.menuItens.set(novosRecursos);
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
