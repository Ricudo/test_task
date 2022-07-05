import { Component, OnInit } from '@angular/core';
import {UsersHttpService} from "./services/users-http.service";
import {HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'DenysVyshnevskyi';
  necessaryRefreshes = 5;
  refreshCounter = 0;

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

  getUsers() {
    this.usersService.loadingFlag = true;
    this.usersService.getUsers()
  }
}
