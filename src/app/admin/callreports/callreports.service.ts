import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Observable} from 'rxjs';
import { catchError , map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { HttpErrorHandler, HandleError } from '../../http-error-handler.service';
import { CallReport } from './callreport';


const baseUrl :string = environment.apiUrl;

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Accept':  'application/json'
    })
  };


@Injectable({
  providedIn: 'root'
})
export class CallReportsService {

  callreportsUrl = baseUrl + '/api/callreports';
  

  handleError: HandleError;


  constructor(private http: HttpClient,httpErrorHandler: HttpErrorHandler) { 
    this.handleError = httpErrorHandler.createHandleError('CallReportsService');
}

getAllCallReports() : Observable<CallReport[]> {
    return this.http.get<CallReport[]>(this.callreportsUrl)
  .pipe(
    catchError(this.handleError('getAllCallReports', []))
  );
  }

  getMyCallReports() : Observable<CallReport[]> {
    return this.http.get<CallReport[]>(this.callreportsUrl + '/me')
  .pipe(
    catchError(this.handleError('getMyCallReports', []))
  );
  }


}