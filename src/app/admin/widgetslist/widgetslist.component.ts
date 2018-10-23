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




export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
  }


  const ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  ];

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
    myUserwidget = this.userwidgets[0];


    constructor(
        private router : Router, 
        private authService : AuthenticationService,
        private toastrService : ToastrService,
        private clipboardService: ClipboardService,
        private snackbar : MatSnackBar
        )
        { }

        displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
        dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
        selection = new SelectionModel<PeriodicElement>(true, []);
      
        /** Whether the number of selected elements matches the total number of rows. */
        isAllSelected() {
          const numSelected = this.selection.selected.length;
          const numRows = this.dataSource.data.length;
          return numSelected === numRows;
        }
      
        /** Selects all rows if they are not all selected; otherwise clear selection. */
        masterToggle() {
          this.isAllSelected() ?
              this.selection.clear() :
              this.dataSource.data.forEach(row => this.selection.select(row));
        }


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
