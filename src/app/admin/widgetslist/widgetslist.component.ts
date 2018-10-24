import { Component, OnInit } from '@angular/core';
import { getStyle } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import {MatIcon} from '@angular/material';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClipboardService } from 'ngx-clipboard';
import {MatSnackBar} from '@angular/material';
import {HostListener, AfterViewInit } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';
import {Userwidget} from './userwidget';






@Component({
    templateUrl: 'widgetslist.component.html',
    styleUrls: ['widgetslist.component.scss']
})
export class WidgetsListComponent{       
    //userWidgets :   Userwidget[];  



     userwidgets = [
      new Userwidget('111','sibsib','sibwidget','0912326545',456546,'123'),
      new Userwidget('222','madmad','madwidget','0912326545',456546,'456'),
      new Userwidget('333','soren','sorenwidget','0912326545',456546,'789'),
      new Userwidget('444','sasal','sasalwidget','0912326545',456546,'101')
    ];



    constructor(
        private router : Router, 
        private authService : AuthenticationService,
        private toastrService : ToastrService,
        private clipboardService: ClipboardService,
        private snackbar : MatSnackBar
        )
        { }

        editWidgetID = "";
        Edit(id)
        {
           this.editWidgetID = id; 
        }

        Save(id)
        {
           this.editWidgetID = ""; 
        }

}
