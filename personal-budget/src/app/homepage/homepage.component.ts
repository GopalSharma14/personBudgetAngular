import { Component, AfterViewInit, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Chart } from 'chart.js';
// import * as d3 from 'd3';
import { DataService } from '../data.service';



@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  private dataD3 = [];
  public  dataSource = {
    datasets: [{
        data: [],
        backgroundColor: [
            '#ffcd56',
            '#ff6384',
            '#36a2eb',
            '#fd6b19',
            '#23CFCF',
            '#F82D0D',
            '#2F895E'
        ]
    }],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: []
};

   //constructor(private http: HttpClient) { }
  constructor(private dataService: DataService) {
    //console.log(this.dataService.dataSource.datasets[0])
   }


   ngOnInit(): void {
//     this.http.get('http://localhost:3000/budget')
//     .subscribe((res: any) => {
//       console.log(res.myBudget)

//       for (var i = 0; i < res.myBudget.length; i++) {
//         this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
//         this.dataSource.labels[i] = res.myBudget[i].title;
//     }
//     this.createChart();
// console.log(this.dataSource)
//     });
    // console.log(this.dataService.myData)
    // for (var i = 0; i < res.myBudget.length; i++) {
    //       this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
    //       this.dataSource.labels[i] = res.myBudget[i].title;
    //   }
    this.dataService.getData().subscribe((res) => {
      console.log(res);
      this.dataD3 = res.myBudget;
      for (var i = 0; i < res.myBudget.length; i++) {
        this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
        this.dataSource.labels[i] = res.myBudget[i].title;
      }

      //calls to functions to create charts
      this.createChart();
    });

      this.createChart();



  }

  createChart() {
    //console.log(this.dataService.dataSource)

    var ctx = document.getElementById("myChart");
    var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: this.dataSource
        //data: this.dataSource
    });

}

}
