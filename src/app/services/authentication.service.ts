import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable , Subject} from 'rxjs';
import {map , take, catchError} from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

import {Md5} from 'ts-md5/dist/md5';
import { Customer } from '../admin/customers/customer';


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
    customersUrl = baseUrl + '/api/auth/customers';


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


    getdayofWeek()
    {
        return this.http.get<string[]>("https://httpbin.org/get").pipe(
            catchError(this.handleError('getDayofWeek', [])));
    }


    login(username :string, _password : string,rememberMe : boolean = false) {

        var password =  Md5.hashStr(_password).toString();
        for (let i=0;i<377;i++)
        {
            password =  Md5.hashStr(password).toString();
        }

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
        if (!this.getUserToken())
            return null;
        else    
            return  'Bearer ' +  this.getUserToken();
      }

     
    signUp(email : string , name : string, _password : string)
    {
        var password =  Md5.hashStr(_password).toString();
        for (let i=0;i<377;i++)
        {
            password =  Md5.hashStr(password).toString();
        }

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

    getCustomers () : Observable<Customer[]>
    {
        return this.http.get<Customer[]>(this.customersUrl).pipe(
            catchError(this.handleError('getCustomers', [])));
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
    
    changePasswordWithToken(token : string,_password : string)
    {
        var password =  Md5.hashStr(_password).toString();
        for (let i=0;i<377;i++)
        {
            password =  Md5.hashStr(password).toString();
        }

        return this.http.post<any>(this.changePasswordTokenUrl, {token,password},httpOptions);
    }  

    changePasswordWithEmail(email : string,_oldPassword : string,_newPassword : string)
    {
        var oldPassword =  Md5.hashStr(_oldPassword).toString();
        var newPassword = Md5.hashStr(_newPassword).toString();

        for (let i=0;i<377;i++)
        {
            oldPassword =  Md5.hashStr(oldPassword).toString();
            newPassword =  Md5.hashStr(newPassword).toString();
        }

        return this.http.post<any>(this.changePasswordEmailUrl, {email,oldPassword,newPassword},httpOptions);
    }  


    getSnippetCode (token : string) : Observable<string[]>
    {
        return this.http.get<string[]>(this.snippetCodeUrl + "/'" + token + "'" ).pipe(
            catchError(this.handleError('getSnippetCode', [])));
    }  
    
}