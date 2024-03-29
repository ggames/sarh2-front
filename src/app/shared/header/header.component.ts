import { Router } from '@angular/router';
import { TokenService } from './../../services/token.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent implements OnInit {
  @Input()
  titulo!: string;

  isLogged = false;

  constructor(private router: Router, private tokenService: TokenService) {}

  ngOnInit(): void {}

  onLogOut() {
    this.tokenService.logOut();

    this.router.navigate(['login']);
  }
}
