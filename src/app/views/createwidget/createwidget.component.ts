import { Component } from '@angular/core';
import { getStyle } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import {MatIcon, MatDialogConfig, MatDialog} from '@angular/material';
import { ColorPickerService, Cmyk } from 'ngx-color-picker';
import {WidgetService} from '../widgets/widget.service';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';
import {Widget} from '../widgets/widget';
import { ToastrService } from 'ngx-toastr';
import { ClipboardService } from 'ngx-clipboard';
import {MatSnackBar} from '@angular/material';
import {HostListener, AfterViewInit } from '@angular/core';
import { WeekDay } from './weekday';
import { PickColorDialogComponent } from '../pickcolor-dialog/pickcolor-dialog.component';
import { MySubscriptionService } from '../mysubscriptions/mysubscriptions.service';
import { MySubscription } from '../mysubscriptions/mysubscription';
import { Plan } from '../stripeform-dialog/plan';
import { StripeFormDialogComponent } from '../stripeform-dialog/stripeform-dialog.component';
import { BuyPlanDialogComponent } from '../buyplan-dialog/buyplan-dialog.component';


@Component({
  templateUrl: 'createwidget.component.html',
  styleUrls: ['createwidget.component.css']
})
export class CreateWidgetComponent {


  mysubscriptions : MySubscription[];

  today = new Date();

  widgetID = "";

  snippetCode = "Loading..."

    dayOffStatus="Open";  

    colorWidget = "#FF6600";
    colorText = "#FFFFFF";
    TalkToUsText = "Talk To Leads Now";

    agreeChecked = false;
    alarmAgree = false;


     weekDays : WeekDay[] = [
       new WeekDay ('Monday' , true , '09:00' ,  '17:00'),
       new WeekDay ('Tuesday' , true , '09:00' ,  '17:00'),
       new WeekDay ('Wednesday' , true , '09:00' ,  '17:00'),
       new WeekDay ('Thursday' , true , '09:00' ,  '17:00'),
       new WeekDay ('Friday' , true , '09:00' ,  '17:00'),
       new WeekDay ('Saturday' , false , '09:00' ,  '17:00'),
       new WeekDay ('Sunday' , false , '09:00' ,  '17:00')
     ];


    constructor(
      private router : Router, 
      private wgtService : WidgetService,
      private authService : AuthenticationService,
      private cpService: ColorPickerService,
      private clipboardService: ClipboardService,
      private snackbar : MatSnackBar,
      private toastrService : ToastrService,
      private mysubscriptionService : MySubscriptionService,
      private dialog: MatDialog
      ){

    }

    downloadSnippetCode(token : string)
    {
      this.authService.getSnippetCode(token).subscribe(
        (data : string[]) =>
        {
          this.snippetCode = data[0];
        },
        error =>
        {
            this.snippetCode = "error while connecting to server! please try again!"
        }

      );
    }


    windowWidth: number = window.innerWidth;

    //initial values, The window object may still be undefined during this hook, let me know if that's the case and we'll figure out a better hook for the initial value
    ngAfterViewInit() {
        this.windowWidth = window.innerWidth;
    }
  
     //if screen size changes it'll update
     @HostListener('window:resize', ['$event'])
     resize(event) {
         this.windowWidth = window.innerWidth;
     }


    myEmail; 
    ngOnInit()
    {
      this.myEmail = this.authService.getUsername();
      this.loadMySubscriptions();
    }

    hasTrial = false;
    loadMySubscriptions()
    {
        this.mysubscriptionService.getMySubscriptions()
        .map(subs => subs.filter(sub => sub.status.toLowerCase() === 'active' ||  sub.status.toLowerCase() === 'trialing'))
        .subscribe(

          (data : MySubscription[])=>
          {
            this.mysubscriptions = data;
            if (this.mysubscriptions.length == 0)
            {
              this.hasTrial = true;
              let snackBarRef = this.snackbar.open('You have no subscriptions yet?','Create Your First Subscription Now',{
                duration: 30000,
                panelClass : 'my-snackbar-style',
  
              });
  
              snackBarRef.onAction().subscribe(() => {
                  this.openBuyDialog();
                //this.router.navigate(['/mysubscriptions']);
              });

            }
          }

        );

    }


    CheckForNoSubscription()
    {
      if (this.mysubscriptions && this.mysubscriptions.length == 0)
      {
        this.hasTrial = true;
        let snackBarRef = this.snackbar.open('You have no subscriptions yet?','Create Your First Subscription Now',{
          duration: 30000,
          panelClass : 'my-snackbar-style',

        });

        snackBarRef.onAction().subscribe(() => {
            this.openBuyDialog();
          //this.router.navigate(['/mysubscriptions']);
        });
      }
    }


    textcolor(color : string) : string
    {
      const hsva = this.cpService.stringToHsva(color);
      if (hsva) {
        const rgba = this.cpService.hsvaToRgba(hsva);
        const brightness = (rgba.r * 299 + rgba.g * 587 + rgba.b * 114) / 1000;
        if (brightness > 0.6)
          return "black";
      }
        return "white";
    }

    public onEventLog(event: string, data: any): void {
        // console.log(event, data);
      }
    
      public onChangeColorCmyk(color: string): Cmyk {
        const hsva = this.cpService.stringToHsva(color);
    
        if (hsva) {
          const rgba = this.cpService.hsvaToRgba(hsva);
    
          return this.cpService.rgbaToCmyk(rgba);
        }
    
        return new Cmyk(0, 0, 0, 0);
      }

