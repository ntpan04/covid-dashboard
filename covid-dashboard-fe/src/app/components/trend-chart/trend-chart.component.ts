// src/app/components/trend-chart/trend-chart.component.ts
import { Component, OnInit } from '@angular/core';
import { CovidService } from '../../services/covid.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-trend-chart',
  template: `<canvas id="trendChart"></canvas>`
})
export class TrendChartComponent implements OnInit {
  constructor(private covidService: CovidService) {}

  ngOnInit() {
    this.covidService.getCountryTrend(1).subscribe(res => {
      const dates = res.value.map((x: any) => x.reportDate);
      const confirmed = res.value.map((x: any) => x.confirmed);

      new Chart('trendChart', {
        type: 'line',
        data: {
          labels: dates,
          datasets: [{ label: 'Ca nhiễm', data: confirmed, borderColor: 'red' }]
        }
      });
    });
  }
}
