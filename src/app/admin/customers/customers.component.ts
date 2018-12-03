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
import {Customer} from './customer';
import { Observable } from 'rxjs';
import { CustomerDetailDialgoComponent } from '../../views/customerdetail-dialog/customerdetail-dialog.component';


@Component({
    templateUrl: 'customers.component.html',
    styleUrls: ['customers.component.scss']
})
export class CustomersComponent {
    //customers :   Customer[];  



    customers$ : Observable<Customer[]>;
    customersNo$ : Observable<Customer[]>;
      
    constructor(
        private router : Router, 
        private authService : AuthenticationService,
        private toastrService : ToastrService,
        private clipboardService: ClipboardService,
        private snackbar : MatSnackBar,
        private dialog: MatDialog
        )
        { }
  
        ngOnInit()
        {
            this.customers$ = this.authService.getCustomers();
            this.customersNo$ = this.authService.getCustomers(false);

        }

        ViewDetail(customer : Customer)
        {
            const dialogConfig = new MatDialogConfig();

            dialogConfig.hasBackdrop = true;
            dialogConfig.disableClose = false;
            dialogConfig.autoFocus = false;    
            dialogConfig.panelClass = "custom-modalbox";    
            dialogConfig.width = "800px";
            dialogConfig.height = "450px";
            dialogConfig.data = customer;  
            dialogConfig.disableClose = false;
       
            const dialogRef = this.dialog.open(CustomerDetailDialgoComponent,dialogConfig);
        
            dialogRef.afterClosed().subscribe(
              val => {
                  if (val)
                  {

                  }
              }
          );
    
        }

        Filter(customers : Customer[],search :string) : Customer[]
        {
            return customers.filter((value: Customer, index: number, array: Customer[]) =>
            {
                if (search != null && search.trim().length > 0)
                {
                    return (value.name.toLowerCase().indexOf(search.toLowerCase()) >= 0)
                          || (value.email.toLowerCase().indexOf(search.toLowerCase()) >= 0) ;
                }
                else
                {
                    return true;
                }
            }
            );
        }

}
