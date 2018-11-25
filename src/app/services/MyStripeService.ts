import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable , Subject} from 'rxjs';
import {map , take, catchError} from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';


const baseUrl :string = environment.apiUrl;
const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Accept':  'application/json'
    })
  };


@Injectable()
export class MyStripeService {

    createCustomerUrl = baseUrl + '/api/stripepayment/createcustomer';
    subscribeUrl = baseUrl + '/api/stripepayment/subscribe';
    UnsubscribeUrl = baseUrl + '/api/stripepayment/unsubscribe';

    handleError: HandleError;


    constructor(private http: HttpClient,httpErrorHandler: HttpErrorHandler) { 
        this.handleError = httpErrorHandler.createHandleError('MyStripeService');
    }

    CreateCustomer(s_token : string)
    {
        return this.http.post<any>(this.createCustomerUrl, {s_token},httpOptions);
    }  

    Subscribe(planId : string)
    {
        return this.http.post<any>(this.subscribeUrl, {planId},httpOptions);
    }  

    UnSubscribe(subscriptionId : string)
    {
        return this.http.post<any>(this.UnsubscribeUrl, {subscriptionId},httpOptions);
    }  

}