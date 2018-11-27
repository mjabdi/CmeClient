import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from "@angular/material";
import { environment } from '../../../environments/environment';
import { Plan } from '../stripeform-dialog/plan';
import { MySubscription } from '../mysubscriptions/mysubscription';
import { Customer } from '../../admin/customers/customer';



@Component({
    selector: 'customerdetail-dialog',
    templateUrl: './customerdetail-dialog.component.html',
    styleUrls: ['./customerdetail-dialog.component.scss']
})
export class CustomerDetailDialgoComponent implements OnInit {


    customer : Customer;

    constructor(
        public dialog: MatDialog,
        private dialogRef: MatDialogRef<CustomerDetailDialgoComponent>,
        @Inject(MAT_DIALOG_DATA) data ) {

            this.customer = data;
            
    }


    ngOnInit() {

   }



}