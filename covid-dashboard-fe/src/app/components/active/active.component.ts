import { Component, OnInit } from '@angular/core';
import { TreeMapModule } from '@syncfusion/ej2-angular-treemap';
import { CovidData, CovidService } from '../../services/covid.service';

@Component({
  standalone: true,  
  selector: 'app-active',
  imports: [TreeMapModule],
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.scss']
})
export class ActiveComponent implements OnInit {
  public data: CovidData[] = [];
  public leafItemSettings: any;
  public tooltipSettings: any;

  constructor(private covidService: CovidService) {}

  ngOnInit() {
    this.covidService.getAllData().subscribe(res => {
      // Chỉ lấy 1 record cho mỗi country (province có Active cao nhất)
      const provinceMap: Record<string, CovidData> = {};
      res.forEach(item => {
        if (!provinceMap[item.province] || item.active > provinceMap[item.province].active) {
          provinceMap[item.province] = item;
        }

      });
      this.data = Object.values(provinceMap);

      this.leafItemSettings = {
        labelPath: 'province',
        colorValuePath: 'active',
        colorMapping: [
          { from: 0, to: 1000, color: '#e0f7fa' },
          { from: 1001, to: 10000, color: '#80deea' },
          { from: 10001, to: 100000, color: '#26c6da' },
          { from: 100001, to: Infinity, color: '#006064' }
        ]
      };

      this.tooltipSettings = {
        visible: true,
        format: '${province}: ${active} active cases'
      };
    });
  }
}
