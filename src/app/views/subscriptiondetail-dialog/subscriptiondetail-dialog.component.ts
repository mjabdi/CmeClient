import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatSnackBar} from "@angular/material";
import { environment } from '../../../environments/environment';
import { Plan } from '../stripeform-dialog/plan';
import { MySubscription } from '../mysubscriptions/mysubscription';
import { MySubscriptionService } from '../mysubscriptions/mysubscriptions.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { ClipboardService } from 'ngx-clipboard';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Invoice } from './invoice';



@Component({
    selector: 'subscriptiondetail-dialog',
    templateUrl: './subscriptiondetail-dialog.component.html',
    styleUrls: ['./subscriptiondetail-dialog.component.scss']
})
export class SubscriptionDetailDialogComponent implements OnInit {


    subscription : MySubscription;

    constructor(
        public dialog: MatDialog,
        private router : Router, 
        private authService : AuthenticationService,
        private clipboardService: ClipboardService,
        private mysubscriptionService : MySubscriptionService,
        private snackbar : MatSnackBar,
        private toastrService : ToastrService,
        private dialogRef: MatDialogRef<SubscriptionDetailDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data ) {
            this.subscription = data;
            this.invoices$ = this.mysubscriptionService.getInvoices(this.subscription.subscriptionID);
    }

    invoices$ : Observable<Invoice[]>;

    ngOnInit() {

   }



}