// import { Component } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';

// @Component({
//   // selector: 'app-dashboard',
//   templateUrl: 'activationlink.component.html'
// })
// export class ActivationlinkComponent { 
//   private sub: any;
//   token : string;

//   constructor(private route: ActivatedRoute) {
//   }

//   ngOnInit() {
//     this.sub = this.route.params.subscribe(params => {
//        this.token = params['id']; // (+) converts string 'id' to a number
       
//        // In a real app: dispatch action to load the details here.
//     });
//   }
// }


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
  templateUrl: 'activationlink.component.html',
  styleUrls: ['activationlink.component.scss']
})
export class ActivationLinkComponent {


  result = 0;

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

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.token = params['id']; 
      this.CheckToken();
   });
  }

  CheckToken()
  {
      this.authenticationService.checkActivationToken(this.token).subscribe(
          data => {this.result = 1; }
          ,
          error => {this.result = -1}
        
      );
  }

  private handleErrorObservable (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
} 

login(){
  this.router.navigate(['/login']);
}

signUp(){
  this.router.navigate(['register']);
}

 isValid(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

}
