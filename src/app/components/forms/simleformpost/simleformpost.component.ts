import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//Service
import { ApiService } from 'src/app/services/api.service';
//Interface
import { ModFormI } from 'src/app/models/send/mod-form.interface';
import { ResponseInterfacePoints } from 'src/app/models/response/responsePoints.interface';
import { MapviewFuncionarioComponent } from '../../mapview-funcionario/mapview-funcionario.component';

@Component({
  selector: 'app-simleformpost',
  templateUrl: './simleformpost.component.html',
  styleUrls: ['./simleformpost.component.css']
})
export class SimleformpostComponent {

  errorStatus:boolean = false;
  errorMsj:any = "";

  searchForm = new FormGroup({
    name : new FormControl('', Validators.required),
    fromm : new FormControl(''),
    too : new FormControl(''),
  })

  constructor (
    private api:ApiService,
    private router: Router,
    private MapviewFuncionarioComponent : MapviewFuncionarioComponent
  ) {}

  checkLocalStorage(){
    if(localStorage.getItem('token')){
      this.router.navigate([''])
    }
  }

  onSendRute(form: ModFormI){
    console.log(form);
    this.api.getPointsRoute(form).subscribe(data =>{
      console.log(data);
      let dataResponse : ResponseInterfacePoints = data;
      if(dataResponse.status == "ok" ){

      }else{
        this.errorStatus = true;
        this.errorMsj = dataResponse.status.error_msg;
      }
    });
  }

  closeModal() {
    this.MapviewFuncionarioComponent.closeModal();
  }
}
