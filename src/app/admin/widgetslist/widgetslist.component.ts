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
import { Observable } from 'rxjs';
import { Widget } from '../../views/widgets/widget';
import { WidgetService } from '../../views/widgets/widget.service';
import { flatten } from '@angular/compiler';






@Component({
    templateUrl: 'widgetslist.component.html',
    styleUrls: ['widgetslist.component.scss']
})
export class WidgetsListComponent{       
    //userWidgets :   Userwidget[];  



     userwidgets$ : Observable<Widget[]>; 
     userwidgets2$ : Observable<Widget[]>; 
     selectedTabIndex = 0;
     lastChangeRow = null;

     constructor(
        private router : Router, 
        private authService : AuthenticationService,
        private toastrService : ToastrService,
        private clipboardService: ClipboardService,
        private snackbar : MatSnackBar,
        private widgetService : WidgetService
        )
        { }

        ngOnInit()
        {
            this.userwidgets$ = this.widgetService.getAllWidgetsNew();
            this.userwidgets2$ = this.widgetService.getAllWidgetsHistory();
        }

        editWidgetID = "";
        Edit(id)
        {
           this.editWidgetID = id; 
           this.saving = id;
           this.widgetService.updateExtension(id,{authKey : '' , extension : '' }).subscribe
           (
               data =>{
                this.selectedTabIndex = 0;
                this.toastrService.success('Widget has been reset and moved to New Widgets tab','Success');
                   this.editWidgetID = ""; 
                   this.userwidgets$ = this.widgetService.getAllWidgetsNew();
                   this.userwidgets2$ = this.widgetService.getAllWidgetsHistory();
                   this.saving = false;
                   this.editWidgetID = null;
                   this.lastChangeRow = id;
               }

               , error =>
               {
                   this.toastrService.success('An Error Occured! Please Try Again','Error');
                   this.saving = false;
                   this.editWidgetID = null;
               }
           );
        }

        saving = null;
        Save(id,apikey,ext)
        {

            if (!apikey || !ext)
                return;

            this.saving = id;
            this.widgetService.updateExtension(id,{authKey : apikey , extension : ext }).subscribe
            (
                data =>{
                    this.selectedTabIndex = 1;
                    this.toastrService.success('Widget Data Saved and moved to History tab','Success');
                    this.editWidgetID = ""; 
                    this.userwidgets$ = this.widgetService.getAllWidgetsNew();
                    this.userwidgets2$ = this.widgetService.getAllWidgetsHistory();
                    this.saving = false;
                    this.lastChangeRow = id;
                }

                , error =>
                {
                    this.toastrService.success('An Error Occured! Please Try Again','Error');
                    this.saving = false;
                }
            );
        }
}
