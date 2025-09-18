import { Component, OnInit } from '@angular/core';
import { TreeMapModule } from '@syncfusion/ej2-angular-treemap';
import { CovidData, CovidService } from '../../services/covid.service';

@Component({
  standalone: true,  
  selector: 'app-recovered',
  imports: [TreeMapModule],
  templateUrl: './recovered.component.html',
  styleUrls: ['./recovered.component.scss']
})
export class RecoveredComponent implements OnInit {
  public data: CovidData[] = [];
  public leafItemSettings: any;
  public tooltipSettings: any;

  constructor(private covidService: CovidService) {}

  ngOnInit() {
    this.covidService.getAllData().subscribe(res => {
      // Chỉ lấy 1 record cho mỗi country (province có Recovered cao nhất)
      const countryMap: Record<string, CovidData> = {};
      res.forEach(item => {
        if (!countryMap[item.Country] || item.Recovered > countryMap[item.Country].Recovered) {
          countryMap[item.Country] = item;
        }
      });
      this.data = Object.values(countryMap);

      this.leafItemSettings = {
        labelPath: 'Country',
        colorValuePath: 'Recovered',
        colorMapping: [
          { from: 0, to: 1000, color: '#f1f8e9' },
          { from: 1001, to: 10000, color: '#aed581' },
          { from: 10001, to: 100000, color: '#7cb342' },
          { from: 100001, to: Infinity, color: '#33691e' }
        ]
      };

      this.tooltipSettings = {
        visible: true,
        format: '${Country}: ${Recovered} recovered cases'
      };
    });
  }
}
