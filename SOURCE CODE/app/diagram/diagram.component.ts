import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Chart, registerables } from "chart.js";
import {UsersHttpService} from "../services/users-http.service";

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss']
})
export class DiagramComponent implements OnInit, AfterViewChecked {

  // @ViewChild('htmlCanvasElement') canvas: HTMLCanvasElement = new HTMLCanvasElement()
  @ViewChild('htmlCanvasElement') canvas: ElementRef = new ElementRef('htmlCanvasElement')
  // @ViewChild('htmlCanvasElement') canvas: any
  myChart: any;
  chartLabels = ['...29', '30-39', '40-49', '50-59', '60-69', '70...'];


  constructor(private usersService: UsersHttpService) { }

  ngOnInit(): void {
    Chart.register(...registerables);
  }

  ngAfterViewChecked(): void {
    // console.log('Canvas', this.canvas)
    //this.canvas = <HTMLCanvasElement>(document.getElementById('myCanvas'));
    if (this.usersService.chartFlag) {
      if(this.myChart) {this.myChart.destroy()}
      let data = [0, 0, 0, 0, 0, 0];
      let dataLastIndex = data.length - 1;
      // console.log(this.usersService.users[1].dob.age)
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
        type: "bar", //line, bar , radar ...
        data: {
          labels: this.chartLabels,   // values on X
          datasets: [{
            label: '1000 Random Users',
            data, // data: data
            backgroundColor: ['red', 'orange', 'yellow', 'green', 'blue', 'violet'], // for each bars own color
            borderColor: 'black',         //['red', 'green', 'blue', 'yellow', 'gray'],
            borderWidth: 2
          }]
        },
        options: {
          // maintainAspectRatio: false
        }
      })
      this.usersService.chartFlag = false;
    }
  }
}
