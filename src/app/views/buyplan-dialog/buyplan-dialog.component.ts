import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from "@angular/material";
import { environment } from '../../../environments/environment';
import { Plan } from '../stripeform-dialog/plan';



@Component({
    selector: 'buyplan-dialog',
    templateUrl: './buyplan-dialog.component.html',
    styleUrls: ['./buyplan-dialog.component.scss']
})
export class BuyPlanDialogComponent implements OnInit {


    hasTrial = false;

    constructor(
        public dialog: MatDialog,
        private dialogRef: MatDialogRef<BuyPlanDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data ) {

            this.hasTrial = data;
    }

    selectPlan(index)
    {
       var plan = new Plan(); 
       if (index == 1)
       {
            plan.planID = environment.planId1;
            plan.planName = "Sole Trader";
            plan.price = 49;
       }
       else if (index == 2)
       {
            plan.planID = environment.planId2;
            plan.planName = "Small Business";
            plan.price = 99; 
       }
       else if (index == 3)
       {
            plan.planID = environment.planId3;
            plan.planName = "Large Business";
            plan.price = 199;
       }

       plan.hastTrial = this.hasTrial;

       this.dialogRef.close(plan);
    }



    ngOnInit() {

   }




   

}