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
  public data: any[] = [];
  public leafItemSettings: any;
  public tooltipSettings: any;

  constructor(private covidService: CovidService) {}

  ngOnInit() {
    this.covidService.getAllData().subscribe(res => {
      // Chỉ lấy 1 record cho mỗi province (province có Recovered cao nhất)
      const provinceMap: Record<string, CovidData> = {};
      res.forEach(item => {
        if (!provinceMap[item.province] || item.recovered > provinceMap[item.province].recovered) {
          provinceMap[item.province] = item;
        }
      });

      const list = Object.values(provinceMap);

      // Tính tổng recovered để làm % share
      const totalRecovered = list.reduce((sum, item) => sum + item.recovered, 0);

      // Gắn thêm tỷ lệ %
      this.data = list.map(item => ({
        ...item,
        recoveredRate: totalRecovered > 0 ? ((item.recovered / totalRecovered) * 100).toFixed(2) : '0'
      }));

      this.leafItemSettings = {
        labelPath: 'province',
        labelFormat: '${province}\n ${recovered}\n(${recoveredRate}%)',
        colorValuePath: 'recovered',
        colorMapping: [
          { from: 0, to: 1000, color: '#f1f8e9' },
          { from: 1001, to: 10000, color: '#aed581' },
          { from: 10001, to: 100000, color: '#7cb342' },
          { from: 100001, to: Infinity, color: '#33691e' }
        ]
      };

      this.tooltipSettings = {
        visible: true,
        format: '${country} - ${province}<br/>Confirmed: ${confirmed}<br/>Deaths: ${deaths}<br/>Recovered: ${recovered}<br/>Active: ${active}<br/>Recovered Share: ${recoveredRate}%'
      };
    });
  }
}
