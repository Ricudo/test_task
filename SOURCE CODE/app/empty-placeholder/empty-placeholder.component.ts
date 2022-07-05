import { Component, OnInit } from '@angular/core';
import {MyErrorService} from "../services/my-error.service";

@Component({
  selector: 'app-empty-placeholder',
  templateUrl: './empty-placeholder.component.html',
  styleUrls: ['./empty-placeholder.component.scss']
})
export class EmptyPlaceholderComponent implements OnInit {

  constructor(protected myErrorService: MyErrorService) { }

  ngOnInit(): void {
  }

}
