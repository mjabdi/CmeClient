import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from "@angular/material";

@Component({
    selector: 'pickcolor-dialog',
    templateUrl: './pickcolor-dialog.component.html',
    styleUrls: ['./pickcolor-dialog.component.scss']
})
export class PickColorDialogComponent implements OnInit {

    popularColors = ['#ff6600', '#065535','#133337','#000000','#ffc0cb','#ffffff','#008080','#ffe4e1',
    '#ff0000','#ffd700','#666666','#00ffff','#40e0d0','#ff7373','#d3ffce',
    '#e6e6fa','#0000ff','#ffa500','#f0f8ff','#b0e0e6','#c6e2ff','#7fffd4',
    '#faebd7','#fa8072','#eeeeee','#cccccc','#800080','#ffb6c1','#800000',
    '#00ff00','#333333','#003366','#ffff00','#c0c0c0','#ffc3a0','#20b2aa',
    '#f08080','#66cdaa','#fff68f','#f6546a','#ff6666','#468499','#c39797',
    '#00ced1','#ffdab9','#ff00ff','#bada55','#101010','#008000','#660066',
    '#ff7f50','#f5f5f5','#088da5','#808080','#c0d6e4','#8b0000','#afeeee',
    '#0e2f44','#990000','#ffff66','#b4eeb4','#dddddd','#cbbeb5','#daa520',
    '#00ff7f','#f5f5dc','#3399ff','#8a2be2','#81d8d0','#ccff00','#66cccc',
    '#b6fcd5','#794044','#ff4040','#a0db8e','#cc0000','#000080','#3b5998',
    '#999999','#fef65b','#ff4444','#6897bb','#191970','#0099cc','#31698a',




];

    constructor(
        public dialog: MatDialog,
        private dialogRef: MatDialogRef<PickColorDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data ) {

    }

    selectColor(color)
    {
        this.dialogRef.close(color);
    }


    ngOnInit() {

   }

}