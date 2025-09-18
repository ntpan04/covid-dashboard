import { Component, OnInit } from '@angular/core';
import { TreeMapModule } from '@syncfusion/ej2-angular-treemap';
import { CovidData, CovidService } from '../../services/covid.service';

@Component({
  standalone: true,  
  selector: 'app-confirmed',
  imports: [TreeMapModule],
  templateUrl: './confirmed.component.html',
  styleUrls: ['./confirmed.component.scss']
})
export class ConfirmedComponent implements OnInit {
  public data: any[] = [];
  public leafItemSettings: any;
  public tooltipSettings: any;

  constructor(private covidService: CovidService) {}

  ngOnInit() {
    this.covidService.getAllData().subscribe(res => {
      // Chỉ lấy 1 record cho mỗi province (chọn province có số Confirmed lớn nhất)
      const provinceMap: Record<string, CovidData> = {};
      res.forEach(item => {
        if (!provinceMap[item.province] || item.confirmed > provinceMap[item.province].confirmed) {
          provinceMap[item.province] = item;
        }
      });

      const list = Object.values(provinceMap);

      // Tính tổng confirmed toàn bộ để làm % share
      const totalConfirmed = list.reduce((sum, item) => sum + item.confirmed, 0);

      // Gắn thêm tỷ lệ %
      this.data = list.map(item => ({
        ...item,
        confirmedRate: totalConfirmed > 0 ? ((item.confirmed / totalConfirmed) * 100).toFixed(2) : '0'
      }));

      this.leafItemSettings = {
        labelPath: 'province',
        labelFormat: '${province}\n ${confirmed}\n(${confirmedRate}%)',
        colorValuePath: 'confirmed',
        colorMapping: [
          { from: 0, to: 10000, color: '#d4f1f4' },
          { from: 10001, to: 100000, color: '#75e6da' },
          { from: 100001, to: 1000000, color: '#189ab4' },
          { from: 1000001, to: Infinity, color: '#05445e' }
        ]
      };

      this.tooltipSettings = {
        visible: true,
        format: '${country} - ${province}<br/>Confirmed: ${confirmed}<br/>Deaths: ${deaths}<br/>Recovered: ${recovered}<br/>Active: ${active}<br/>Confirmed Share: ${confirmedRate}%'
      };
    });
  }
}
