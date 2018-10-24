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


@Component({
    templateUrl: 'customers.component.html',
    styleUrls: ['customers.component.scss']
})
export class CustomersComponent {
    //customers :   Customer[];  



    customers = [
        new Customer('sibsib','sibsib@yahoo','20182410','20182410',5,'123'),
        new Customer('madmad','madmad@yahoo','20182410','20182410',2,'456'),
        new Customer('soren','soren@yahoo','20182410','20182410',10,'789'),
        new Customer('sasa','sasa@yahool','20182410','20182410',3,'101')
      ];
      
    constructor(
        private router : Router, 
        private authService : AuthenticationService,
        private toastrService : ToastrService,
        private clipboardService: ClipboardService,
        private snackbar : MatSnackBar
        )
        { }
  


}
