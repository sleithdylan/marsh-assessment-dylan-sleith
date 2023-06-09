import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment.development';

export interface MapboxOutput {
  attribution: string;
  features: Feature[];
  query: [];
}

export interface Feature {
  place_name: string;
  geometry: { coordinates: [latitude: number, longitude: number] };
}

@Injectable({
  providedIn: 'root',
})
export class MapboxService {
  constructor(private http: HttpClient) {}

  searchWord(query: string) {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';

    return this.http
      .get(
        `${url}${query}.json?types=place&country=us&access_token=${environment.mapbox.accessToken}`
      )
      .pipe(
        map((res: any) => {
          return res.features;
        })
      );
  }
}
