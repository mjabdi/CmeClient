import { Component } from '@angular/core';
import { getStyle } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import {MatIcon, MatDialog, MatDialogConfig} from '@angular/material';
import { ColorPickerService, Cmyk } from 'ngx-color-picker';
import { ActivatedRoute } from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';
import {Widget} from '../widgets/widget';
import { ToastrService } from 'ngx-toastr';
import {WidgetService} from '../widgets/widget.service';
import { ClipboardService } from 'ngx-clipboard';
import {MatSnackBar} from '@angular/material';
import { WeekDay } from '../createwidget/weekday';
import { PickColorDialogComponent } from '../pickcolor-dialog/pickcolor-dialog.component';


@Component({
  templateUrl: 'editwidget.component.html',
  styleUrls: ['editwidget.component.css']
})
export class EditWidgetComponent {

    colorWidget = "rgb(77,189,116)"
    colorText = "rgb(240,243,245)"

    isLoading = true;

    private sub: any;

    widgetID : string;
    myWidget : Widget;

    snippetCode = "Loading..."

    selectedTabIndex = 0;

    weekDays : WeekDay[] = [
      new WeekDay ('Monday' , true , '09:00' ,  '17:00'),
      new WeekDay ('Tuesday' , true , '09:00' ,  '17:00'),
      new WeekDay ('Wednesday' , true , '09:00' ,  '17:00'),
      new WeekDay ('Thursday' , true , '09:00' ,  '17:00'),
      new WeekDay ('Friday' , true , '09:00' ,  '17:00'),
      new WeekDay ('Saturday' , false , '09:00' ,  '17:00'),
      new WeekDay ('Sunday' , false , '09:00' ,  '17:00')
    ];
    constructor(private cpService: ColorPickerService,
      private route: ActivatedRoute,
      private router : Router, 
      private wgtService : WidgetService,
      private authService : AuthenticationService,
      private toastrService : ToastrService,
      private clipboardService: ClipboardService,
      private snackbar : MatSnackBar,
      private dialog: MatDialog
      
      
      ) {
    }
    widgetText : string = "Talk To Us Now";
    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
           this.widgetID = params['id']; // (+) converts string 'id' to a number
           
           this.wgtService.findWidget(this.widgetID).subscribe(
            (widget : Widget) => {
                this.myWidget = widget;
                this.widgetText = this.myWidget.talkToUsText;
                this.colorText = this.myWidget.colorText;
                this.colorWidget = this.myWidget.colorWidget;
                this.isLoading = false;
                if (this.myWidget.weekDays != null && this.myWidget.weekDays.length == 7)
                  this.weekDays = widget.weekDays;

                this.downloadSnippetCode(this.widgetID);
            }

           ); 

           // In a real app: dispatch action to load the details here.
        });
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
  
    
      ngOnDestroy() {
        if (this.sub)
          this.sub.unsubscribe();
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
        console.log(event, data);
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
    
      isSubmit = false;

      onSubmit(widgetname : string,phone : string, email : string, domain :string ,isanimate :boolean ):boolean {


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

        this.isSubmit = true;


        var wgt = new Widget();

        wgt.id = this.myWidget.id;
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
        wgt.authKey = this.myWidget.authKey;
        wgt.extension = this.myWidget.extension;
        wgt.notificationEmail = email;

        this.wgtService.updateWidget(wgt.id,wgt)
        .subscribe(data => {
          this.toastrService.success( wgt.widgetName + ' has been updated successfully','Widget Updated');
          this.isSubmit = false;  
          //this.router.navigate(['widgets']);
          return true;  

        },
        error =>
        {
          let errormsg : string = error.message;
          if (errormsg.indexOf('400') > 0)
          {
            // this.toastrService.warning('If you forgot your password please go to the Reset Password page' ,'Can I help you?');
            this.toastrService.error('Another widget with this name already registered!' ,'Duplicate Name');
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


}
