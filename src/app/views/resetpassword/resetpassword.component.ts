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
    templateUrl: 'resetpassword.component.html',
    styleUrls: ['resetpassword.component.scss']
})
export class ResetpasswordComponent {
  today = new Date();
    
    constructor(public snackbar : MatSnackBar, public router: Router, public http: Http, private toastrService: ToastrService, private route: ActivatedRoute,private authenticationService: AuthenticationService) {
    }
  
    private sub: any;
    token : string;

    isSubmit: boolean = false;

    result = 0;

    ngOnInit() {

      this.sub = this.route.params.subscribe(params => {
        this.token = params['id']; 
        this.CheckToken();
     });
    }
  
    CheckToken()
    {
        this.authenticationService.checkToken(this.token).subscribe(
            data => {this.result = 1; }
            ,
            error => {this.result = -1}
          
        );
    }
  

    onSubmit(password : string,rpassword :string)
    {

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
    
          this.authenticationService.changePasswordWithToken(this.token,password)
          .subscribe(data => {

             this.toastrService.success('Your password has been successfully changed','Password Changed');
             this.router.navigate(['login']);
    
              this.isSubmit = false;  
              return true;  
            },
            error =>
            {
              let errormsg : string = error.message;
              if (errormsg.indexOf('404') > 0)
              {
                this.toastrService.error('Invalid Link ','Error');
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

    resetPassword(){
      this.router.navigate(['forgotpassword']);
    }


    isValid(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
};

