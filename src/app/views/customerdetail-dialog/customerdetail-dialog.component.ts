import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatSnackBar, MatDialogConfig} from "@angular/material";
import { environment } from '../../../environments/environment';
import { Plan } from '../stripeform-dialog/plan';
import { MySubscription } from '../mysubscriptions/mysubscription';
import { Customer } from '../../admin/customers/customer';
import { Widget } from '../widgets/widget';
import { WidgetService } from '../widgets/widget.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import {Observable} from 'rxjs/Rx';
import { MySubscriptionService } from '../mysubscriptions/mysubscriptions.service';
import { SubscriptionDetailDialogComponent } from '../subscriptiondetail-dialog/subscriptiondetail-dialog.component';



@Component({
    selector: 'customerdetail-dialog',
    templateUrl: './customerdetail-dialog.component.html',
    styleUrls: ['./customerdetail-dialog.component.scss']
})
export class CustomerDetailDialgoComponent implements OnInit {


    customer : Customer;


    constructor(
        public dialog: MatDialog,
        private router : Router, 
        private wgtService : WidgetService,
        private authService : AuthenticationService,
        private toastrService : ToastrService,
        private mysubscriptionService : MySubscriptionService,
        private snackbar : MatSnackBar,
        private dialogRef: MatDialogRef<CustomerDetailDialgoComponent>,
        @Inject(MAT_DIALOG_DATA) data ) {

            this.customer = data;
            
    }

    myWidgets :   Widget[];
    myWidgetsShow : Array<boolean>;
    ticks = 0;

    currentSubscriptions$ : Observable<MySubscription[]>; 

    ngOnInit() {
        this.loadWidgets();
        this.loadSubsciptions();
   }

   loadSubsciptions()
   {
    this.currentSubscriptions$= this.mysubscriptionService.getUserSubscriptions(this.customer.email);
   }


   IsActive(widget : Widget) 
  {
     if (!widget.authKey)
      return false;
     if (!widget.extension)
      return false;

      return ((widget.authKey.length > 0) && (widget.extension.length) > 0);
  }

  HideEnableMenu(widget : Widget)
  {
    
    if (!this.IsActive(widget))
      return false;

    if ((widget.status != 'Active') && (widget.status != 'Disabled'))
       return false;  

       return  true;
  }

  loadWidgets()
  {
    this.wgtService.getAllWidgetsForUser(this.customer.email)
    .subscribe((widgets : Widget[]) => {
      if (widgets)
      {
          for (var i =0 ; i< widgets.length; i++)
          {
              if (!this.IsActive(widgets[i]))
              {
                widgets[i].status = "Not Active yet!"
              }
          }
          this.myWidgets = widgets;
          this.myWidgetsShow = new Array<boolean>(this.myWidgets.length);
          let timer = Observable.timer(300,300);
          timer.subscribe(t => {
            if (this.ticks < this.myWidgetsShow.length)
              this.myWidgetsShow[this.ticks] = true;
            this.ticks++;
          } );
        }
      }
    
    );
  
  }

  color1 = "#454";

  createNewWidget(){
    this.router.navigate(['createwidget']);
  }



  getStatusText(widget : Widget):string{
    if (widget.status == "Active"){
      return 'Disable';
    }
    else
      return 'Enable';
  }
  getStatusIcon(widget : Widget):string{
    if (widget.status != "Active"){
      // return 'phone_locked';
      return 'volume_off';
    }
    else
    return 'phone_in_talk';
    
  }
  

  gotoWidget(id)
  {
    this.dialogRef.close();  
    this.router.navigate(["editwidget/" + id]);
  }

  ChangeStatus(wgt : Widget)
  {
    if (wgt.status == 'Active')
    {
      this.updateStatus(wgt, 'Disabled');
    }
    else
    {
      this.updateStatus(wgt , 'Active');
    }
  }

  updateStatus(wgt :Widget , status : string)
  {
    var wgt2 = new Widget();
    wgt2.status = status;

    wgt.statusChanging = true;
    this.wgtService.updateStatus(wgt.id,wgt2)
    .subscribe(data => {
      if (status == 'Active')
            this.snackbar.open(wgt.widgetName,'Widget Enabled',{
              duration: 5000,
              panelClass : 'my-snackbar-style'
            });
      else
            this.snackbar.open(wgt.widgetName,'Widget Disabled',{
              duration: 5000,
              panelClass : 'my-snackbar-style'
            });
      wgt.statusChanging = false;  
      wgt.status = status;
      return true;  

    },
    error =>
    {
      // if  (error.error ==  'DuplicateEmployeeID')
      //   this.toastrService.error('Duplicate Employee #','Invalid Data');
      // else
      //   this.toastrService.error('Sorry, something went wrong. Please try again','Server Error');

      this.toastrService.error(error,'Error');

        wgt.statusChanging = false;
    });
  }

  IsDisabled(widget : Widget)
  {
      return (widget.status != 'Active');
  }

  DeleteWidget(wgt : Widget)
  {
    let snackBarRef = this.snackbar.open('Are you sure you want to delete ' + wgt.widgetName + '?','Delete',{
      duration: 5000,
      panelClass : 'my-snackbar-style',

    });

    snackBarRef.onAction().subscribe(() => {

      wgt.isDeleting = true;


      this.wgtService.deleteWidget(wgt.id).subscribe(
        data => {
          this.toastrService.success( wgt.widgetName + ' successfully deleted', 'Widget Deleted');
          this.myWidgets.splice(this.myWidgets.indexOf(wgt),1);
        },
        error =>
        {
          wgt.isDeleting = false;
          this.toastrService.error('Ooops! Something went wrong! Please try again','Error');
        }
      )
    });
  }

  getTooltipWidget(widget : Widget)
  {
      if (widget.status == 'Not Active yet!')
      {
          return 'Waiting For The Administrator Approval';
      }

      return '';
  }


  ViewDetail(sub : MySubscription)
  {
      const dialogConfig = new MatDialogConfig();

      dialogConfig.hasBackdrop = true;
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = false;    
      dialogConfig.panelClass = "custom-modalbox";    
      dialogConfig.width = "800px";
      dialogConfig.height = "450px";
      sub.back_button = true;
      dialogConfig.data = sub;  
      dialogConfig.disableClose = false;
 
      const dialogRef = this.dialog.open(SubscriptionDetailDialogComponent,dialogConfig);
  
      dialogRef.afterClosed().subscribe(
        val => {
            if (val)
            {

            }
        }
    );
  }


}