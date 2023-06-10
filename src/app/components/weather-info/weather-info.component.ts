import { Component } from '@angular/core';
import { NationalWeatherService } from 'src/app/services/national-weather.service';

@Component({
  selector: 'app-weather-info',
  templateUrl: './weather-info.component.html',
})
export class WeatherInfoComponent {
  weatherInfo: any;
  name: string = 'San Francisco';
  icon: string = '';
  temperature: number = 0;
  windSpeed: number = 0;
  shortForecast: string = '';
  humidity: number = 0;
  latitude: number = 37.77;
  longitude: number = -122.42;
  gridX: number = 85;
  gridY: number = 105;
  gridId: string = 'MTR';

  constructor(private nationalWeatherService: NationalWeatherService) {}

  ngOnInit() {
    let gridX = this.gridX;
    let gridY = this.gridY;
    let gridId = this.gridId;

    this.nationalWeatherService
      .getGridPoints(this.latitude, this.longitude)
      .subscribe({
        next: (res) => {
          this.weatherInfo = res;

          gridX = this.weatherInfo.properties.gridX;
          gridY = this.weatherInfo.properties.gridY;
          gridId = this.weatherInfo.properties.gridId;
        },

        error: (err) => console.log(err),

        complete: () => console.log(),
      });

    this.nationalWeatherService
      .getWeatherForecast(gridX, gridY, gridId)
      .subscribe({
        next: (res) => {
          this.weatherInfo = res;
          const {
            properties: { periods },
          } = this.weatherInfo;
          const [place] = periods;

          this.icon = place.icon;
          this.temperature = place.temperature;
          this.windSpeed = place.windSpeed;
          this.shortForecast = place.shortForecast;
          this.humidity = place.relativeHumidity.value;
        },

        error: (err) => console.log(err),

        complete: () => console.log(),
      });
  }
}
