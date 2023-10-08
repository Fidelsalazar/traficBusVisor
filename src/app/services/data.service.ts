import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ModFormI } from '../models/send/mod-form.interface';
import { sendPointsI } from '../models/send/send-points.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  dataMarker : any [] = [] ;
  dataPoints = [] ;

  constructor() { }

}
