import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Chart, registerables } from "chart.js";

import {UsersHttpService} from "../services/users-http.service";

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss']
})
export class DiagramComponent implements OnInit, AfterViewChecked {

  @ViewChild('htmlCanvasElement') canvas: ElementRef = new ElementRef('htmlCanvasElement')

  myChart: any;
  chartLabels = ['...29', '30-39', '40-49', '50-59', '60-69', '70...'];

  constructor(private usersService: UsersHttpService) { }

  ngOnInit(): void {
    Chart.register(...registerables);
  }

  ngAfterViewChecked(): void {
    if (this.usersService.chartFlag) {
      if(this.myChart) {
        this.myChart.destroy()
      }
      let data = [0, 0, 0, 0, 0, 0];
      let dataLastIndex = data.length - 1;
      for(let i = 0; i < (this.usersService.users.length); i++) {
        let a = +this.usersService.users[i].dob.age
        a = Math.floor(a / 10)
        if(a < 3) {
          data[0]++;
        } else if (a < 7) {
          data[a-2]++;
        } else {
          data[dataLastIndex]++;
        }
      }
      this.myChart = new Chart(this.canvas.nativeElement, {
        type: "bar",
        data: {
          labels: this.chartLabels,
          datasets: [{
            label: '',
            data,
            backgroundColor: ['red', 'orange', 'yellow', 'green', 'blue', 'violet'],
            borderColor: 'black',
            borderWidth: 2
          }]
        },
        options: {
          plugins: {
            legend: {
              display: false
            }
          }
        }
      })
      this.usersService.chartFlag = false;
    }
  }
}
