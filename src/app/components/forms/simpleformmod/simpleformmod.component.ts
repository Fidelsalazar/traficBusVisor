import { Component, OnInit } from '@angular/core';
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
  selector: 'app-simpleformmod',
  templateUrl: './simpleformmod.component.html',
  styleUrls: [
    './simpleformmod.component.css',
  ]
})
export class SimpleformModComponent implements OnInit {

  errorStatus:boolean = false;
  errorMsj:any = "";

  bsModalRef!: BsModalRef ;

  oldData : any;
  
  name : any = '';
  from : any = '';
  to : any = '';
  id : any = '';

  modForm = new FormGroup({
    name : new FormControl(this.name , Validators.required),
    fromm : new FormControl(this.from , Validators.required),
    too : new FormControl(this.to , Validators.required),
  })

  constructor (
    private api:ApiService,
    private router: Router,
    private ModRoutesComponent: ModfuncsrouteComponent ,
    public data: DataService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {

    console.log("Simple Form Mod");

    this.oldData = this.ModRoutesComponent.data[0]
    console.log (this.oldData)

    this.id = this.oldData.id[0];
    this.name = this.oldData.name[0];
    this.from = this.oldData.fromm
    this.to = this.oldData.too

    console.log('Data:', this.name, this.from, this.to)
  }

  checkLocalStorage(){
    if(localStorage.getItem('token')){
      this.router.navigate([''])
    }
  }

  onSendRute(){
    if (
      this.ModRoutesComponent.pointsData === undefined &&
      this.isMarkerEmpty() &&
      this.isFormGroupEmpty(this.modForm)
    ){
      this.openAnimatedErrorModal()
    }else{
      let dataToSend = {
        id: this.id,
        route: this.ModRoutesComponent.pointsData,
        stops: this.ModRoutesComponent.markerData,
        modForm:this.modForm.value
      };
      console.log(dataToSend);
      this.api.sendPointsRoutesModified(dataToSend).subscribe( data => {
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
    return this.ModRoutesComponent.markerData.length === 0;
  }

  closeModal() {
    this.ModRoutesComponent.closeModal();
  }

  verificarValor(valor: any) {
    console.log(valor);
  }
}
