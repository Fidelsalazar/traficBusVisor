import { Component } from '@angular/core';
import * as L from 'leaflet';
import { marker } from "leaflet";
import { Subscription } from 'rxjs';

//Services
//import { PositionsService } from './positions/position.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})


export class MapComponent {
  showModal=false;

  lat: number = 20.02083;
  lon: number = -75.82667;

  ngAfterViewInit(): void{

    const map  = L.map('map').setView([ this.lat, this.lon ], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	    maxZoom: 20,
	    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  }

/*
  setInterval(() => {
    this.positionService.getPositions().subscribe(
      r => {

        r.map((point: { lat: number; lon: number; }) => {
          marker([point.lat, point.lon]).addTo(map);
        });

        map.fitBounds([
          ...r.map((point: { lat: number; lon: number; }) => [point.lat,point.lon] as [number,number])
        ]);
        console.log(r)
      }

    );
    console.log("ok")
  },1000)

  }*/

  openModal() {
    this.showModal = true;
  }

  public closeModal() {
    this.showModal = false;
  }
}
