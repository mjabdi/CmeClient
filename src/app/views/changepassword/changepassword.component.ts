import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {MatSnackBar} from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { FormControl } from '@angular/forms';

@Component({
    templateUrl: 'changepassword.component.html',
    styleUrls: ['changepassword.component.css']
})
export class ChangepasswordComponent {
  constructor(private snackbar : MatSnackBar, 
    private router: Router, 
     private toastrService: ToastrService,
      private route: ActivatedRoute,
      private authenticationService: AuthenticationService) {
  }

  isSubmit = false;

  pass = new FormControl();
  newpass = new FormControl();
  rnewpass = new FormControl();

      username() : string{
        return this.authenticationService.getUsername();
      }

      onSubmit(password :string,newpassword :string,rnewpassword :string):boolean {

          if (!password)
          {
            this.toastrService.warning('Please enter your current password');
            return false;
          }

          if (!newpassword || newpassword.length < 6)
          {
            this.toastrService.warning('Password should be at least 6 characters!');
            return false;
          }

    
          if (newpassword != rnewpassword)
          {
            this.toastrService.warning('Retype Password does not match the Password!');
            return false;
          }
    
          newpassword = newpassword.trim();
    
    
        this.isSubmit = true;
        // if (this.loginForm.invalid) {
        //   this.toastrService.error('invalid data');
        //   return false;
        //}
        // else 
         {
    
          this.authenticationService.changePasswordWithEmail(this.username(),password,newpassword)
          .subscribe(data => {
            this.toastrService.success('Your password has been successfully changed','Password Changed');
            this.pass.setValue("");
            this.newpass.setValue("");
            this.rnewpass.setValue("");

             this.isSubmit = false;  
             return true;  
           },
            error =>
            {
              let errormsg : string = error.message;
              if (errormsg.indexOf('400') > 0)
              {
                this.toastrService.error('The current password you entered is wrong!' ,'Wrong Password!');
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
}
