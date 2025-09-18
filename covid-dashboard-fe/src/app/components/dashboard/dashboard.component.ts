// src/app/components/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CovidService } from '../../services/covid.service';

@Component({
    selector: 'app-dashboard',
    template: `
    <h1>COVID-19 Dashboard</h1>
    <div *ngIf="summary">
      <p>Tổng ca: {{ summary.totalConfirmed }}</p>
      <p>Tử vong: {{ summary.totalDeaths }}</p>
      <p>Hồi phục: {{ summary.totalRecovered }}</p>
    </div>
    <app-trend-chart></app-trend-chart>
    <app-map></app-map>
    <app-treemap></app-treemap>
  `,
    standalone: false
})
export class DashboardComponent implements OnInit {
  summary: any;

  constructor(private covidService: CovidService) {}

  ngOnInit() {
    this.covidService.getGlobalSummary().subscribe(res => {
      this.summary = res.value[0];
    });
  }
}
