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

  constructor(
    private fb: FormBuilder,
    private stripeService: StripeService,
    private myStripeService : MyStripeService
    ) {}


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
  }
 
  buy(event) {
    const name = this.stripeTest.get('name').value;
    const address_line1 = this.stripeTest.get('address').value;
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
              this.myStripeService.Subscribe('plan_DyKTNXWj9EzUz6').subscribe(
                data =>  {
                  alert("OK");
                }
                ,
                error => {
                  alert(JSON.stringify(error));
                }
              );
            },
            error =>
            {
                alert(JSON.stringify(error));
            }
          );

        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      });
  }


}