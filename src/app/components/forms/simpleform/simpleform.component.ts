import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
//Service
import { ApiService } from 'src/app/services/api.service';
//Interface
import { ModFormI } from 'src/app/models/send/mod-form.interface';
import { MapmodComponent} from '../../mapmod/mapmod.component'
import { DataService } from 'src/app/services/data.service';
import { ResponseInterfaceRoutes } from 'src/app/models/response/responseRoutes.interface';
import { ResponseStatusI } from 'src/app/models/response/responseStatus.interface';
//Components
import { CheckmodalComponent } from '../../assets/checkmodal/checkmodal.component';
import { ErrormodalComponent } from '../../assets/errormodal/errormodal.component';
import { ModfuncsrouteComponent } from '../../modfuncsroute/modfuncsroute.component';

@Component({
  selector: 'app-simpleform',
  templateUrl: './simpleform.component.html',
  styleUrls: [
    './simpleform.component.css',
  ]
})
export class SimpleformComponent {

  errorStatus:boolean = false;
  errorMsj:any = "";

  bsModalRef!: BsModalRef ;

  modForm = new FormGroup({
    name : new FormControl('', Validators.required),
    fromm : new FormControl('', Validators.required),
    too : new FormControl('', Validators.required),
  })

  constructor (
    private api:ApiService,
    private router: Router,
    private MapModComponent: MapmodComponent ,
    public data: DataService,
    private modalService: BsModalService
  ) {}


  checkLocalStorage(){
    if(localStorage.getItem('token')){
      this.router.navigate([''])
    }
  }

  onSendRute(){
    if (
      this.MapModComponent.pointsData === undefined &&
      this.isMarkerEmpty() &&
      this.isFormGroupEmpty(this.modForm)
    ){
      this.openAnimatedErrorModal()
    }else{
      let dataToSend = {
        route: this.MapModComponent.pointsData,
        stops: this.MapModComponent.markerData,
        modForm:this.modForm.value
      };
      console.log(dataToSend);
      this.api.sendPointsRoutes(dataToSend).subscribe( data => {
        console.log(data);
        let dataResponse : ResponseStatusI = data;
        if(dataResponse.status == "ok" ){
          this.closeModal()
          this.openAnimatedCheckModal()
        }else{
          this.openAnimatedErrorModal()
        }
      })
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

  isMarkerEmpty(): boolean {
    return this.MapModComponent.markerData.length === 0;
  }

  closeModal() {
    this.MapModComponent.closeModal();
  }

  verificarValor(valor: any) {
    console.log(valor);
  }
}
