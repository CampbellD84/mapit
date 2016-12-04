import { Component, Inject } from '@angular/core';
import { MapsAPILoader, NoOpMapsAPILoader, MouseEvent } from 'angular2-google-maps/core';
import { FormBuilder, Validators, FormGroup, FormControl, NgForm } from '@angular/forms';
import { MarkerService } from './marker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MarkerService]
})
export class AppComponent {
  //Zoom Level
  zoom: number = 10;
  //Start position
  lat: number = 40.783435;
  lng: number = -73.966249;
  markers: marker[];


markerForm: FormGroup;

  constructor(@Inject(FormBuilder) fb: FormBuilder, private _markerService: MarkerService) {
    this.markerForm = fb.group({
      name: ['', Validators.required],
      lat: ['', Validators.required],
      lng: ['', Validators.required],
      draggable: [false]
    });
    this.markers = this._markerService.getMarkers();
  }

  clickedMarker(marker:marker, index:number) {
    console.log('Clicked marker: ' + marker.name + ' at index ' + index);
  }

  mapClicked($event: MouseEvent) {
    var newMarker = {
      name: "Untitled",
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: false
    }

    this.markers.push(newMarker);
    this._markerService.addMarker(newMarker);
  }

  markerDragEnd(marker : any, $event: MouseEvent) {
    console.log('dragEnd', marker, $event);

    var updMarker = {
      name: marker.name,
      lat: parseFloat(marker.lat),
      lng: parseFloat(marker.lng),
      draggable: false
    }

    var newLat = $event.coords.lat;
    var newLng = $event.coords.lng;

    this._markerService.updateMarker(updMarker, newLat, newLng);
  }

  addMarker(marker: any) {
    if(this.markerForm.valid) {
      if(marker.draggable == 'yes'){
        var isDraggable = true;
      } else {
        var isDraggable = false;
      }

      var newMarker = {
        name: marker.name,
        lat: parseFloat(marker.lat),
        lng: parseFloat(marker.lng),
        draggable: isDraggable
      }

      this.markers.push(newMarker);
      this._markerService.addMarker(newMarker);
    } else {
      alert('Please Fill in All Fields')
    }
  }

  removeMarker(marker: marker) {
    for(var i = 0; i < this.markers.length; i++){
      if(marker.lat == this.markers[i].lat && marker.lng == this.markers[i].lng){
        this.markers.splice(i, 1);
      }
    }

    this._markerService.removeMarker(marker);
  }
}

//marker type
interface marker {
  name?: string;
  lat: number;
  lng: number;
  draggable: boolean;
}
