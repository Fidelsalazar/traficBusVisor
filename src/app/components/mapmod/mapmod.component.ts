import { Component, OnInit, TemplateRef } from '@angular/core';
import * as LM from 'leaflet';
//Services
import { DialogService } from 'src/app/services/dialog.service';
// when the docs use an import:
declare const L: any; // --> Works
import 'leaflet-draw';

const markerIcon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  // specify the path here
  iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-shadow.png"
});
L.Marker.prototype.options.icon = markerIcon;

@Component({
  selector: 'app-mapmod',
  templateUrl: './mapmod.component.html',
  styleUrls: ['./mapmod.component.css']
})

export class MapmodComponent implements OnInit{

  showModal = false;

  errorStatus:boolean = false;
  errorMsj:any = "";

  map: any;
  lat: number = 20.02083;
  lon: number = -75.82667;
  maker: L.Marker<any> | undefined;
  dbmaker: L.Marker<any>[] | undefined;

  markers: any[]| undefined;
  drawnItems: any;

  marker: any;
  markerData: any[]=[];
  pointsData: any;

  datachild: any;
  isAddFieldTask: boolean| undefined;
  isSave: boolean| undefined;

  constructor (
    private dialogService: DialogService,

  ) {}

  ngOnInit(): void {
    this.map = L.map('map',).setView([ this.lat, this.lon ], 13);

    LM.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	    maxZoom: 20,
	    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);



    this.drawnItems = new LM.FeatureGroup();

    this.map.addLayer(this.drawnItems);

    var options = {
      position: 'topleft',
      draw: {
        circle: false,
        circlemarker: false,// Turns off this drawing tool
        marker:
        {

          icon: markerIcon

        }
      },
      edit: {
        featureGroup: this.drawnItems,
      }

    };

    var drawControl = new L.Control.Draw(options);
    this.map.addControl(drawControl);

    var app = this;
    this.map.on(L.Draw.Event.CREATED, (e:any) => {
      const type = e.layerType;
      const layer = e.layer;

      if (type === 'marker') {
        this.marker = {
          lat: layer.getLatLng().lat,
          lng: layer.getLatLng().lng
        };

        layer.bindPopup('A popup!');

        this.markerData.push(this.marker);
        //console.log("markerData:", this.markerData);
      }
      else{
        this.pointsData = layer.getLatLngs();
        //console.log("pointsData:" + this.pointsData);
        //console.log(layer.getLatLngs());
      }

      return app.drawnItems.addLayer(layer);
    });

  }

  openDialogWhtiTemplate(template : TemplateRef<any>){
    this.dialogService.openDialogWithTemplate({
      template
    })
    //.afterClosed()
    //.subscribe( (res) => console.log('Dialog Custom CLose',res));
  }

  openModal() {
    this.showModal = true;
  }

  public closeModal() {
    this.showModal = false;
  }

}
