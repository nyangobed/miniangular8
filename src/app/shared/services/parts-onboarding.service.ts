import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable} from 'rxjs';
import {_throw} from 'rxjs/observable/throw';

@Injectable()

export class PartsOnboardingService {

  constructor(private http: HttpClient) { }

 partsOnboardingUrl = 'http://192.168.254.75:8080/parts';


  createPart(part): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type':  'application/json',
      })
    };
    return this.http.post<any>(this.partsOnboardingUrl, part, httpOptions);
  }
  errorHandler(error: HttpErrorResponse){
    return _throw(error);



}}
