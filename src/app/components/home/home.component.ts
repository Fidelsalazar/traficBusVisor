import { Component, TemplateRef } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
//Service
import { ApiService } from 'src/app/services/api.service';
//Interface
import { ResponseInterfaceRoutes } from 'src/app/models/response/responseRoutes.interface';
import { ResponseDeleteRoute } from 'src/app/models/response/responseDeleteRoute.interface';
import { CheckmodalComponent } from '../assets/checkmodal/checkmodal.component';
import { ErrormodalComponent } from '../assets/errormodal/errormodal.component';





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  bsModalRef!: BsModalRef ;

  routes=[];
  filterRoutes = '';

  errorStatus:boolean = false;
  errorMsj:any = "";
  searchForm = new FormGroup({
    search : new FormControl('', Validators.required),
  })

  constructor (
    private api:ApiService,
    private router: Router,
    private modalService: BsModalService,
    private location: Location
  ) {}



  checkLocalStorage(){
    if(localStorage.getItem('token')){
      this.api.searchRoutesHome().subscribe(data =>{
        console.log(data);
        let dataResponse : ResponseInterfaceRoutes= data;
        if(dataResponse.status == "ok" ){
          this.routes = dataResponse.routes;
        }else{
          this.errorStatus = true;
          this.errorMsj = dataResponse.status.error_msg;
        }
      });
    }else{
      this.router.navigate(['login'])
    }
  }

  ngOnInit(): void {
   this.checkLocalStorage() 
  }

  sendDataName(name : string){
    console.log(name)
    if(localStorage.getItem('token')){
      this.api.sendDeleteName(name).subscribe((data) =>{
        console.log(data);
        let dataResponse : ResponseDeleteRoute= data;
        if(dataResponse.status == "ok" ){
          this.openAnimatedCheckModal()
        }else{
          this.openAnimatedErrorModal()
        }
        
      });
    }else{
      this.router.navigate(['login'])
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
      window.location.reload();
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
}
