// src/app/services/covid.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface CovidData {
  Id: number;
  Country: string;
  Province: string;
  Confirmed: number;
  Deaths: number;
  Recovered: number;
  Active: number;
  Date: string;
}
@Injectable({ providedIn: 'root' })
export class CovidService {
  private baseUrl = 'https://localhost:5001/odata'; // backend ASP.NET Core OData

  constructor(private http: HttpClient) {}

    // Lấy tất cả dữ liệu CovidData
  getAllData(): Observable<CovidData[]> {
    return this.http.get<{ value: CovidData[] }>(`${this.baseUrl}/CovidData`)
      .pipe(map(res => res.value));
  }

  // Lấy top N quốc gia theo số ca
  getTopCountries(limit: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/CovidCases/GetTopCountriesByConfirmed(limit=${limit})`);
  }

  // Lấy trend ca bệnh theo quốc gia
  getCountryTrend(countryId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/CovidCases/GetTrendByCountry(countryId=${countryId})`);
  }

  // Lấy tổng ca toàn cầu
  getGlobalSummary(): Observable<any> {
    return this.http.get(`${this.baseUrl}/CovidCases/GetGlobalSummary()`);
  }
}
