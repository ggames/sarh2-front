import { HttpclientService } from './../../services/httpclient.service';
import { IMenu } from './../../core/Interface/IMenu';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.css'],
})
export class SidenavbarComponent implements OnInit {
  menuList!: Observable<IMenu[]>;

  @Output()
  tituloModulo: EventEmitter<string> = new EventEmitter<string>();

  constructor(private httpService: HttpclientService) {}

  ngOnInit(): void {
    this.menuList = this.httpService.getList<IMenu>('../../assets/menu.json');
  }

  tituloModuloCambiar(menu: any) {
    this.tituloModulo.emit(menu.text);
  }
}
