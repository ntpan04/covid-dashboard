import { Component, OnInit } from '@angular/core';
import { TreeMapModule } from '@syncfusion/ej2-angular-treemap';
import { CovidData, CovidService } from '../../services/covid.service';

@Component({
  standalone: true,  
  selector: 'app-death',
  imports: [TreeMapModule],
  templateUrl: './death.component.html',
  styleUrls: ['./death.component.scss']
})
export class DeathComponent implements OnInit {
  public data: CovidData[] = [];
  public leafItemSettings: any;
  public tooltipSettings: any;

  constructor(private covidService: CovidService) {}

  ngOnInit() {
    this.covidService.getAllData().subscribe(res => {
      // Chỉ lấy 1 record cho mỗi country nếu có nhiều Province
      const provinceMap: Record<string, CovidData> = {};
      res.forEach(item => {
        if (!provinceMap[item.province] || item.deaths > provinceMap[item.province].deaths) {
          provinceMap[item.province] = item;
        }

      });
      this.data = Object.values(provinceMap);

      this.leafItemSettings = {
        labelPath: 'province',
        colorValuePath: 'deaths',
        colorMapping: [
          { from: 0, to: 1000, color: '#ade8f4' },
          { from: 1001, to: 10000, color: '#48cae4' },
          { from: 10001, to: 50000, color: '#0096c7' },
          { from: 50001, to: Infinity, color: '#023e8a' }
        ]
      };

      this.tooltipSettings = {
        visible: true,
        format: '${province}: ${deaths} deaths'
      };
    });
  }
}