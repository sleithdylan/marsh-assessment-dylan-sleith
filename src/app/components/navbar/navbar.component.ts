import { Component } from '@angular/core';
import { Feature, MapboxService } from 'src/app/services/mapbox.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  constructor(private mapboxService: MapboxService) {}

  places: string[] = [];
  selectedPlace: string = '';
  latitude: number[] = [];
  longitude: number[] = [];

  search(event: any) {
    const searchTerm = event.target.value.toLowerCase();

    if (searchTerm && searchTerm.length > 0) {
      this.mapboxService
        .searchWord(searchTerm)
        .subscribe((features: Feature[]) => {
          this.places = features.map((feature) => feature.place_name);
          this.latitude = features.map(
            (feature) => feature.geometry.coordinates[1]
          );
          this.longitude = features.map(
            (feature) => feature.geometry.coordinates[0]
          );
        });
    } else {
      this.places = [];
    }
  }

  onSelect(place: string, index: number) {
    this.selectedPlace = place;
    console.log('latitude: ', this.latitude[index]);
    console.log('longitude: ', this.longitude[index]);

    this.places = [];
  }
}
