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


@Component({
    templateUrl: 'mycalls.component.html',
    styleUrls: ['mycalls.component.scss']
})
export class MyCallsComponent {
    
    constructor(
        private router : Router, 
        private authService : AuthenticationService,
        private toastrService : ToastrService,
        private clipboardService: ClipboardService,
        private callreportsService : CallReportsService,
        private snackbar : MatSnackBar
        )
        { }


        callreports$ : Observable<CallReport[]>;

        ngOnInit()
        {
            this.callreports$ = this.callreportsService.getMyCallReports();
        }

}
