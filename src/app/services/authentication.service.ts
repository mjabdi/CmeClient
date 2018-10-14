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
                    sessionStorage.setItem('talktoleadsnow-currentUser', username);
                    sessionStorage.setItem('talktoleadsnow-userToken' , data.token);  
                    sessionStorage.setItem('talktoleadsnow-userName' , data.name);  


                    if (rememberMe)
                    {
                        localStorage.setItem('talktoleadsnow-currentUser', username);
                        localStorage.setItem('talktoleadsnow-userToken' , data.token);  
                        localStorage.setItem('talktoleadsnow-userName' , data.name);  
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


    setMyRole(role)
    {
        sessionStorage.setItem('talktoleadsnow-userRole',role);
    }

    resetMyRole()
    {
        sessionStorage.removeItem('talktoleadsnow-userRole');
    }
    
    getMyCachedRole() : string
    {
        return sessionStorage.getItem('talktoleadsnow-userRole');
    }


    getCachedName() {
        if (sessionStorage.getItem('talktoleadsnow-userName'))
            return sessionStorage.getItem('talktoleadsnow-userName');
        else
            return localStorage.getItem('talktoleadsnow-userName');
    }

    getUsername() {
        if (sessionStorage.getItem('talktoleadsnow-currentUser'))
            return sessionStorage.getItem('talktoleadsnow-currentUser');
        else
            return localStorage.getItem('talktoleadsnow-currentUser');
    }

    getUserToken() {
        if (sessionStorage.getItem('talktoleadsnow-userToken'))
        return sessionStorage.getItem('talktoleadsnow-userToken');
    else
        return localStorage.getItem('talktoleadsnow-userToken');

    }
    
    isLogin() {
        if (sessionStorage.getItem('talktoleadsnow-currentUser') || localStorage.getItem('talktoleadsnow-currentUser')) {
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