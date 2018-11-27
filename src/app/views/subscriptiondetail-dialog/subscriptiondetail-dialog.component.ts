import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from "@angular/material";
import { environment } from '../../../environments/environment';
import { Plan } from '../stripeform-dialog/plan';
import { MySubscription } from '../mysubscriptions/mysubscription';



@Component({
    selector: 'subscriptiondetail-dialog',
    templateUrl: './subscriptiondetail-dialog.component.html',
    styleUrls: ['./subscriptiondetail-dialog.component.scss']
})
export class SubscriptionDetailDialogComponent implements OnInit {


    subscription : MySubscription;

    constructor(
        public dialog: MatDialog,
        private dialogRef: MatDialogRef<SubscriptionDetailDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data ) {

            this.subscription = data;
            
    }


    ngOnInit() {

   }



}