// src/app/components/map/map.component.ts
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { CovidService } from '../../services/covid.service';

@Component({
  selector: 'app-map',
  template: `<div id="map" style="height:400px;"></div>`
})
export class MapComponent implements OnInit {
  constructor(private covidService: CovidService) {}

  ngOnInit() {
    const map = L.map('map').setView([20, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    this.covidService.getTopCountries(10).subscribe(res => {
      res.value.forEach((c: any) => {
        const lat = c.country.latitude;
        const lng = c.country.longitude;
        L.circleMarker([lat, lng], { radius: 8, color: 'red' })
          .addTo(map)
          .bindPopup(`${c.country.countryName}: ${c.totalConfirmed} ca`);
      });
    });
  }
}
