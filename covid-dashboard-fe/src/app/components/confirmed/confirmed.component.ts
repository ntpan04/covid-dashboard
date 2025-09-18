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
  public data: CovidData[] = [];
  public leafItemSettings: any;
  public tooltipSettings: any;

  constructor(private covidService: CovidService) {}

  ngOnInit() {
    this.covidService.getAllData().subscribe(res => {
      // Chỉ lấy 1 record cho mỗi country (chọn province có số Confirmed lớn nhất)
      const countryMap: Record<string, CovidData> = {};
      res.forEach(item => {
        if (!countryMap[item.Country] || item.Confirmed > countryMap[item.Country].Confirmed) {
          countryMap[item.Country] = item;
        }
      });
      this.data = Object.values(countryMap);

      this.leafItemSettings = {
        labelPath: 'Country',
        colorValuePath: 'Confirmed',
        colorMapping: [
          { from: 0, to: 10000, color: '#d4f1f4' },
          { from: 10001, to: 100000, color: '#75e6da' },
          { from: 100001, to: 1000000, color: '#189ab4' },
          { from: 1000001, to: Infinity, color: '#05445e' }
        ]
      };

      this.tooltipSettings = {
        visible: true,
        format: '${Country}: ${Confirmed} confirmed cases'
      };
    });
  }
}
