import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MyErrorService} from "./my-error.service";

export interface Users {
  info: object,
  results: Result[]
}

export interface Result {
  dob: {
    age: number
  }
}

@Injectable({
  providedIn: 'root'
})
export class UsersHttpService {

  users: Result[] = [{
    dob: {
      age: 1
    }
  }];
  tableFlag: boolean = false;
  chartFlag: boolean = false;
  loadingFlag: boolean = false
  baseUrl = 'https://randomuser.me/api/?results=1000&nat=fr&gender=male';

  constructor(private http: HttpClient, private myErrorService: MyErrorService) { }

  getUsers() {
    this.http.get<Users>(this.baseUrl)
      .subscribe( (resp)  => {
          if(resp.hasOwnProperty('results')) {
            let users = resp.results;
            this.users = users.sort((a, b) =>
              b.dob.age-a.dob.age);
            this.tableFlag = true;
            this.chartFlag = true;
            this.loadingFlag = false;
          } else {
            this.myErrorService.showHttpError({
              error: 'no user for chart',
              message: 'no user for table'
            })
          }
    },
        er => this.myErrorService.showHttpError(er),
    )
  }
}
