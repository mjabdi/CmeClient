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


@Component({
    templateUrl: 'callreports.component.html',
    styleUrls: ['callreports.component.scss']
})
export class CallReportsComponent {
    

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
  

        callreports$ : Observable<CallReport[]>;

        ngOnInit()
        {
            this.callreports$ = this.callreportsService.getAllCallReports();
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
        

}
