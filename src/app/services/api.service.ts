import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
//Interface
import { ResponseI } from '../models/response/response.interface';
import { ResponseInterfacePoints } from '../models/response/responsePoints.interface';
import { LoginI } from '../models/send/login.interface';
import { PointsI } from '../models/send/points.interface';
import { ModFormI } from '../models/send/mod-form.interface';
import { searchHomeI } from '../models/send/search-home.interface';
import { ResponseInterfaceRoutes } from '../models/response/responseRoutes.interface';
import { sendPointsI } from '../models/send/send-points.interface';
import { ResponseStatusI } from '../models/response/responseStatus.interface';
import { CrudFormI } from '../models/send/crudForm.interface';
import { ResponseDeleteRoute } from '../models/response/responseDeleteRoute.interface';

@Injectable({
  providedIn: 'root'
})

export class ApiService{
  

  private url = "http://190.15.158.76:7000";//"https://srv76158-15190.vps.etecsa.cu";
  private _refresh$ = new Subject<void>();

  constructor(public http:HttpClient){}

  public getPositions():Observable<any>{
    return this.http.get(this.url)
  }
  public getRoutes(form: CrudFormI):Observable<any>{
    let direccion = this.url + "/api/routes/get";
    return this.http.post(direccion,form);
  }

  loginByEmail(form:LoginI):Observable<ResponseI>{
    let direccion =this.url + "/api/auth/login";
    return this.http.post<ResponseI>(direccion, form);
  }

  sendPointsRoutes(data: any):Observable<ResponseInterfacePoints>{
    let direccion = this.url + "/api/routes/add";
    return this.http.post<ResponseStatusI>(direccion, data);
  }

  sendPointsRoutesModified(data: any):Observable<ResponseInterfacePoints>{
    let direccion = this.url + "/api/routes/modified";
    return this.http.post<ResponseStatusI>(direccion, data);
  }

  searchRoutesHome():Observable<ResponseInterfaceRoutes>{
    let direccion = this.url + "/api/busline/get";
    return this.http.get<ResponseInterfaceRoutes>(direccion);
  }

  getPointsRoute(form:ModFormI):Observable<ResponseInterfacePoints>{
    let direccion = this.url + "/api/routes/get";
    return this.http.post<ResponseInterfacePoints>(direccion, form);
  }

  sendDeleteName(name :string):Observable<ResponseDeleteRoute>{
    let direccion = this.url + "/api/busline/delete";

    const sendName = {
      'name' : name
    }
    return this.http.post<ResponseDeleteRoute>(direccion, sendName)
  }


}
