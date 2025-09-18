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
  public data: any[] = [];
  public leafItemSettings: any;
  public tooltipSettings: any;

  constructor(private covidService: CovidService) {}

  ngOnInit() {
    this.covidService.getAllData().subscribe(res => {
      // Chỉ giữ lại record có số ca tử vong lớn nhất cho mỗi province
      const provinceMap: Record<string, CovidData> = {};
      res.forEach(item => {
        if (!provinceMap[item.province] || item.deaths > provinceMap[item.province].deaths) {
          provinceMap[item.province] = item;
        }
      });

      // Tính thêm deathRate %
      this.data = Object.values(provinceMap).map(item => ({
        ...item,
        deathRate: item.confirmed > 0 ? ((item.deaths / item.confirmed) * 100).toFixed(2) : '0'
      }));

      // Label trực tiếp trong từng ô
      this.leafItemSettings = {
        labelPath: 'province',
        labelFormat: '${province}\nDeaths: ${deaths}\n(${deathRate}%)',
        colorValuePath: 'deaths',
        colorMapping: [
          { from: 0, to: 1000, color: '#ade8f4' },
          { from: 1001, to: 10000, color: '#48cae4' },
          { from: 10001, to: 50000, color: '#0096c7' },
          { from: 50001, to: Infinity, color: '#023e8a' }
        ]
      };

      // Tooltip vẫn giữ để xem chi tiết
      this.tooltipSettings = {
        visible: true,
        format: '${country} - ${province}<br/>Confirmed: ${confirmed}<br/>Deaths: ${deaths}<br/>Recovered: ${recovered}<br/>Active: ${active}<br/>Death Rate: ${deathRate}%'
      };
    });
  }
}
