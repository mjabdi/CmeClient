import { Component } from '@angular/core';
import { getStyle } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import {MatIcon, MatDialogConfig, MatDialog} from '@angular/material';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClipboardService } from 'ngx-clipboard';
import {MatSnackBar} from '@angular/material';
import {HostListener, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Widget } from '../../views/widgets/widget';
import { WidgetService } from '../../views/widgets/widget.service';
import { LoadCsvFileDialog } from '../../views/loadcsvfile-dialog/loadcsvfile-dialog.component';
import { CallReport } from './callreport';
import { CallReportsService } from './callreports.service';
import { FormControl } from '@angular/forms';



@Component({
    templateUrl: 'callreports.component.html',
    styleUrls: ['callreports.component.scss']
})
export class CallReportsComponent {
    

    WidgetNames : Widget[];

    fromDateControl = new FormControl();
    untilDateControl = new FormControl();
    selectedWidgetControl = new FormControl();

    constructor(
        private router : Router, 
        private authService : AuthenticationService,
        private toastrService : ToastrService,
        private clipboardService: ClipboardService,
        private snackbar : MatSnackBar,
        private widgetService : WidgetService,
        private callreportsService : CallReportsService,
        private dialog: MatDialog
        )
        { }
  
        panelOpenState = false;

        callreports$ : Observable<CallReport[]>;

        ngOnInit()
        {
            this.ResetSearch();
            this.callreports$ = this.callreportsService.getAllCallReports();
            this.widgetService.getAllWidgetsHistory().subscribe(
                (data : Widget[]) =>
                {
                    this.WidgetNames = data;
                }
            );

        }

        openFileDialog()
        {
            const dialogConfig = new MatDialogConfig();

            dialogConfig.hasBackdrop = true;
            dialogConfig.disableClose = false;
            dialogConfig.autoFocus = false;    
            dialogConfig.panelClass = "custom-modalbox";    
            dialogConfig.width = "800px";
            dialogConfig.height = "450px";
            dialogConfig.disableClose = false;
       
            const dialogRef = this.dialog.open(LoadCsvFileDialog,dialogConfig);
        
            dialogRef.afterClosed().subscribe(
              val => {
                  if (val)
                  {
                    this.callreports$ = this.callreportsService.getAllCallReports();
                  }
              }
          );

        }
        
        fromDate = null;
        untilDate = null;
        selectedWidget = null;
        Search()
        {
            this.fromDate = this.fromDateControl.value;
            this.untilDate = this.untilDateControl.value;
            this.selectedWidget = this.selectedWidgetControl.value;
        }

        ResetSearch()
        {
            this.fromDateControl.setValue(null);
            this.untilDateControl.setValue(null);
            this.selectedWidgetControl.setValue(null);

            this.fromDate = this.fromDateControl.value;
            this.untilDate = this.untilDateControl.value;
            this.selectedWidget = this.selectedWidgetControl.value;
        }

        filterRecords(callreports : CallReport[]) : Array<CallReport>
        {
            var resultArray = new Array<CallReport>(); 

            for (var i=0 ; i < callreports.length; i++)
            {
                var report = callreports[i];
                var ok = true;

                if (this.fromDate != null  && (Date.parse(report.time.toString()) < Date.parse(this.fromDate.toString())))
                {
                    ok = false;
                }

                if (this.untilDate != null && (Date.parse(report.time.toString()) - 86400000 > Date.parse(this.untilDate.toString())))
                {
                    ok = false;
                }

                if (this.selectedWidget != null && this.selectedWidget != 'null'  && report.extension != this.selectedWidget)
                {
                    ok = false;
                }

                if (ok)
                {
                    resultArray.push(report);
                }
            }

            return resultArray;
        }

}
