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
export class AuthenticationService {

    loginUrl = baseUrl + '/api/auth/login';
    signupUrl = baseUrl + '/api/auth/register';
    resetPasswordUrl = baseUrl + '/api/auth/resetpassword';
    getMyNameURL = baseUrl + '/api/auth/myname';
    getMyRoleURL= baseUrl + '/api/auth/myrole';

    checkActivationTokenUrl = baseUrl + '/api/auth/checkactivationtoken';
    checkTokenUrl = baseUrl + '/api/auth/checktoken';
    changePasswordTokenUrl = baseUrl + '/api/auth/changepasswordtoken';
    changePasswordEmailUrl = baseUrl + '/api/auth/changepasswordemail';




    callmeTestUrl =baseUrl + '/api/callme/test';

    snippetCodeUrl =baseUrl + '/api/callme/snippetcode';

    
    handleError: HandleError;


    constructor(private http: HttpClient,httpErrorHandler: HttpErrorHandler) { 
        this.handleError = httpErrorHandler.createHandleError('EmployeeService');
    }

    login(username :string, password : string,rememberMe : boolean = false) {


        return this.http.post<any>(this.loginUrl, {username,password,rememberMe}).pipe(
            map(data => {
                if (data)
                {
                    sessionStorage.setItem('currentUser', username);
                    sessionStorage.setItem('userToken' , data.token);  

                    if (rememberMe)
                    {
                        localStorage.setItem('currentUser', username);
                        localStorage.setItem('userToken' , data.token);  
                    }        
                }
            }
            )
        );
    }

    logout() {
        sessionStorage.clear();
        localStorage.clear();
    }

    getUsername() {
        if (sessionStorage.getItem('currentUser'))
            return sessionStorage.getItem('currentUser');
        else
            return localStorage.getItem('currentUser');
    }

    getUserToken() {
        if (sessionStorage.getItem('userToken'))
        return sessionStorage.getItem('userToken');
    else
        return localStorage.getItem('userToken');

    }
    
    isLogin() {
        if (sessionStorage.getItem('currentUser') || localStorage.getItem('currentUser')) {
            return true;
        }
        return false;
    }
    
    getAuthorizationToken() {
        return  'Bearer:' +  this.getUserToken();
      }

     
    signUp(email : string , name : string, password : string)
    {
        return this.http.post<any>(this.signupUrl, {email,name,password},httpOptions);
    }  

    resetPassword(email : string)
    {
        return this.http.post<any>(this.resetPasswordUrl, {email},httpOptions);
    }  

    getMyName () : Observable<string[]>
    {
        return this.http.get<string[]>(this.getMyNameURL).pipe(
            catchError(this.handleError('getMyName', [])));
    }  

    getMyRole () : Observable<string[]>
    {
        return this.http.get<string[]>(this.getMyRoleURL).pipe(
            catchError(this.handleError('getMyyRole', [])));
    }  




    callmeTest(srcPhone : string , destPhone : string)
    {
        return this.http.post<any>(this.callmeTestUrl, {srcPhone,destPhone},httpOptions); 
    }

    checkToken(token : string)
    {
        return this.http.post<any>(this.checkTokenUrl, {token},httpOptions);
    }  

    checkActivationToken(token : string)
    {
        return this.http.post<any>(this.checkActivationTokenUrl, {token},httpOptions);
    }  
    
    changePasswordWithToken(token : string,password : string)
    {
        return this.http.post<any>(this.changePasswordTokenUrl, {token,password},httpOptions);
    }  

    changePasswordWithEmail(email : string,oldPassword : string,newPassword : string)
    {
        return this.http.post<any>(this.changePasswordEmailUrl, {email,oldPassword,newPassword},httpOptions);
    }  


    getSnippetCode (token : string) : Observable<string[]>
    {
        return this.http.get<string[]>(this.snippetCodeUrl + "/'" + token + "'" ).pipe(
            catchError(this.handleError('getSnippetCode', [])));
    }  
    
}