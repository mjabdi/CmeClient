import { Component } from '@angular/core';
import { getStyle } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import {MatIcon, MatDialog, MatDialogConfig} from '@angular/material';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClipboardService } from 'ngx-clipboard';
import {MatSnackBar} from '@angular/material';
import {HostListener, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MySubscription } from './mysubscription';
import { MySubscriptionService } from './mysubscriptions.service';
import { BuyPlanDialogComponent } from '../buyplan-dialog/buyplan-dialog.component';
import { ChangePlanDialogComponent } from '../changeplan-dialog/changeplan-dialog.component';
import { Plan } from '../stripeform-dialog/plan';
import { StripeFormDialogComponent } from '../stripeform-dialog/stripeform-dialog.component';


@Component({
    templateUrl: 'mysubscriptions.component.html',
    styleUrls: ['mysubscriptions.component.scss']
})
export class MySubscriptionsComponent {
    

    currentSubscriptions$ : Observable<MySubscription[]>; 

    selectedTabIndex = 0;
    lastChangeRow = null;

    constructor(
       private router : Router, 
       private authService : AuthenticationService,
       private clipboardService: ClipboardService,
       private mysubscriptionService : MySubscriptionService,
       private snackbar : MatSnackBar,
       private toastrService : ToastrService,
       private dialog: MatDialog
       )
       { }

       hasTrial = false;
       loaded = false;
       ngOnInit()
       {
           this.loadSubsciptions();

       }

       loadSubsciptions()
       {
        this.currentSubscriptions$= this.mysubscriptionService.getMySubscriptions();
        this.currentSubscriptions$.subscribe(
            data =>
            {
               this.hasTrial = (data.length == 0);
               this.loaded = true;
            }
        );
       }

       openBuyDialog()
       {
        
        const dialogConfig = new MatDialogConfig();

        dialogConfig.hasBackdrop = true;
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = false;    
        dialogConfig.panelClass = "custom-modalbox";    
        dialogConfig.width = "800px";
        dialogConfig.data = this.hasTrial;
        // dialogConfig.minHeight = "300px";
    
        const dialogRef = this.dialog.open(BuyPlanDialogComponent,dialogConfig);
    
        dialogRef.afterClosed().subscribe(
          val => {
              if (val)
              {
                  var plan : Plan;
                  plan = val;

                  const dialogConfig2 = new MatDialogConfig();

                  dialogConfig2.hasBackdrop = true;
                  dialogConfig2.disableClose = false;
                  dialogConfig2.autoFocus = false;    
                  dialogConfig2.panelClass = "custom-modalbox";    
                  //dialogConfig2.width = "600px";
                  dialogConfig2.data = plan;
                  dialogConfig2.disableClose = true;

                  // dialogConfig.minHeight = "300px";
              
                  const dialogRef2 = this.dialog.open(StripeFormDialogComponent,dialogConfig2);

                  dialogRef2.afterClosed().subscribe(
                    val2 => {
                        if (val2)
                        {
                            this.loadSubsciptions();
                        }
                    }

                  )
              }
          }
      );
    }

    openChangeDialog(subscribtion : MySubscription )
    {
     const dialogConfig = new MatDialogConfig();

     dialogConfig.hasBackdrop = true;
     dialogConfig.disableClose = false;
     dialogConfig.autoFocus = false;    
     dialogConfig.panelClass = "custom-modalbox";    
     //dialogConfig.width = "800px";
    // dialogConfig.height = "450px";
     dialogConfig.data = subscribtion;  
     dialogConfig.disableClose = true;

     const dialogRef = this.dialog.open(ChangePlanDialogComponent,dialogConfig);
 
     dialogRef.afterClosed().subscribe(
       val => {
           if (val)
           {
            this.loadSubsciptions();
           }
       }
   );
 }
}
