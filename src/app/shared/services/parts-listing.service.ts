import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class PartsListingService {

  listUrl = 'http://192.168.254.99:8080/parts';

  constructor(private http: HttpClient) { }

  getParts(): Observable<any> {
    return this.http.get<any[]>(this.listUrl);
  }
}
