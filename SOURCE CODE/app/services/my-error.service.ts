import { Injectable } from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";

export interface MyError {
  error: string,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class MyErrorService {

  constructor() { }

  myError = '';
  myErrorMessage = '';
  myErrorFlag = false;

  showHttpError(error: HttpErrorResponse | MyError) {
    this.myErrorFlag = true;
    this.myError = error.error;
    this.myErrorMessage = error.message;
  }
}
