import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from "@angular/material";
import { MySubscription } from '../mysubscriptions/mysubscription';
import { Plan } from './plan';

import {  ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
 
import { StripeService, StripeCardComponent, ElementOptions, ElementsOptions } from "ngx-stripe";
import { MyStripeService } from '../../services/MyStripeService';
import { AuthenticationService } from '../../services/authentication.service';
import {ToastrService } from 'ngx-toastr';
import {MatSnackBar} from '@angular/material';

@Component({
    selector: 'stripeform-dialog',
    templateUrl: './stripeform-dialog.component.html',
    styleUrls: ['./stripeform-dialog.component.scss']
})
export class StripeFormDialogComponent implements OnInit {


    selectedPlan : Plan;

    constructor(
        private fb: FormBuilder,
        private authenticationService : AuthenticationService,
        private stripeService: StripeService,
        private myStripeService : MyStripeService,
        private toastrService : ToastrService,
        private snackbar : MatSnackBar,
        public dialog: MatDialog,
        private dialogRef: MatDialogRef<StripeFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data ) {
            this.selectedPlan = data;
    }


   @ViewChild(StripeCardComponent) card: StripeCardComponent;
 
  cardOptions: ElementOptions = {
    style: {
      base: {
        iconColor: '#6000ff',
        color: '#555',
        lineHeight: '40px',
        fontWeight: 350,
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '16px',
        '::placeholder': {
          color: '#aaa'
        }
      }
    }
  };
 
  elementsOptions: ElementsOptions = {
    locale: 'en',
  };
 
  stripeTest: FormGroup;
 

 
  ngOnInit() {
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]],
      address : ['', [Validators.required]]
    });

    this.stripeTest.get('name').setValue(this.authenticationService.getCachedName());
  }
 
  submitting = false;

  buy() {


    if (!this.stripeTest.valid)
        return false;

    const name = this.stripeTest.get('name').value;
    const address_line1 = this.stripeTest.get('address').value;

    this.submitting = true;

    this.stripeService
      .createToken(this.card.getCard(), { name , address_line1 })
      .subscribe(result => {
        if (result.token) {
          // Use the token to create a charge or a customer
          // https://stripe.com/docs/charges
          console.log(result.token.id);

          this.myStripeService.CreateCustomer(result.token.id).subscribe(
            data =>
            {
              this.myStripeService.Subscribe(this.selectedPlan.planID).subscribe(
                data =>  {
                    this.toastrService.success('Your subscription successfully created.','Congratulations'); 
                    this.submitting = false;
                    this.dialogRef.close(true);
                }
                ,
                error => {
                  this.toastrService.error('An error occured! Please try again.','Error');
                  this.submitting = false; 
                }
              );
            },
            error =>
            {
                this.toastrService.error('An error occured! Please try again.','Error');
                this.submitting = false;
            }
          );

        } else if (result.error) {
          // Error creating the token
          this.toastrService.error('Please check your data and try again','Error');
          this.submitting = false;
        }
      });
  }

    close()
    {
        this.dialogRef.close();
    }


}