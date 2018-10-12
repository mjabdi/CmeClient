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



@Component({
    // selector: 'app-dashboard',
    templateUrl: 'forgotpassword.component.html',
    styleUrls: ['forgotpassword.component.css']
})
export class ForgotpasswordComponent {
  today = new Date();
    
    constructor(public snackbar : MatSnackBar, public router: Router, public http: Http, private toastrService: ToastrService, private route: ActivatedRoute,private authenticationService: AuthenticationService) {
    }
  


    isSubmit: boolean = false;

    onSubmit(email)
    {

       

        email = email.toLowerCase();

        if (!email)
        {
          this.toastrService.warning('Please enter your Email');
          return false;
        }
  
        if (!this.isValid(email))
        {
          this.toastrService.warning('Please enter a valid Email!');
          return false;    
        }
  

        this.isSubmit = true;


        // if (this.loginForm.invalid) {
        //   this.toastrService.error('invalid data');
        //   return false;
        //}
        // else 
         {
    
          this.authenticationService.resetPassword(email)
          .subscribe(data => {
              this.snackbar.open('Reset password link Sent to your email','Email Sent',{
              duration: 10000,
              panelClass : 'my-snackbar-style'
            });
    
    //          this.toastrService.success('You have successfully logged in','Logged in');
                this.router.navigate(['login']);
    
              this.isSubmit = false;  
              return true;  
            },
            error =>
            {
              let errormsg : string = error.message;
              if (errormsg.indexOf('404') > 0)
              {
                this.toastrService.error('There is no user with this email address' ,'User Not Found');
                let snackBarRef = this.snackbar.open('Are you a new customer?','Go to SignUp page',{
                  duration: 30000,
                  panelClass : 'my-snackbar-style',
    
                });
    
                snackBarRef.onAction().subscribe(() => {
                  this.router.navigate(['/register']);
                });
    
              }
              else
              {
                this.toastrService.error('Sorry! Something went wrong, please try again!' ,'Request Failed');
              }  
              this.isSubmit = false;
            }
          );
        }
    
        return false;
    }
    login(){
      this.router.navigate(['login']);
    }

    isValid(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
};

