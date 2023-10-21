import { Component, OnInit, TemplateRef } from '@angular/core';
import * as LM from 'leaflet';
//import 'leaflet/dist/leaflet.css';
//import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
//Services
import { ApiService } from 'src/app/services/api.service';
import { DialogService } from 'src/app/services/dialog.service';
//Components
import { CheckmodalComponent } from '../assets/checkmodal/checkmodal.component';
import { ErrormodalComponent } from '../assets/errormodal/errormodal.component';
//Interface
import { RouteI } from 'src/app/models/response/responseR.interface';
import { CrudFormI } from 'src/app/models/send/crudForm.interface';

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
  selector: 'app-modfuncsroute',
  templateUrl: './modfuncsroute.component.html',
  styleUrls: ['./modfuncsroute.component.css']
})

export class ModfuncsrouteComponent implements OnInit{

  showModal = false;

  bsModalRef!: BsModalRef ;

  errorStatus:boolean = false;
  errorMsj:any = "";

  crudForm= new FormGroup({
    search: new FormControl('', Validators.required),
  })

  data: any;

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

  id: any;

  datachild: any;
  isAddFieldTask: boolean| undefined;
  isSave: boolean| undefined;

  constructor (
    private dialogService: DialogService,
    private modalService: BsModalService,
    private api: ApiService
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
        console.log("markerData:", this.markerData);
      }
      else{
        this.pointsData = layer.getLatLngs();
        console.log("pointsData:" + this.pointsData);
        console.log(layer.getLatLngs());
      }

      return app.drawnItems.addLayer(layer);
    });

  }

  
  crudRoute(form: CrudFormI){
    if( this.isFormGroupEmpty(this.crudForm) ){
      this.openAnimatedErrorModal()
    }else{
      this.api.getRoutes(form).subscribe( routes => {
        console.log(routes)
        let dataResponse : RouteI = routes;

        let pointsData = dataResponse.points;
        const pointList = pointsData.map((point:any) =>
          [  
            point.latitud,
            point.longitud
          ]
        )

        // Agrega la primera coordenada al final de la lista para cerrar la línea.
        pointList.push(pointList[0]);

        L.polyline(pointList, {color : 'red'}).addTo(this.map);

        let stopsData = dataResponse.stops;

        stopsData.forEach((stop:any) => {
          L.circleMarker([stop.latitud, stop.longitud], { radius: 6, color: 'red' }).addTo(this.map);
        });

       this.data = dataResponse.data

        console.log('Data:', this.data)
      });
    }
  }

  openAnimatedCheckModal(){
    this.bsModalRef = this.modalService.show(CheckmodalComponent, {
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'modal-lg modal-dialog-centered'
    });
    this.bsModalRef.content.onAnimationFinished.subscribe(() => {
      setTimeout(() => {
        this.bsModalRef.hide();
      }, 1000);
    });
  }

  openAnimatedErrorModal(){
    this.bsModalRef = this.modalService.show(ErrormodalComponent, {
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'modal-lg modal-dialog-centered'
    });
    this.bsModalRef.content.onAnimationFinished.subscribe(() => {
      setTimeout(() => {
        this.bsModalRef.hide();
      }, 1000);
    });
  }

  isFormGroupEmpty(formGroup: FormGroup) {
    for (const control in formGroup.controls) {
      if (formGroup.controls[control].value === '') {
        return true;
      }
    }
    return false;
  }

  searchButtonContent(): string {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
      </svg>
    `;
  }

  openDialogWhtiTemplate(template : TemplateRef<any>){
    this.dialogService.openDialogWithTemplateMod({
      template
    })
    .afterClosed()
    .subscribe( (res) => console.log('Dialog Custom Close',res));
  }

  openModal() {
    this.showModal = true;
  }

  public closeModal() {
    this.showModal = false;
  }

  verificarValor(valor: any) {
    console.log(valor);
  }

}
