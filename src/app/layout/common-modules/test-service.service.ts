import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {_throw} from 'rxjs/observable/throw';
import { ErrorCodes } from '../../entities/error-codes-model';
@Injectable( 
 
)
export class TestServiceService {
  url = 'http://localhost:3000/enroll';
  constructor(private http: HttpClient) { }
  // method for making the request
Enroll(model:  ErrorCodes) {
  return this.http.post<any>(this.url , model)
  .pipe(catchError(this.errorHandler));

}
errorHandler(error: HttpErrorResponse){
return _throw(error);
}
  

}
