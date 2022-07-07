import { Component, OnInit } from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';

import {UsersHttpService} from "./services/users-http.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations:[
    trigger('rotatedState', [
        state('rotated', style({ transform: 'rotate(360deg)' })),
      transition('* => rotated', animate('3000ms ease-in')),
      transition('rotated => *', animate('1ms ease-out'))
    ])
  ]
})
export class AppComponent implements OnInit {
  necessaryRefreshes = 5;
  refreshCounter = 0;
  state = '';

  constructor(protected usersService: UsersHttpService) {
  }

  ngOnInit(): void {
    if(sessionStorage.getItem('notFirst') && sessionStorage.getItem('counter')) {
      this.refreshCounter = +sessionStorage.getItem('counter')! + 1;
      sessionStorage.setItem('counter', this.refreshCounter.toString());
    } else {
      sessionStorage.setItem('notFirst', 'true');
      sessionStorage.setItem('counter', '1');
    }
  }

  rotateMe() {
    this.state = 'rotated';
  }

  getUsers() {
    this.usersService.loadingFlag = true;
    this.rotateMe();
    this.usersService.getUsers();
  }
}
