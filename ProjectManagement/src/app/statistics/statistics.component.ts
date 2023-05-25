import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { DataService } from '../services/data.service';
// import Highmaps from 'highcharts/highmaps
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit{
  selectedProject: any;
  chartData: any[] = [];
  constructor(
     private taskService:DataService,
     ) {}

  ngOnInit(): void {
    this.taskService.currentTasks.subscribe(selectedProject=>this.selectedProject=selectedProject)
    this.calculateIsActiveCounts();
  }

  calculateIsActiveCounts() {
    if(this.selectedProject){

    const trueCount = this.selectedProject.TaskList.filter((task: { IsActive: any; }) => task.IsActive).length;
    const falseCount = this.selectedProject.TaskList.filter((task: { IsActive: any; }) => !task.IsActive).length;

    this.chartData = [
      { name: 'Active', y: trueCount ,color: '#eeeeee' },
      { name: 'Inactive', y: falseCount ,color: '#f854dc' }
    ];

      this.pieChart = new Chart({
        chart: {
          type: 'pie',
          plotShadow: false,
        },
        credits: {
          enabled: false,
        },
        plotOptions: {
          pie: {
            innerSize: '99%',
            borderWidth: 10,
            borderColor: '',
            slicedOffset: 10,
            dataLabels: {
              connectorWidth: 0,
            },
          },
        },
        title: {
          verticalAlign: 'middle',
          floating: true,
          text: 'Tasks',
        },
        legend: {
          enabled: false,
        },
        series: [
          {
            type: 'pie',
            data: this.chartData,
          },
        ],
        accessibility: {
          enabled: false
        },
      });

    }
  }

  pieChart=new Chart({
    chart: {
      type: 'pie',
      plotShadow: false,
    },

    credits: {
      enabled: false,
    },

    plotOptions: {
      pie: {
        innerSize: '99%',
        borderWidth: 10,
        borderColor: '',
        slicedOffset: 10,
        dataLabels: {
          connectorWidth: 0,
        },
      },
    },

    title: {
      verticalAlign: 'middle',
      floating: true,
      text: 'Tasks',
    },

    legend: {
      enabled: false,
    },

    accessibility: {
      enabled: false
    },
  })
}