      public onChangeColorHex8(color: string): string {
        const hsva = this.cpService.stringToHsva(color, true);
    
        if (hsva) {
          return this.cpService.outputFormat(hsva, 'rgba', null);
        }
    
        return '';
      }

      onSearchChange(typeValue : string ) {  
        return typeValue;
      }
    
      widgetText : string = "Talk To Us Now";


      isSubmit = false;
      selectedTabIndex = 0;
      onSubmit(widgetname : string,phone : string,email : string ,  domain :string ,isanimate :boolean , subscription : string):boolean {

       
        if (!widgetname)
        {
          this.toastrService.warning('Please enter a widget name');
          this.selectedTabIndex = 0;
          return false;
        }

        if (!phone)
        {
          this.toastrService.warning('Please enter a phone number');
          this.selectedTabIndex = 1;
          return false;
        }

        if (!domain)
        {
          this.toastrService.warning('Please enter a domain name');
          this.selectedTabIndex = 1;
          return false;
        }

       if (!this.widgetText)
       {
          this.toastrService.warning('Please enter a widget text');
          this.selectedTabIndex = 0;
          return false;
       }

       if (!subscription)
       {
          this.toastrService.warning('Please choose a subscription');
          this.selectedTabIndex = 0;
          return false;
       }
       

       if (!this.agreeChecked)
       {
        this.toastrService.warning('Please check the "I agree to the TTLN Terms and Conditions" checkbox');
        this.selectedTabIndex = 2;
        this.alarmAgree = true;
        return false;  
       }
       
        this.isSubmit = true;

        var wgt = new Widget();

        wgt.widgetName = widgetname;
        wgt.connectedTo = phone;
        wgt.domainUrl = domain;
        wgt.isAnimated = isanimate;
        wgt.status = "Active";
        wgt.talkToUsText = this.widgetText;
        wgt.callsCount = 0;
        wgt.colorText = this.colorText;
        wgt.colorWidget = this.colorWidget;
        wgt.email = this.authService.getUsername();
        wgt.weekDays = this.weekDays;
        wgt.notificationEmail = email;
        wgt.subscriptionId = subscription;

        this.wgtService.createNewWidget(wgt)
        .subscribe(data => {

          let json = JSON.parse(JSON.stringify(data));

          this.toastrService.success( wgt.widgetName + ' has been added successfully','New Widget Created');
          
          this.widgetID = json.token;
          this.downloadSnippetCode(this.widgetID);

          this.isSubmit = false;  
          //this.router.navigate(['widgets']);
          return true;  

        },
        error =>
        {
          // if  (error.error ==  'DuplicateEmployeeID')
          //   this.toastrService.error('Duplicate Employee #','Invalid Data');
          // else
          //   this.toastrService.error('Sorry, something went wrong. Please try again','Server Error');

          let errormsg : string = error.message;
          if (errormsg.indexOf('400') > 0)
          {
            // this.toastrService.warning('If you forgot your password please go to the Reset Password page' ,'Can I help you?');
            this.toastrService.error('A widget with this name already registered!' ,'Duplicate Name');
          }
          else
          {
            this.toastrService.error('Sorry! Something went wrong, please try again!' ,'Create Widget Failed');
          }
  
            this.isSubmit = false;
        }
      );

      return false;
      }

      copied(event)
      {
          this.snackbar.open('Copied to Clipboard','Dismiss',{
            duration: 3000
          });
      }


      refreshPage()
      {
        location.reload();
      }

      correctURL(value : string) : string
      {
          let httpStr = 'http://';
          let wwwStr = 'www';

          if (value.startsWith(wwwStr))
          {
              return (httpStr + value);
          }
          return value;
      }

      isValidDomain(domain) {
        var re = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
        return re.test(String(domain).toLowerCase());
      }


      getClassAgree() : string
      {
        if (this.agreeChecked)
          return 'span-agree-active';
         else if (this.alarmAgree)
          return 'span-agree-alarm';
         else
            return 'span-agree';
      }

      validHexColor(val)
      {
        var re = /^#[0-9A-F]{6}$/ ;
        return re.test(val);
      }

      showColorDialog(type : number)
      {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.hasBackdrop = true;
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;    
        dialogConfig.panelClass = "custom-modalbox";    
        dialogConfig.width = "50%";
        dialogConfig.height = "50%";
    
        const dialogRef = this.dialog.open(PickColorDialogComponent,dialogConfig);
    
    
        dialogRef.afterClosed().subscribe(
          val => {
              if (val)
              {
                if (type == 1 )
                {
                  this.colorWidget = val;
                } 
                else if (type == 2)
                {
                  this.colorText = val;
                }
              }
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
                           this.loadMySubscriptions();
                       }
                   }

                 )
             }
         }
     );
   }

   sendingEmail = false;
   sendScriptEmail()
   {
     this.sendingEmail = true;

     this.wgtService.sendSnippetCodeEmail(this.widgetID).subscribe(

       data => 
       {
         this.snackbar.open('Email Sent','Dismiss',{
           duration: 3000
         });
         this.sendingEmail = false;
       },
       error =>
       {
         this.toastrService.error('Sorry, cannot send email right now! Pleas try again.','Error');
         this.sendingEmail = false;
       }
     );
   }




}

