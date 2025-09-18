// src/app/services/covid.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

export interface CovidData {
  id: number;
  country: string;
  province: string;
  confirmed: number;
  deaths: number;
  recovered: number;
  active: number;
  date: string; 
}
@Injectable({ providedIn: 'root' })
export class CovidService {
  private baseUrl = 'https://localhost:5001/api'; // backend ASP.NET Core OData

  constructor(private http: HttpClient) {}

    // Lấy tất cả dữ liệu CovidData
  getAllData(): Observable<CovidData[]> {
    return this.http.get<CovidData[]>(`${this.baseUrl}/CovidData`);
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
