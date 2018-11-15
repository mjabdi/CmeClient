import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
 
import { StripeService, StripeCardComponent, ElementOptions, ElementsOptions } from "ngx-stripe";
import { MyStripeService } from '../../services/MyStripeService';
 

@Component({
  // selector: 'app-dashboard',
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.scss']
})
export class SignUpComponent {

  @ViewChild(StripeCardComponent) card: StripeCardComponent;
 
  cardOptions: ElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        lineHeight: '40px',
        fontWeight: 300,
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };
 
  elementsOptions: ElementsOptions = {
    locale: 'en'
  };
 
  stripeTest: FormGroup;
 
  constructor(
    private fb: FormBuilder,
    private stripeService: StripeService,
    private myStripeService : MyStripeService
    ) {}
 
  ngOnInit() {
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });
  }
 
  buy() {
    const name = this.stripeTest.get('name').value;
    this.stripeService
      .createToken(this.card.getCard(), { name })
      .subscribe(result => {
        if (result.token) {
          // Use the token to create a charge or a customer
          // https://stripe.com/docs/charges
          console.log(result.token.id);

          this.myStripeService.Charge(result.token.id).subscribe(

            data => alert(JSON.stringify(data))
            ,
            error => alert(JSON.stringify(error))
          );


        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      });
  }


}