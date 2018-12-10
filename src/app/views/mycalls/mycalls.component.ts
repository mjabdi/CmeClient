import { Component } from '@angular/core';
import { getStyle } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import {MatIcon} from '@angular/material';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClipboardService } from 'ngx-clipboard';
import {MatSnackBar} from '@angular/material';
import {HostListener, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CallReport } from '../../admin/callreports/callreport';
import { CallReportsService } from '../../admin/callreports/callreports.service';
import { Widget } from '../widgets/widget';
import { FormControl } from '@angular/forms';
import { WidgetService } from '../widgets/widget.service';


@Component({
    templateUrl: 'mycalls.component.html',
    styleUrls: ['mycalls.component.scss']
})
export class MyCallsComponent {

    panelOpenState = false;

    WidgetNames : Widget[];

    fromDateControl = new FormControl();
    untilDateControl = new FormControl();
    selectedWidgetControl = new FormControl();
    
    constructor(
        private router : Router, 
        private authService : AuthenticationService,
        private toastrService : ToastrService,
        private clipboardService: ClipboardService,
        private callreportsService : CallReportsService,
        private widgetService : WidgetService,
        private snackbar : MatSnackBar
        )
        { }


        callreports$ : Observable<CallReport[]>;

        ngOnInit()
        {
            this.ResetSearch();
            this.callreports$ = this.callreportsService.getMyCallReports();
            this.widgetService.getAllWidgetsForUser(this.authService.getUsername()).subscribe(
                (data : Widget[]) =>
                {
                    this.WidgetNames = data;
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

                if (this.selectedWidget != null && this.selectedWidget != 'null' && report.extension != this.selectedWidget)
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
