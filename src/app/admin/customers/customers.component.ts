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
import {Customer} from './customer';
import { Observable } from 'rxjs';


@Component({
    templateUrl: 'customers.component.html',
    styleUrls: ['customers.component.scss']
})
export class CustomersComponent {
    //customers :   Customer[];  



    customers$ : Observable<Customer[]>;
      
    constructor(
        private router : Router, 
        private authService : AuthenticationService,
        private toastrService : ToastrService,
        private clipboardService: ClipboardService,
        private snackbar : MatSnackBar
        )
        { }
  
        ngOnInit()
        {
            this.customers$ = this.authService.getCustomers();
        }


}
