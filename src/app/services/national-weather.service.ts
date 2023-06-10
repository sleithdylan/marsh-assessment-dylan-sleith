import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NationalWeatherService {
  constructor(private http: HttpClient) {}

  getGridPoints(latitude: number, longitude: number) {
    return this.http.get(
      `https://api.weather.gov/points/${latitude},${longitude}`
    );
  }

  getWeatherForecast(gridX: number, gridY: number, gridId: string) {
    return this.http.get(
      `https://api.weather.gov/gridpoints/${gridId}/${gridX},${gridY}/forecast`
    );
  }
}
