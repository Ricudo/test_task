import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {Result, UsersHttpService} from "../services/users-http.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterContentChecked{

  constructor(private usersService: UsersHttpService ) { }

  tableUsers: any;
  tableKeys: string[] = [];

  ngOnInit(): void {
  }

  ngAfterContentChecked(): void {
    if (this.usersService.tableFlag) {
      // console.log('ngAfterContentChecked');
      let users: Result[] = this.usersService.users.slice();
      users.length = 10;
      this.tableUsers = users;
      this.tableKeys = Object.keys(users[0])
      // console.log(this.tableUsers);
      // console.log(this.tableKeys);
      this.usersService.tableFlag = false;
    }
  }
}
