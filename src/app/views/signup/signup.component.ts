import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Http } from '@angular/http';
import {Observable , Subject} from 'rxjs';
import {map , take} from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { environment } from '../../../environments/environment';
import {AuthenticationService} from '../../services/authentication.service';
import {MatSnackBar} from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import {HostListener, AfterViewInit } from '@angular/core';

 

@Component({
  // selector: 'app-dashboard',
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.scss']
})
export class SignUpComponent {

  today = new Date();
  signupForm: FormGroup;
  isSubmit: boolean = false;
  hide:boolean;

  private sub: any;
  token : string;


  constructor(public snackbar : MatSnackBar, 
    public router: Router, 
    public http: Http,
     private toastrService: ToastrService,
      private route: ActivatedRoute,
      private authenticationService: AuthenticationService) {
  }

  windowWidth: number = window.innerWidth;

  //initial values, The window object may still be undefined during this hook, let me know if that's the case and we'll figure out a better hook for the initial value
  ngAfterViewInit() {
      this.windowWidth = window.innerWidth;
  }

   //if screen size changes it'll update
   @HostListener('window:resize', ['$event'])
   resize(event) {
       this.windowWidth = window.innerWidth;
   }


  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.token = params['id']; // (+) converts string 'id' to a number
      
      // In a real app: dispatch action to load the details here.
   });
    this.hide = true;
    this.signupForm = new FormGroup({
      'username': new FormControl('', [
        Validators.required,
        Validators.maxLength(250)
       //, Validators.pattern(this.EMAIL_REGEX)
      ]),
      'password': new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
      ]),
    });
  }

  onSubmit(email :string,name :string,password :string,rpassword :string):boolean {

    email = email.toLowerCase();

    if (!name)
    {
      this.toastrService.warning('Please enter your name');
      return false;
    }

    if (name.length < 2)
    {
      this.toastrService.warning('Please enter a valid Name');
      return false;
    }

    if (!email)
      {
        this.toastrService.warning('Please enter your email!');
        return false;
      }

      if (!this.isValid(email))
      {
        this.toastrService.warning('Please enter a valid Email!');
        return false;    
      }


      if (!password || password.length < 6)
      {
        this.toastrService.warning('Password should be at least 6 characters!');
        return false;
      }

      if (password != rpassword)
      {
        this.toastrService.warning('Repeat Password does not match the Password!');
        return false;
      }



    this.isSubmit = true;
    // if (this.loginForm.invalid) {
    //   this.toastrService.error('invalid data');
    //   return false;
    //}
    // else 
     {

      this.authenticationService.signUp(email,name,password)
      .subscribe(data => {
          this.snackbar.open('Please check your email','Email Sent',{
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
          if (errormsg.indexOf('400') > 0)
          {
            // this.toastrService.warning('If you forgot your password please go to the Reset Password page' ,'Can I help you?');
            this.toastrService.error('User with this email address already registered!' ,'Register Failed');
            let snackBarRef = this.snackbar.open('Forgot your password?','Go to Reset Password page',{
              duration: 30000,
              panelClass : 'my-snackbar-style',

            });

            snackBarRef.onAction().subscribe(() => {
              this.router.navigate(['/forgotpassword']);
            });
          }
          else
          {
            this.toastrService.error('Sorry! Something went wrong, please try again!' ,'Register Failed');
          }  
          this.isSubmit = false;
        }
      );
    }

    return false;
  }

  private handleErrorObservable (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
} 

login(){
  this.router.navigate(['login']);
}

 isValid(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}


}