import {AfterContentChecked, Component} from '@angular/core';

import {Result, UsersHttpService} from "../services/users-http.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterContentChecked {

  constructor(private usersService: UsersHttpService ) {}

  tableUsers: any;
  tableKeys: string[] = [];

  ngAfterContentChecked(): void {
    if (this.usersService.tableFlag) {
      let users: Result[] = this.usersService.users.slice();
      users.length = 10;
      this.tableUsers = users;
      this.tableKeys = Object.keys(users[0])
      this.usersService.tableFlag = false;
    }
  }
}
