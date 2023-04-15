import { HttpclientService } from './../../services/httpclient.service';
import { Observable } from 'rxjs';
import { IMenu } from './../../core/Interface/IMenu';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as data from '../../../assets/menu.json';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // console.log('ENTROOOOOO' + JSON.stringify(data));
    /*  this.http
      .get('../../assets/menu.json')
      .subscribe((data) => console.log(JSON.stringify(data))); */
  }
}
