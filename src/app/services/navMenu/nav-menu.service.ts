import { Injectable } from '@angular/core';
import { MenuItem } from '../../components/rotas-side-nav/rotas-side-nav.component';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavMenuService {

  private static listaRecursosSubject = new BehaviorSubject<MenuItem[]>([ { titulo: 'Login', icone: 'dashboard' , recurso: 'login' }]);
  static listaRecursos$ = NavMenuService.listaRecursosSubject.asObservable();

  static listaRecursos: MenuItem[] = [];

  // static getListaRecursos(): MenuItem[] {

  //   if (this.listaRecursos.length < 1) {
  //     this.listaRecursos = [{ titulo: 'Login', icone: 'dashboard', recurso: 'login' }]
  //     return this.listaRecursos;
  //   }
  //   else
  //     return this.listaRecursos;
  // }

  // static setListaRecursos(listaRecursos: MenuItem[]): void {
  //   this.listaRecursos = listaRecursos;
  // }

  static setListaRecursos(novosRecursos: MenuItem[]) {
    
    NavMenuService.listaRecursosSubject.next(novosRecursos);
  }

  static getListaRecursos(): MenuItem[] {
    return NavMenuService.listaRecursosSubject.getValue();
  }

}
