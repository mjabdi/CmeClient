import { Component } from '@angular/core';
import { getStyle } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import {MatIcon} from '@angular/material';
import {Router} from '@angular/router';
import {Widget} from './widget';
import {WidgetService} from './widget.service';
import {AuthenticationService} from '../../services/authentication.service';
import {Observable} from 'rxjs/Rx';
import {ToastrService } from 'ngx-toastr';
import {MatSnackBar} from '@angular/material';
import {HostListener, AfterViewInit } from '@angular/core';



@Component({
  templateUrl: 'widgets.component.html',
  styleUrls: ['widgets.component.scss'],
  providers : [WidgetService]
  }
 )
export class WidgetsComponent {

  myWidgets :   Widget[];
  myWidgetsShow : Array<boolean>;

  constructor(private router : Router, 
    private wgtService : WidgetService,
    private authService : AuthenticationService,
    private toastrService : ToastrService,
    private snackbar : MatSnackBar
    ){
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


  ticks = 0;
  ngOnInit()
  {
    this.loadWidgets();
  }

  loadWidgets()
  {
    this.wgtService.getAllWidgetsForUser(this.authService.getUsername())
    .subscribe(widgets => {this.myWidgets = widgets;
      this.myWidgetsShow = new Array<boolean>(this.myWidgets.length);
      let timer = Observable.timer(300,300);
      timer.subscribe(t => {
        if (this.ticks < this.myWidgetsShow.length)
          this.myWidgetsShow[this.ticks] = true;
        this.ticks++;
      } );
    });
  }




  color1 = "#454";

  createNewWidget(){
    this.router.navigate(['createwidget']);
  }
  editwidget(){
    this.router.navigate(['editwidget']);
  }

  getStatusText(status):string{
    if (status=='Disabled'){
      return 'Enable';
    }
    else
    return 'Disable';
  }
  getStatusIcon(status):string{
    if (status=='Disabled'){
      // return 'phone_locked';
      return 'volume_off';
    }
    else
    return 'phone_in_talk';
    
  }
  

  gotoWidget(id)
  {
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
}
