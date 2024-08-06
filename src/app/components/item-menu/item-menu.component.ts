import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MenuItem } from '../rotas-side-nav/rotas-side-nav.component';

@Component({
  selector: 'app-item-menu',
  standalone: true,
  imports: [MatListModule, RouterModule,MatIcon],
  templateUrl: './item-menu.component.html',
  styleUrl: './item-menu.component.scss'
})
export class ItemMenuComponent {
  item = input.required<MenuItem>();
  collapsed = input(false);
}
