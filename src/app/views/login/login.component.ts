import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Http } from '@angular/http';
import {Observable , Subject} from 'rxjs';
import {map , take} from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import {AuthenticationService} from '../../services/authentication.service';
import {MatSnackBar} from '@angular/material';
import { ChartsModule } from 'ng2-charts';





@Component({
  // selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent { 

  today = new Date();

  imageLogoFormControl = new FormControl();

   EMAIL_REGEX = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

  isSubmit: boolean = false;
  returnUrl: string;
  imageLogoClass = "";
  overBoxClass = "";
  cardLogoClass = "card-group";
  footerClass = "app-footer";


  constructor(public snackbar : MatSnackBar, 
    public router: Router,
     public http: Http,
      private toastrService: ToastrService, 
      private route: ActivatedRoute,
      private authenticationService: AuthenticationService) {
  }

  dayofWeek;

  ngOnInit() {
       this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

      // this.authenticationService.getdayofWeek().subscribe(
      //   data =>
      //     alert(JSON.stringify(data))
      //     ,
      //     error =>
      //       alert(JSON.stringify(error))
      // )

     }

     ngAfterViewInit()
     {
      setTimeout(() => { 
        this.cardLogoClass ="card-group show"
      }, 10); 

      setTimeout(() => { 
        this.footerClass ="app-footer show"
      }, 2000); 
       
     }
  
  onSubmit(username : string,password : string,rememberMe = false):boolean {

    
    username = username.toLowerCase();


    if (!username || !password )
      return false;

    if (username.length == 0 || password.length == 0)
      return false;



    this.isSubmit = true;

      this.authenticationService.login(username,password,rememberMe)
      .subscribe(data => {
          this.snackbar.open('You have successfully logged in','Logged in',{
          duration: 5000,
          panelClass : 'my-snackbar-style'
        });

          // this.toastrService.success('You have successfully logged in','Logged in');
         
          this.router.navigate(['/home']);

          this.isSubmit = false;  
          return true;  
        },
        error =>
        {

          let errormsg : string = error.message;
          if (errormsg.indexOf('404') > 0)
          {
            this.toastrService.error('Invalid username or password' ,'Login attempt failed');
          }
          else if (errormsg.indexOf('401') > 0)
          {
            this.toastrService.error('Invalid username or password' ,'Login attempt failed');
          }
          else
          {
            this.toastrService.error('Sorry! Server is unavailable temporarily, please try again later.' ,'Login attempt failed');
          }  
          this.isSubmit = false;
        }
      );
    return false;
  }

  private handleErrorObservable (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
} 


  register(){
    this.router.navigate(['register']);
  }
  forgotpassword(){
    this.router.navigate(['forgotpassword']);
  }
}
