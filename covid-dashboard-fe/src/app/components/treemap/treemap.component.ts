// src/app/components/treemap/treemap.component.ts
import { Component, OnInit } from '@angular/core';
import { CovidService } from '../../services/covid.service';

@Component({
    selector: 'app-treemap',
    template: `<plotly-plot [data]="data" [layout]="layout"></plotly-plot>`,
    standalone: false
})
export class TreemapComponent implements OnInit {
  data: any;
  layout: any;

  constructor(private covidService: CovidService) {}

  ngOnInit() {
    this.covidService.getTopCountries(10).subscribe(res => {
      this.data = [{
        type: 'treemap',
        labels: res.value.map((c: any) => c.country.countryName),
        values: res.value.map((c: any) => c.totalConfirmed),
        parents: res.value.map(() => '')
      }];
      this.layout = { title: 'Top 10 Quốc gia theo số ca' };
    });
  }
}
