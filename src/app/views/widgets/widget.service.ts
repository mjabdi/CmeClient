import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Observable} from 'rxjs';
import { catchError , map } from 'rxjs/operators';
import { Widget } from './widget'

import { environment } from '../../../environments/environment';

import { HttpErrorHandler, HandleError } from '../../http-error-handler.service';


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
export class WidgetService {

  widgetUrl = baseUrl + '/api/widget';
  handleError: HandleError;


  constructor(private http: HttpClient,httpErrorHandler: HttpErrorHandler) { 
    this.handleError = httpErrorHandler.createHandleError('WidgetService');
}


sendSnippetCodeEmail(id : string)
{
  var body = '';

  return this.http.post(this.widgetUrl + "/emailsnippetcode/" + id,
    body,
    httpOptions);
}


getAllWidgetsNew() : Observable<Widget[]> {
    return this.http.get<Widget[]>(this.widgetUrl+'/new')
  .pipe(
    catchError(this.handleError('getAllWidgetsNew', []))
  );
  }

  getAllWidgetsHistory() : Observable<Widget[]> {
    return this.http.get<Widget[]>(this.widgetUrl+'/history')
  .pipe(
    catchError(this.handleError('getAllWidgetsHistory', []))
  );
  }


getAllWidgetsForUser(email : string) : Observable<Widget[]> {

  return this.http.get<Widget[]>(this.widgetUrl + "/user/'" + email + "'" )
.pipe(
  catchError(this.handleError('getAllWidgetsForUser', []))
);
}


findWidget(id : string) : Observable<Widget | any[]> {

  return this.http.get<Widget>(this.widgetUrl + "/" + id)
.pipe(
  catchError(this.handleError('findWidget', []))
);
}


// getMaxEmployeeNumber() : Observable<number | any[]>
// {
//   return this.http.get<number>(this.employeerUrl + "/max").pipe(
//     catchError(this.handleError('getMaxEmployee', []))
//   ); 
// }


updateWidget(id :string , wgt : Widget)
{
  var body = JSON.stringify(wgt);

  return this.http.put<Widget>(this.widgetUrl + '/' + id,
    body,
    httpOptions);
}

updateStatus(id :string , wgt : Widget)
{
  var body = JSON.stringify(wgt);

  return this.http.put<Widget>(this.widgetUrl + '/status/' + id,
    body,
    httpOptions);
}

updateExtension(id :string , wgt : any)
{
  var body = JSON.stringify(wgt);

  return this.http.put<Widget>(this.widgetUrl + '/extension/' + id,
    body,
    httpOptions);
}

createNewWidget(wgt : Widget)
{
  var body = JSON.stringify(wgt);

  return this.http.post(this.widgetUrl,
    body,
    httpOptions);
}

deleteWidget(id :string)
{
  return this.http.delete(this.widgetUrl + "/" + id,
    httpOptions);
}



}
