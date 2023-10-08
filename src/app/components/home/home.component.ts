import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//Service
import { ApiService } from 'src/app/services/api.service';
//Interface

import { searchHomeI } from 'src/app/models/send/search-home.interface';
import { ResponseInterfaceRoutes } from 'src/app/models/response/responseRoutes.interface';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

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
}
