import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import * as d3 from 'd3';
import { DataService } from '../data.service';


@Component({
  selector: 'pb-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})

export class PieComponent implements OnInit {

  public dataSource = {
    datasets: [
      {
        data: [],
        backgroundColor: [
          '#ffcd56',
          '#ff6384',
          '#36a2eb',
          '#fd6b19',
          '#FF8A33',
          '#33BEFF',
          '#33FF8D',
          '#3390FF',
        ],
      },
    ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [],
  };



  private dataD3 = [];
  private myData = [];
  private newData = [];
  private myTitle = [];
  private theBudget = [];

  private svg;
  private margin = 50;
  private width = 450;
  private height = 450;
  // The radius of the pie chart is half the smallest side
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors;

  private createSvg(): void {
    this.svg = d3.select("figure#pie")
    .append("svg")
    .attr("width", this.width)
    .attr("height", this.height)
    .append("g")
    .attr(
      "transform",
      "translate(" + this.width / 2 + "," + this.height / 2 + ")"
    );
}


private createColors(): void {
  //console.log(this.dataservice.dataSource)
  this.colors = d3.scaleOrdinal()
  // .domain(this.myData.map(d => d.budget.toString()))
  .domain(this.myData.map(d => d.budget.toString()))

  .range(['#ffcd56',
                '#ff6384',
                '#36a2eb',
                '#fd6b19',
                '#23CFCF',
                '#F82D0D',
                '#2F895E']);
}

private drawChart(): void {
  // Compute the position of each group on the pie:
  const pie = d3.pie<any>().value((d: any) => Number(d.budget));

  // Build the pie chart
  this.svg
  .selectAll('pieces')
  .data(pie(this.dataD3))
  .enter()
  .append('path')
  .attr('d', d3.arc()
    .innerRadius(0)
    .outerRadius(this.radius)
  )
  .attr('fill', (d, i) => (this.colors(i)))
  .attr("stroke", "#121926")
  .style("stroke-width", "1px");

  // Add labels
  const labelLocation = d3.arc()
  .innerRadius(100)
  .outerRadius(this.radius);

  this.svg
  .selectAll('pieces')
  .data(pie(this.dataD3))
  .enter()
  .append('text')
  .text(d => d.data.title)
  .attr("transform", d => "translate(" + labelLocation.centroid(d) + ")")
  .style("text-anchor", "middle")
  .style("font-size", 10);
}


  // constructor(private http: HttpClient) { }
  constructor(public dataservice: DataService) {}

  ngOnInit(): void {

    this.dataservice.getData().subscribe((res) => {
      console.log(res);
      this.dataD3 = res.myBudget;
      for (var i = 0; i < res.myBudget.length; i++) {
        this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
        this.dataSource.labels[i] = res.myBudget[i].title;
      }
    this.createSvg();
    this.createColors();
    this.drawChart();

  });

}

}
