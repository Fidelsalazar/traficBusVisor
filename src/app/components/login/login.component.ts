import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//Service
import { ApiService } from 'src/app/services/api.service';
//Interface
import { LoginI } from 'src/app/models/send/login.interface';
import { ResponseI } from '../../models/response/response.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorStatus:boolean = false;
  errorMsj:any = "";

  loginForm = new FormGroup({
    user : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required)
  })

  constructor (private api:ApiService, private router: Router) {}

  ngOnInit(): void {

  }

  checkLocalStorage(form:any){
    if(localStorage.getItem('token')){
      
    }
  }

  onLogin(form: LoginI){
    console.log(form);
    this.api.loginByEmail(form).subscribe(data =>{
      console.log(data);
      let dataResponse : ResponseI = data;
      if(dataResponse.status == "ok" ){
        localStorage.setItem("token",dataResponse.data.token);
        console.log(localStorage.getItem("token"))
        if(dataResponse.data.rol == "admin"){
          
          this.router.navigate(['home'])
        }
        if(dataResponse.data.rol == "user"){
          this.router.navigate(['mapview'])
        }
      }else{
        this.errorMsj = dataResponse.status
        this.errorStatus = true;
        this.errorMsj = dataResponse.data.token;
      }
    }); 
  }

}
