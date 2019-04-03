import { Component, OnInit } from '@angular/core';
import {User} from '../../../../shared/models/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  date: Date = new Date();
  user: User;
  constructor(private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse( window.localStorage.getItem('user') );
  }

  onLogout() {
    window.localStorage.clear();
    this.router.navigate(['/login']);
  }
}
