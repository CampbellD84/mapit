import { Injectable } from '@angular/core';
import { Init } from './init-markers';

@Injectable()
export class MarkerService extends Init {
  constructor() {
    super();
    console.log('MarkerService Initialized...');
    this.load();
  }

  getMarkers() {
    var markers = JSON.parse(localStorage.getItem('markers'));
    return markers;
  }

  addMarker(marker:any) {
    // Fetch Markers
    var markers = JSON.parse(localStorage.getItem('markers'));
    //Add new marker to set
    markers.push(marker);
    //Set markers again
    localStorage.setItem('markers', JSON.stringify(markers));
  }

  updateMarker(marker: any, newLat: number, newLng: number) {
    var markers = JSON.parse(localStorage.getItem('markers'));

    for(var i = 0; i < markers.length; i++){
      if(marker.lat == markers[i].lat && marker.lng == markers[i].lng){
        markers[i].lat = newLat;
        markers[i].lng = newLng;
      }
    }

    //Set new marker
    localStorage.setItem('markers', JSON.stringify(markers));
  }

  removeMarker(marker:any) {
    //Fetch markers
    var markers = JSON.parse(localStorage.getItem('markers'));

    for(var i = 0; i < markers.length; i++){
      if(marker.lat == markers[i].lat && marker.lng == markers[i].lng){
        markers.splice(i, 1);
      }
    }

    //Set new markers
    localStorage.setItem('markers', JSON.stringify(markers));
  }
}
