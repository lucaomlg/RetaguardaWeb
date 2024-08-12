import { Component, input, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MenuItem } from '../rotas-side-nav/rotas-side-nav.component';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-item-menu',
  standalone: true,
  imports: [MatListModule, RouterModule, MatIcon],
  templateUrl: './item-menu.component.html',
  styleUrl: './item-menu.component.scss',
  animations: [
    trigger('expandirRecursoFilho', [
      transition(':enter', [
        style({ height: '0px', opacity: 0 }),
        animate('200ms ease-in-out', style({ height: '*', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in-out', style({ height: '0px', opacity: 0 }))
      ])
    ])
  ]
})
export class ItemMenuComponent {
  item = input.required<MenuItem>();
  collapsed = input(false);

  recursoFilhoAberto = signal(false);

  toggleRecursoFilhoAberto() {
    if (!this.item().filhos) {
      return;
    }

    this.recursoFilhoAberto.set(!this.recursoFilhoAberto());
  }
}
