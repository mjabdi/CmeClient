import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from "@angular/material";
import { MySubscription } from '../mysubscriptions/mysubscription';
import { MyStripeService } from '../../services/MyStripeService';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'changeplan-dialog',
    templateUrl: './changeplan-dialog.component.html',
    styleUrls: ['./changeplan-dialog.component.scss']
})
export class ChangePlanDialogComponent implements OnInit {


    mysub : MySubscription;

    submitting = false;

    constructor(
        private myStripeService : MyStripeService,
        private toastrService : ToastrService,
        public dialog: MatDialog,
        private dialogRef: MatDialogRef<ChangePlanDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data ) {

            this.mysub = data;
    }

    ngOnInit() {

   }

   close()
   {
       this.dialogRef.close();
   }

   cancel()
   {
       this.submitting = true;

       this.myStripeService.UnSubscribe(this.mysub.subscriptionID).subscribe(

        data =>
        {
            this.toastrService.success('Your subscription successfully canceled.','Success'); 
            this.submitting = false;
            this.dialogRef.close(true);
        }
        ,
        error =>
        {
            this.toastrService.error('Please check your data and try again','Error');
            this.submitting = false;
        }
        

       );
       

   }

}