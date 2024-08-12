import { Injectable } from '@angular/core';
import { MenuItem } from '../../components/rotas-side-nav/rotas-side-nav.component';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavMenuService {

  private static listaRecursosSubject = new BehaviorSubject<MenuItem[]>([{ id: '' ,titulo: 'Login', icone: 'supervisor_account', recurso: 'login' }]);
  static listaRecursos$ = NavMenuService.listaRecursosSubject.asObservable();

  static setListaRecursos(novosRecursos: MenuItem[]) {
    if (NavMenuService.listaRecursosSubject.getValue() !== novosRecursos) {
      NavMenuService.listaRecursosSubject.next(novosRecursos);
    }
  }

  static getListaRecursos(): MenuItem[] {
    return NavMenuService.listaRecursosSubject.getValue();
  }

}
